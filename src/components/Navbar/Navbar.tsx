import React from 'react';
import './Navbar.css';
import CustomNavLink from './CustomNavLink';

function Navbar(): JSX.Element {
    return (
        <nav>
            <ul>
                <li><CustomNavLink to="/">Home</CustomNavLink></li>
                <li><CustomNavLink to="/chats">Chats</CustomNavLink></li>
                <li><CustomNavLink to="/about-us">Nosotros</CustomNavLink></li>
            </ul>
            <ul>
                <li><CustomNavLink to="/login">Login</CustomNavLink></li>
                <li><CustomNavLink to="/register">Register</CustomNavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;