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
      <div className="footer__container">

        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo-row">
            <img
              src="/idriplogo.png"
              alt="iDripPlus Logo"
              className="footer__logo"
            />
            <h2 className="footer__title">iDripPlus</h2>
          </div>
          <p className="footer__description">
            Mobile IV hydration and wellness delivered by licensed clinicians,
            right to your doorstep.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer__section">
          <h4 className="footer__heading">Explore</h4>
          <ul className="footer__list">
            <li><a href="#">Packages</a></li>
            <li><a href="#">Why Choose Us</a></li>
            <li><a href="#">How It Works</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__section">
          <h4 className="footer__heading">Contact</h4>

          <div className="footer__contact-item">
            <Phone size={18} />
            <span>+254 700 000 000</span>
          </div>

          <div className="footer__contact-item">
            <Mail size={18} />
            <span>info@idripplus.com</span>
          </div>

          <div className="footer__contact-item">
            <MapPin size={18} />
            <span>Nairobi, Kenya</span>
          </div>
        </div>

        {/* Socials */}
        <div className="footer__section">
          <h4 className="footer__heading">Follow Us</h4>
          <div className="footer__socials">
            <a href="#"><Facebook /></a>
            <a href="#"><Instagram /></a>
            <a href="#"><Twitter /></a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} iDripPlus — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
