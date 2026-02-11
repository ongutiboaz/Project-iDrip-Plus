// src/components/layout/navbar/Navbar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
} from "lucide-react";

import "./Navbar.scss";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/idriplogo.png" alt="iDripPlus" />
        </Link>

        {/* Desktop Menu */}
        <ul className="navbar-menu desktop">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/drips">Drips</NavLink></li>
          <li><NavLink to="/shots">Shots</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>

        {/* Desktop CTA */}
        <button
          className="navbar-cta desktop"
          onClick={() => navigate("/booking")}
        >
          Book Your Drip
        </button>

        {/* Mobile Toggle */}
        <button className="navbar-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <ul>
          <li><NavLink to="/" onClick={toggleMenu}>Home</NavLink></li>
          <li><NavLink to="/drips" onClick={toggleMenu}>Drips</NavLink></li>
          <li><NavLink to="/shots" onClick={toggleMenu}>Shots</NavLink></li>
          <li><NavLink to="/about" onClick={toggleMenu}>About</NavLink></li>
          <li><NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink></li>
        </ul>

        {/* Mobile CTAs */}
        <div className="mobile-ctas">
          <a href="tel:+254700000000" className="cta call">
            <Phone size={18} />
            Call Us
          </a>

          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noreferrer"
            className="cta whatsapp"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>

          <button
            className="navbar-cta mobile"
            onClick={() => {
              toggleMenu();
              navigate("/booking");
            }}
          >
            Book Your Drip
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
