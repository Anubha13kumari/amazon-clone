import React from "react";
import "./Header.css";
import { GrSearch } from "react-icons/gr";
import { MdShoppingBasket } from "react-icons/md";
import { Link, useHistory} from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "firebase";

const Header = () => {
  const [{ basket ,user}, dispatch] = useStateValue();
  console.log("basket: ",basket);
  const history = useHistory();

  const handleAuthentication= () => {
    if(user){
      auth().signOut();
    }
  }

  return (
    <div className="header">
      <Link className="header__link" to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        ></img>
      </Link>
      <div className="header__search">
        <input className="header__searchInput" type="text"></input>
        <GrSearch className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link className="header__link" to={!user && '/login'}>
        <div onClick= {handleAuthentication} className="header__option">
          <span className="header__optionLineOne">Hello {!user ? 'Guest' : user.email} </span>
          <span className="header__optionLineTwo">{user ? 'Sign Out':'Sign In'}</span>
        </div>
        </Link>
        <Link className="header__link" to='/orders'>
        <div className="header__option">
          <span className="header__optionLineOne">Returns </span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        </Link>
        <div className="header__option">
          <span className="header__optionLineOne">Your </span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
        <Link  className="header__link" to="/checkout">
          <div className="header__optionBasket">
            <MdShoppingBasket  onClick={ ()=> history.push("/checkout")}/>
            <span className="header__optionLineTwo  header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
