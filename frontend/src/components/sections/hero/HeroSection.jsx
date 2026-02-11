import React from "react";
import "./HeroSection.scss";
// import heroImg from "/idrip-hero.png"; // put your image into /src or /public
import { asset_images } from "../../../assets/asset-image";



const HeroSection = () => {
  return (
   <section className="hero">
  <div className="hero-left">
    <h1>Premium Mobile IV Therapy</h1>
    <p>
      Hydration, wellness, and recovery delivered straight to your home,
      office, gym, or hotel—by trained medical professionals.
    </p>

    <button className="hero-btn" type="button">Book a Drip</button>

    <ul className="hero-tags">
      <li>Fast Service</li>
      <li>Licensed Clinicians</li>
      <li>Mobile Delivery</li>
    </ul>
  </div>

  <div className="hero-right">
    <img src={asset_images.idrip_hero} alt="IV therapy illustration" />
  </div>
</section>

  );
};

export default HeroSection;
