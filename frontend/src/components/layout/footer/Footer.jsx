import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer new-footer">
      <div className="footer-wrapper">

        {/* Logo + Tagline */}
        <div className="footer-brand">
          <h2>iDripPlus</h2>
          <p>Mobile IV hydration and wellness delivered by licensed clinicians.</p>
        </div>

        {/* Navigation */}
        <div className="footer-nav">
          <h4>Explore</h4>
          <ul>
            <li><a href="#packages">Packages</a></li>
            <li><a href="#why">Why Choose Us</a></li>
            <li><a href="#how">How It Works</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>📞 +254 700 000 000</p>
          <p>📧 info@idripplus.com</p>
          <p>📍 Nairobi, Kenya</p>
        </div>

        {/* Socials */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="icons">
            <a href="#">📘</a>
            <a href="#">📸</a>
            <a href="#">🐦</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} iDripPlus — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
