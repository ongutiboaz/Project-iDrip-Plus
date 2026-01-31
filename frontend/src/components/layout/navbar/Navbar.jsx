// src/components/layout/navbar/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import idriplogo from "../../../../public/idriplogo.png";

import "./Navbar.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/idriplogo.png" alt="" />
        </Link>

        {/* Hamburger for mobile */}
        <button className="navbar-hamburger" onClick={toggleMenu}>
          {isOpen ? (
            <span className="icon-close">&#10005;</span>
          ) : (
            <span className="icon-menu">&#9776;</span>
          )}
        </button>

        {/* Desktop Menu */}
        <ul className="navbar-menu desktop-menu">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/drips"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Drips
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shots"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Shots
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        <button
          className="navbar-booking-button"
          onClick={() => navigate("/booking")}
        >
          Book your drip Now
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="navbar-menu mobile-menu">
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" onClick={toggleMenu}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/inventory" onClick={toggleMenu}>
              Inventory
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMenu}>
              Contact
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
