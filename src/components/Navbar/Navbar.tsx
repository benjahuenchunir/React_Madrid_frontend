import React, { Fragment, useState, useEffect, useRef, useContext } from 'react';
import './Navbar.scss';
import CustomNavLink from './CustomNavLink';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { AuthContext } from '../../auth/authContext';

function Navbar(): JSX.Element {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {token} = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const hamburgerRef = useRef<HTMLButtonElement | null>(null);

    const closeMenu = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        // Check if the user is logged in by checking if a token is stored
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && event.target !== hamburgerRef.current) {
                closeMenu();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const linkGroups = [
        [
            { to: "/", text: "Inicio" },
            { to: "/chats", text: "Chats" },
            { to: "/about-us", text: "Nosotros" },
            { to: "/docs", text: "Instrucciones" },
        ],
        [
            { to: "/login", text: "Iniciar Sesión" },
            { to: "/register", text: "Registrarse" },
        ],
        [
            { to: "/profile", text: "Mi perfil" },
        ]
    ];

    return (
        <>
            <nav className="navbar">
                <div className="left-nav-links">
                    <ul>
                        {linkGroups[0].map((link, linkIndex) => (
                            <li key={linkIndex}>
                                <CustomNavLink to={link.to}>{link.text}</CustomNavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <h1 className="nav-logo">deepspace</h1>

                <div className="right-nav-links">
                    
                    <ul>
                        {!isLoggedIn && linkGroups[1].map((link, linkIndex) => (
                            <li key={linkIndex}>
                                <CustomNavLink to={link.to}>{link.text}</CustomNavLink>
                            </li>
                        ))}
                        {isLoggedIn && linkGroups[2].map((link, linkIndex) => (
                            <li key={linkIndex}>
                                <CustomNavLink to={link.to}>{link.text}</CustomNavLink>
                            </li>
                        ))}
                    </ul>
                    <button className="hamburger-menu" onClick={() => setIsOpen(!isOpen)} ref={hamburgerRef}>
                        <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" height="24px"
                             viewBox="0 -960 960 960"
                             width="24px">
                            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                        </svg>
                    </button>
                </div>
            </nav>
            {
                (
                    <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} ref={dropdownRef}>
                        {linkGroups.map((group, groupIndex) => (
                            <Fragment key={groupIndex}>
                                {group.map((link, linkIndex) => (
                                    <CustomNavLink key={linkIndex} to={link.to} onClick={closeMenu}>
                                        {link.text}
                                    </CustomNavLink>
                                ))}
                                {groupIndex < linkGroups.length - 1 && <div className="divider"></div>}
                            </Fragment>
                        ))}
                    </div>
                )
            }
        </>
    );
}

export default Navbar;