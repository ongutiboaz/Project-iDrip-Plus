import React from "react";
import "./WhyChooseUs.scss";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Licensed Clinicians",
      desc: "All infusions are administered by certified medical professionals.",
      icon: "💉",
    },
    {
      title: "Fast Mobile Service",
      desc: "We deliver IV therapy to your home, office, hotel, or gym within minutes.",
      icon: "⚡",
    },
    {
      title: "Safe & Sterile Procedures",
      desc: "We use medical-grade equipment and follow strict safety protocols.",
      icon: "🛡️",
    },
  ];

  return (
    <section className="why-us">
      <h2>Why Choose iDripPlus?</h2>
      <p className="subtitle">
        A trusted, convenient and safe IV therapy service across Nairobi.
      </p>

      <div className="why-grid">
        {features.map((item, idx) => (
          <div className="card" key={idx}>
            <span className="icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
