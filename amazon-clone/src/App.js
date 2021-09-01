import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home.js";
import Header from "./Header.js";
import Login from './Login.js';
import Checkout from "./Checkout.js";
// import { auth } from "./firebase";

function App() {
  

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
