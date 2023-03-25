import React from "react";
import { NavLink } from "react-router-dom";

import './header.styles.scss';
import { ReactComponent as Logo} from '../../assets/crown.svg'
import { auth } from "../../firebase/firebase.utils";

const Header = ({currentUser}) => (
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
        </div>
    </div>
)

export default Header;