import React, { Fragment, useState, useEffect, useRef, useContext } from 'react';
import './Navbar.scss';
import CustomNavLink from './CustomNavLink';
import { useAuth } from './../../auth/useAuth';
import { jwtDecode } from 'jwt-decode';

function isAdmin (token) {
    let decodedToken = jwtDecode(token);
    return decodedToken.scope === 'admin';
}

function Navbar(): JSX.Element {
    const { token } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const hamburgerRef = useRef<HTMLButtonElement | null>(null);

    const closeMenu = () => {
        setIsOpen(false);
    };

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
        ],
        [
            { to: "/profile", text: "Mi perfil" },
            { to: "/reports", text: "Reportes" },
        ]
    ];

    return (
        <>
            <nav className="navbar">
                <div className="left-nav-links">
                    <ul>
                    {linkGroups[0].map((link, linkIndex) => (
                        <li key={linkIndex}>
                            {(link.to === '/chats' && !token) ? null : (
                                <CustomNavLink to={link.to}>{link.text}</CustomNavLink>
                            )}
                        </li>
                    ))}
                    </ul>
                </div>

                <h1 className="nav-logo">deepspace</h1>

                <div className="right-nav-links">
                    
                    <ul>
                        {!token && linkGroups[1].map((link, linkIndex) => (
                            <li key={linkIndex}>
                                <CustomNavLink to={link.to}>{link.text}</CustomNavLink>
                            </li>
                        ))}
                        {(token && !isAdmin(token)) && linkGroups[2].map((link, linkIndex) => (
                            <li key={linkIndex}>
                                <CustomNavLink to={link.to}>{link.text}</CustomNavLink>
                            </li>
                        ))}
                        {(token && isAdmin(token)) && linkGroups[3].map((link, linkIndex) => (
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
                        {linkGroups.map((group, groupIndex) => {
                            // If user is logged in, only render groups at index 0 and 2
                            if (!token && (groupIndex === 0 || groupIndex === 1)) {
                                return (
                                    <Fragment key={groupIndex}>
                                        {group.map((link, linkIndex) => (
                                            <CustomNavLink key={linkIndex} to={link.to} onClick={closeMenu}>
                                                {link.text}
                                            </CustomNavLink>
                                        ))}
                                        {groupIndex < linkGroups.length - 1 && <div className="divider"></div>}
                                    </Fragment>
                                );
                            }
                            else if ((token && !isAdmin(token)) && (groupIndex === 0 || groupIndex === 2)) {
                                return (
                                    <Fragment key={groupIndex}>
                                        {group.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <CustomNavLink key={linkIndex} to={link.to} onClick={closeMenu}>
                                                    {link.text}
                                                </CustomNavLink>
                                            </li>
                                        ))}
                                        {groupIndex < linkGroups.length - 1 && <div className="divider"></div>}
                                    </Fragment>
                                );
                            }
                            else if ((token && isAdmin(token)) && (groupIndex === 0 || groupIndex === 3)) {
                                return (
                                    <Fragment key={groupIndex}>
                                        {group.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <CustomNavLink key={linkIndex} to={link.to} onClick={closeMenu}>
                                                    {link.text}
                                                </CustomNavLink>
                                            </li>
                                        ))}
                                        {groupIndex < linkGroups.length - 1 && <div className="divider"></div>}
                                    </Fragment>
                                );
                            }
                        })}
                    </div>
                )
            }
        </>
    );
}

export default Navbar;