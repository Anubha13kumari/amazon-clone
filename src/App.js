import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { useEffect } from "react";
import {auth} from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";



function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // return () => {
    //   effect
    // };
    auth.onAuthStateChanged(authUser => {
      console.log("THE USER IS>>>>",authUser);

      if(authUser){
        // the user just logged in/yhe user was logged in

        dispatch({
          type:'SET_USER',
          user:authUser
        })
      }else{
        // the user is logged out
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
        <Route exact path="/login">
           <Login></Login>
            </Route>
          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route exact path="/payment">
            <Header />
            <Payment/>
            <h1>I am Payment page</h1>
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
