import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <div className="logo-row">
            <img src="/idriplogo.png" alt="iDripPlus Logo" className="footer-logo" />
            <h2>iDripPlus</h2>
          </div>
          <p>
            Mobile IV hydration and wellness delivered by licensed clinicians,
            right to your doorstep.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li><a href="#packages">Packages</a></li>
            <li><a href="#why">Why Choose Us</a></li>
            <li><a href="#how">How It Works</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact</h4>

          <div className="contact-item">
            <Phone size={18} />
            <span>+254 700 000 000</span>
          </div>

          <div className="contact-item">
            <Mail size={18} />
            <span>info@idripplus.com</span>
          </div>

          <div className="contact-item">
            <MapPin size={18} />
            <span>Nairobi, Kenya</span>
          </div>
        </div>

        {/* Socials */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><Facebook /></a>
            <a href="#"><Instagram /></a>
            <a href="#"><Twitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} iDripPlus — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
