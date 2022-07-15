import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch , Route}  from "react-router-dom";
import Checkout from './Checkout';


function App() {
  return (
    <Router>
    <div className="App">
    <Header></Header>
      <Switch>
        <Route path="/checkout">
       
      <Checkout></Checkout>
       </Route>
       <Route path="/">
       <Home></Home>
       </Route>
       </Switch>
    </div>
    </Router>
   
    // header
    // home
  );
}

export default App;
