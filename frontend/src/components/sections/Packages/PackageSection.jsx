import React from "react";
import "./PackageSection.scss";

const PackageSection = ({ title, subtitle, packages }) => {
  return (
    <div className="package-section">
      <header className="package-section__header">
        <h2 className="package-section__title">{title}</h2>
        {subtitle && <p className="package-section__subtitle">{subtitle}</p>}
      </header>

      <div className="package-section__grid">
        {packages.map(({ id, name, price, description, image, popular }) => (
          <div
            key={id}
            className={`package-card ${popular ? "package-card--popular" : ""}`}
          >
            <div className="package-card__image-wrapper">
              <img src={image} alt={name} className="package-card__image" />
            </div>

            <div className="package-card__content">
              <h3 className="package-card__title">{name}</h3>
              <p className="package-card__desc">{description}</p>
              <p className="package-card__price">{price}</p>
              <button className="package-card__btn">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageSection;
