import React, { Fragment, useState, useEffect, useRef } from 'react';
import './Navbar.css';
import CustomNavLink from './CustomNavLink';

function Navbar(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLElement | null>(null);
    const hamburgerRef = useRef<HTMLButtonElement | null>(null);

    const closeMenu = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && event.target !== hamburgerRef.current) {
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
            { to: "/docs", text: "Página de Instrucciones"},
        ],
        [
            { to: "/login", text: "Iniciar Sesión" },
            { to: "/register", text: "Registrarse" },
        ]
    ];

    return (
        <>
            <nav className="navbar">
                {linkGroups.map((group, groupIndex) => (
                    <ul key={groupIndex}>
                        {group.map((link, linkIndex) => (
                            <li key={linkIndex}>
                                <CustomNavLink to={link.to}>{link.text}</CustomNavLink>
                            </li>
                        ))}
                    </ul>
                ))}
                <button className="hamburger-menu" onClick={() => setIsOpen(!isOpen)} ref={hamburgerRef}/>
            </nav>
            {
                isOpen && (
                    <div className="dropdown-menu" ref={dropdownRef}>
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