import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home.js";
import Header from "./Header.js";
import Login from './Login.js';
import Checkout from "./Checkout.js";
import Payment from "./Payment.js";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe('pk_test_51JZWaGHJ0Dupq8EaT7z4PDZqotsJHD1zLYhCnsdGJC8CvjhZBxs4jy9m4BNQBvRpcsyN0xdP4xorzF631lYIV8Zj00le4Pi1Zt');

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    // BEM
    <Router>
      <div className="app">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/checkout">
              <Header />
              <Checkout />
            </Route>
            
            <Route path="/payment">
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </Route>

            <Route path="/">
              <Header />
              <Home />
            </Route>

          </Switch>
      </div>
    </Router>
  );
}

export default App;
