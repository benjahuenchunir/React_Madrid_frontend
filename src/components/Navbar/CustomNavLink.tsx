import { NavLink } from 'react-router-dom';
import React from 'react';

function CustomNavLink({ to, children, onClick = () => {} }) {

  return (
    <li>
      <NavLink 
        className={({ isActive }) => isActive ? "active" : ""} 
        to={to}
        onClick={onClick}
      >
        {children}
      </NavLink>
    </li>
  );
}

export default CustomNavLink;