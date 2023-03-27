import React from "react";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";

import './header.styles.scss';
import { ReactComponent as Logo} from '../../assets/crown.svg'
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const Header = ({currentUser , hidden}) => (
    <div className="header">
        <NavLink className="logo-container" to="/">
            <Logo className="logo" />
        </NavLink>
        <div className="options">
            <NavLink className="option" to="/shop">
                Shop
            </NavLink>

            <NavLink className="option" to="/contact">
                Contact
            </NavLink>
            {
                currentUser ?
                <div className="option" onClick={() => auth.signOut()}>Sign Out</div>
                : 
                <NavLink className="option" to="/signin">
                    Sign In
                </NavLink>

            }
            <CartIcon />
        </div>
        { hidden ? null :  <CartDropdown /> }
       
    </div>
)

const mapStateToProps = ({user: { currentUser}, cart: { hidden }}) => ({
    currentUser,
    hidden
})
export default connect(mapStateToProps)(Header);