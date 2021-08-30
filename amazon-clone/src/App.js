import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home.js";
import Header from "./Header.js";
import Login from './Login';
import Checkout from "./Checkout.js";
// import { auth } from "./firebase";

function App() {
  

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
