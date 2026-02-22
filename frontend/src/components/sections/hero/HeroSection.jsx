import React from "react";
import "./HeroSection.scss";
import { asset_images } from "../../../assets/asset-image";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero__container">

        <div className="hero__content">
          <h1 className="hero__title">
            Premium Mobile IV Therapy
          </h1>

          <p className="hero__text">
            Hydration, wellness, and recovery delivered straight to your home,
            office, gym, or hotel—by trained medical professionals.
          </p>

          <button className="hero__button" type="button">
            Book a Drip
          </button>

          <ul className="hero__tags">
            <li className="hero__tag">Fast Service</li>
            <li className="hero__tag">Licensed Clinicians</li>
            <li className="hero__tag">Mobile Delivery</li>
          </ul>
        </div>

        <div className="hero__image-wrapper">
          <img
            src={asset_images.idrip_hero}
            alt="IV therapy illustration"
            className="hero__image"
          />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
