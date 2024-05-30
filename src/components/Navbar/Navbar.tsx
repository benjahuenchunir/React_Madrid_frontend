import React, { Fragment, useState } from 'react';
import './Navbar.css';
import CustomNavLink from './CustomNavLink';

function Navbar(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
        setIsOpen(false);
    };

    const linkGroups = [
        [
            { to: "/", text: "Home" },
            { to: "/chats", text: "Chats" },
            { to: "/about-us", text: "Nosotros" },
        ],
        [
            { to: "/login", text: "Login" },
            { to: "/register", text: "Register" },
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
                <button className="hamburger-menu" onClick={() => setIsOpen(!isOpen)}/>
            </nav>
            {
                isOpen && (
                    <div className="dropdown-menu">
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