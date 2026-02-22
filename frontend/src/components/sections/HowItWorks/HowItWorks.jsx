// src/pages/HowItWorks.jsx
import React from "react";
import "./howitworks.scss";

const steps = [
  {
    number: "01",
    title: "Choose Your IV Package",
    text: "Browse hydration, immunity, energy and recovery packages. Each option clearly shows ingredients and benefits."
  },
  {
    number: "02",
    title: "Book Online",
    text: "Select your preferred date, time and location. Receive instant confirmation after booking."
  },
  {
    number: "03",
    title: "We Come to You",
    text: "A licensed clinician arrives at your home, hotel or office with sterile medical equipment."
  },
  {
    number: "04",
    title: "Relax & Rehydrate",
    text: "Treatment takes 30–45 minutes. Sit back, relax and feel refreshed."
  }
];

const HowItWorks = () => {
  return (
    <section className="how-it-works">

      {/* Hero */}
      <div className="how-hero">
        <div className="container">
          <h1>How It Works</h1>
          <p className="lead">
            Licensed clinicians. Safe procedures. Delivered to your home, hotel or office.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="how-steps">
        <div className="container">
          <div className="steps-grid">
            {steps.map((step) => (
              <div className="step-card" key={step.number}>
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety */}
      <div className="how-safety">
        <div className="container">
          <h2>Your Safety Comes First</h2>
          <ul>
            <li>Licensed Clinical Officers & Nurses</li>
            <li>Medical-grade sterile equipment</li>
            <li>Strict infection control standards</li>
            <li>Pre-treatment medical assessment</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="how-cta">
        <div className="container">
          <h2>Feel Better, Faster</h2>
          <button className="btn-primary">Book Now</button>
        </div>
      </div>

    </section>
  );
};

export default HowItWorks;
