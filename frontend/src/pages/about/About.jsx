import React from "react";
import "./About.scss";

const About = () => {
  return (
    <div className="about-page">
      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="hero-text">
          <h1>About Us</h1>
          <p>Your trusted partner in IV therapy, wellness, and mobile healthcare.</p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          We are a team of licensed clinicians dedicated to providing safe, reliable, and
          convenient IV drip therapy services. Our goal is to bring high-quality healthcare 
          directly to your home, office, or hotel — fast, professional, and stress-free.
        </p>
      </section>

      {/* MISSION & VISION */}
      <section className="mission-vision">
        <div className="card">
          <h3>Our Mission</h3>
          <p>
            To make wellness accessible by offering medically approved IV therapy,
            hydration, and vitamin infusion services delivered by qualified clinicians.
          </p>
        </div>

        <div className="card">
          <h3>Our Vision</h3>
          <p>
            To become the leading mobile IV therapy service provider in Kenya, empowering
            individuals to achieve optimal health and performance effortlessly.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="values">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h4>Professionalism</h4>
            <p>All procedures are performed by trained and licensed clinicians.</p>
          </div>

          <div className="value-card">
            <h4>Safety First</h4>
            <p>Every drip is prepared under strict medical standards and hygiene.</p>
          </div>

          <div className="value-card">
            <h4>Convenience</h4>
            <p>We bring the service to you — home, office, or hotel.</p>
          </div>

          <div className="value-card">
            <h4>Care & Compassion</h4>
            <p>Your comfort and health are our top priority.</p>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="team">
        <h2>Meet the Team</h2>
        <p>Our skilled clinicians ensure every drip is safe and effective.</p>

        <div className="team-grid">
          <div className="team-member">
            <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7" alt="" />
            <h4>Clinician</h4>
            <p>Lead IV Specialist</p>
          </div>

          <div className="team-member">
            <img src="https://images.unsplash.com/photo-1584466977773-2f13977b9a90" alt="" />
            <h4>Clinician</h4>
            <p>Mobile IV Nurse</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to Book Your Drip?</h2>
        <p>Hydration. Energy. Immunity. Delivered instantly to you.</p>
        <button>Book a Session</button>
      </section>
    </div>
  );
};

export default About;
