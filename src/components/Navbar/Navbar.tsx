import React, {useState} from 'react';
import './Navbar.css';
import CustomNavLink from './CustomNavLink';

function Navbar(): JSX.Element {
    const [isOpen, setIsOpen] = React.useState(false);

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
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
                <button className="hamburger-menu" onClick={() => setIsOpen(!isOpen)}/>
            </nav>
            {
                isOpen && (
                    <div className="dropdown-menu">
                        <CustomNavLink to="/" onClick={closeMenu}>Home</CustomNavLink>
                        <CustomNavLink to="/chats" onClick={closeMenu}>Chats</CustomNavLink>
                        <CustomNavLink to="/about-us" onClick={closeMenu}>Nosotros</CustomNavLink>
                        <CustomNavLink to="/login" onClick={closeMenu}>Login</CustomNavLink>
                        <CustomNavLink to="/register" onClick={closeMenu}>Register</CustomNavLink>
                    </div>
                )
            }
        </>
    );
}

export default Navbar;