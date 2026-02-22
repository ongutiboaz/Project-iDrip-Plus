// src/components/layout/navbar/Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, Phone, MessageCircle } from "lucide-react";

import "./Navbar.scss";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Drips", path: "/drips" },
  { label: "Shots", path: "/shots" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  /* ===============================
     Scroll Shadow
  ================================ */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===============================
     Lock body scroll when mobile menu is open
  ================================ */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>

      {/* ===============================
          MAIN NAV CONTAINER
      ================================ */}
      <div className="navbar__container">

        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img src="/idriplogo.png" alt="iDripPlus" />
        </Link>

        {/* Desktop Menu */}
        <ul className="navbar__menu navbar__menu--desktop">
          {NAV_ITEMS.map((item) => (
            <li key={item.path} className="navbar__item">
              <NavLink
                to={item.path}
                className="navbar__link"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button
          className="navbar__cta navbar__cta--desktop"
          onClick={() => navigate("/booking")}
        >
          Book Your Drip
        </button>

        {/* Mobile Toggle */}
        <button
          className="navbar__toggle"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={toggleMenu}
        >
          <Menu size={26} />
        </button>
      </div>

      {/* ===============================
          MOBILE OVERLAY MENU
      ================================ */}
      <div
        className={`navbar__mobile-menu ${isOpen ? "navbar__mobile-menu--open" : ""
          }`}
      >
        {/* Overlay Header (Logo + Close X) */}
        <div className="navbar__mobile-header">
          <img src="/idriplogo.png" alt="iDripPlus" />
          <button
            className="navbar__mobile-close"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <ul className="navbar__mobile-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className="navbar__mobile-link"
                onClick={toggleMenu}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile CTAs */}
        <div className="navbar__mobile-ctas">
          <a
            href="tel:+254700000000"
            className="navbar__cta navbar__cta--call"
          >
            <Phone size={18} />
            Call Us
          </a>

          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noreferrer"
            className="navbar__cta navbar__cta--whatsapp"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>

          <button
            className="navbar__cta navbar__cta--mobile"
            onClick={() => handleNavigate("/booking")}
          >
            Book Your Drip
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
