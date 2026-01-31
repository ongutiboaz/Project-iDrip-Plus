import React from "react";
import "./Contact.scss";

const Contact = () => {
  return (
    <div className="contact-page">
      
      {/* HERO */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>Reach out for bookings, inquiries, or medical assistance.</p>
      </section>

      {/* CONTACT CARDS */}
      <section className="contact-info">
        <div className="info-card">
          <h3>📞 Phone</h3>
          <p>+254 712 345 678</p>
        </div>

        <div className="info-card">
          <h3>📧 Email</h3>
          <p>support@idripplus.com</p>
        </div>

        <div className="info-card">
          <h3>📍 Location</h3>
          <p>Nairobi, Kenya — Home & Mobile Services</p>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="contact-form-section">
        <h2>Send Us a Message</h2>

        <form className="contact-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" required placeholder="Enter your name" />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" required placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" required placeholder="Enter your phone" />
          </div>

          <div className="form-group">
            <label>Your Message</label>
            <textarea rows="5" placeholder="Type your message..."></textarea>
          </div>

          <button type="submit" className="send-btn">
            Send Message
          </button>
        </form>
      </section>

      {/* MAP SECTION */}
      <section className="map-section">
        <h2>Find Us</h2>

        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.45429927822!2d36.8132494!3d-1.286389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d88f5fa555%3A0xb6a12c52258a86gb!2sNairobi!5e0!3m2!1sen!2ske!4v1700000000000"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
