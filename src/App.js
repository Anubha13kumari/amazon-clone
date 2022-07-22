import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Orders from "./Orders";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const promise =loadStripe
("pk_test_51LNwfOSE7W74WjcRXSHoMsnYTXVwNqZV7uVPcjiDoojGQEXCNk8eQVQrI7vuVFtSShEH8UBKkKeNS4BBRHxF4oOL00xgIbX3m3"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // return () => {
    //   effect
    // };
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS>>>>", authUser);

      if (authUser) {
        // the user just logged in/yhe user was logged in

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
    <Router>
      <div className="App">
        <Switch>
        <Route exact path="/orders">
        <Header /> 
            <Orders></Orders>
          </Route>
          <Route exact path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route exact path="/payment">
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

    // header
    // home
  );
}

export default App;
