import { Link } from 'react-router-dom';
import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/chats">Chats</Link></li>
        <li><Link to="/about-us">Nosotros</Link></li>
      </ul>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;