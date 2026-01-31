import React from "react";
import "./Packages.scss";

const Packages = () => {
  const drips = [
    {
      name: "Hydration Drip",
      price: "KSh 5,500",
      desc: "Instant hydration to boost energy, improve recovery, and fight dehydration.",
      icon: "💧",
    },
    {
      name: "Immunity Boost",
      price: "KSh 7,000",
      desc: "Vitamin C, zinc, and antioxidants to strengthen your immune system.",
      icon: "🛡️",
    },
    {
      name: "Energy & Performance",
      price: "KSh 8,000",
      desc: "B12 and electrolytes to enhance energy levels and improve endurance.",
      icon: "⚡",
    },
    {
      name: "Hangover Relief",
      price: "KSh 6,500",
      desc: "Rehydrate, detox, and recover quickly after a night out.",
      icon: "🍹",
    },
  ];

  return (
    <section className="packages">
      <h2>Popular Drips</h2>
      <p className="subtitle">Our most requested IV therapy packages.</p>

      <div className="packages-grid">
        {drips.map((item, idx) => (
          <div className="package-card" key={idx}>
            <span className="icon">{item.icon}</span>
            <h3>{item.name}</h3>
            <p className="desc">{item.desc}</p>
            <p className="price">{item.price}</p>
            <button className="book-btn">Book Now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Packages;
