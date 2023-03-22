import React from "react";
import { NavLink } from "react-router-dom";

import './header.styles.scss';
import { ReactComponent as Logo} from '../../assets/crown.svg'

const Header = () => (
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
        </div>
    </div>
)

export default Header;