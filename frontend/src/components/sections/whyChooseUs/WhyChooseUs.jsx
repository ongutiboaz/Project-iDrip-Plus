import React from "react";
import { Stethoscope, Zap, ShieldCheck } from "lucide-react";
import "./WhyChooseUs.scss";

const features = [
  {
    id: "licensed-clinicians",
    title: "Licensed Clinicians",
    desc: "All infusions are administered by certified medical professionals.",
    icon: Stethoscope,
  },
  {
    id: "fast-mobile-service",
    title: "Fast Mobile Service",
    desc: "We deliver IV therapy to your home, office, hotel, or gym within minutes.",
    icon: Zap,
  },
  {
    id: "safe-sterile",
    title: "Safe & Sterile Procedures",
    desc: "We use medical-grade equipment and follow strict safety protocols.",
    icon: ShieldCheck,
  },
];

const WhyChooseUs = () => {
  return (
    <section
      className="why"
      aria-labelledby="why-title"
      aria-describedby="why-subtitle"
      role="region"
    >
      <div className="why__container">

        <header className="why__header">
          <h2 id="why-title" className="why__title">
            Why Choose iDripPlus?
          </h2>

          <p id="why-subtitle" className="why__subtitle">
            A trusted, convenient and safe IV therapy service across Nairobi.
          </p>
        </header>

        <ul className="why__grid" role="list" aria-label="Key features">
          {features.map(({ id, title, desc, icon: Icon }) => (
            <li
              key={id}
              className="why__card"
              role="listitem"
              aria-labelledby={`${id}-title`}
              aria-describedby={`${id}-desc`}
            >
              <span className="why__icon" aria-hidden="true">
                <Icon size={32} strokeWidth={1.8} focusable={false} />
              </span>

              <h3 id={`${id}-title`} className="why__card-title">
                {title}
              </h3>

              <p id={`${id}-desc`} className="why__card-desc">
                {desc}
              </p>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
};

export default WhyChooseUs;
