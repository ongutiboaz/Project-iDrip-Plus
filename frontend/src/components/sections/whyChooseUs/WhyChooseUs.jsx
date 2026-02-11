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
      className="why-us"
      aria-labelledby="why-us-title"
      aria-describedby="why-us-desc"
      role="region"
    >
      <header className="why-us__header">
        <h2 id="why-us-title" className="why-us__title">
          Why Choose iDripPlus?
        </h2>

        <p id="why-us-desc" className="why-us__subtitle text-muted">
          A trusted, convenient and safe IV therapy service across Nairobi.
        </p>
      </header>

      <ul className="why-grid" role="list" aria-label="Key features">
        {features.map(({ id, title, desc, icon: Icon }) => (
          <li
            key={id}
            className="why-grid__item card"
            role="listitem"
            aria-labelledby={`${id}-title`}
            aria-describedby={`${id}-desc`}
          >
            <span className="card__icon" aria-hidden="true">
              <Icon size={32} strokeWidth={1.8} focusable={false} />
            </span>

            {/* Provide an accessible title and description */}
            <h3 id={`${id}-title`} className="card__title">
              {title}
            </h3>

            <p id={`${id}-desc`} className="card__desc">
              {desc}
            </p>
          </li>
        ))}
      </ul>

     
    </section>
  );
};

export default WhyChooseUs;
