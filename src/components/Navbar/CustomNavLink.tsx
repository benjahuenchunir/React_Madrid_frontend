import { NavLink } from 'react-router-dom';
import React from 'react';

function CustomNavLink({ to, children }) {

  return (
    <li>
      <NavLink className={({ isActive }) => isActive ? "active" : ""} to={to}>
        {children}
      </NavLink>
    </li>
  );
}

export default CustomNavLink;