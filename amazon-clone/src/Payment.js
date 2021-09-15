import React, { useState, useEffect } from 'react'
import CheckoutProduct from './CheckoutProduct.js';
import { useStateValue } from './StateProvider.js';
import "./Payment.css";
import { Link, useHistory } from "react-router-dom";
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer.js';
import axios from './axios';


function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    const handleSubmit = async(event) => {
        // Stripe magic
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation
            setSucceeded(true);
            setError(null);
            setProcessing(true);

            history.replace('/orders')
        })

    }

    useEffect(() => {
        // Generates the Stripe client secret that allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in currencies subunits
                url: '/payments/create?total=${getBasketTotal{basket} * 100}'
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket])

    const handleChange = event => {
        // Will listen for changes in the Card Element and display any errors as card details are being typed
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1> 
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                </h1>

                {/* Payment Section - Delivery Address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3> Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p> {user?.email} </p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                {/* Payment Section - Review Items and Possibly Delivery Times */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                          />
                        ))}
                    </div>
                </div>

                {/* Payment Section - Payment Method */}

                <div className="payment__section">
                    <div className="payment__title">
                            <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe Magic goes here */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                                <CurrencyFormat 
                                renderText={(value) => (
                                        <h3> Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>
                                        {processing ? <p>Processing</p> : "Buy Now"}
                                    </span>
                                </button>
                            </div>

                            {/* Errors */}
                            {error && <div>{error}</div>}

                        </form>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Payment
