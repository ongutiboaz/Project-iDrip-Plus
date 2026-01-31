// src/pages/Drip.jsx
import DripList from "../../components/servicesComponent/lists/DripList";
import "./Drips.scss";

export default function Drip() {
  return (
    <div className="page drip-page">
      {/* HERO */}
      <section className="drip-hero">
        <h1>IV Drip Therapy</h1>
        <p className="subtitle">
          Clinically formulated intravenous therapies designed to restore,
          hydrate, boost immunity, and enhance overall wellness.
        </p>
      </section>

      {/* INFO STRIP */}
      <section className="drip-info">
        <div className="info-card">
          <h4>⚡ Fast Absorption</h4>
          <p>
            Delivers nutrients directly into your bloodstream for maximum
            bioavailability.
          </p>
        </div>

        <div className="info-card">
          <h4>🩺 Clinician Supervised</h4>
          <p>
            All drips are administered under professional medical supervision.
          </p>
        </div>

        <div className="info-card">
          <h4>🧪 Customized Blends</h4>
          <p>
            Add vitamins, antioxidants, or therapeutic shots based on your
            needs.
          </p>
        </div>
      </section>

      {/* LIST */}
      <section className="drip-list-section">
        <h2>Available IV Drips</h2>
        <p className="section-desc">
          Choose from our curated range of IV therapies. Each drip is formulated
          for specific health goals such as energy, detox, skin glow, immunity,
          and recovery.
        </p>

        <DripList />
      </section>

      {/* DISCLAIMER */}
      <section className="drip-disclaimer">
        <p>
          ⚠️ IV therapy is not a substitute for medical treatment. A brief
          clinical assessment is required before administration.
        </p>
      </section>
    </div>
  );
}
