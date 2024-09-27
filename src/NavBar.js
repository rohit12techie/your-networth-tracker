// src/NavBar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  };

  return (
    <nav className="navbar">
      <ul>
        <li className={location.pathname === "/" ? "active" : ""}><Link to="/">Home</Link></li>
        <li className={location.pathname === "/expenses" ? "active" : ""}><Link to="/expenses">Monthly Expenses</Link></li>
        <li className={location.pathname === "/investment" ? "active" : ""}><Link to="/investment">Monthly Investment</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;

