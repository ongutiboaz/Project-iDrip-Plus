// src/pages/Shots.jsx
// import ShotList from "../../components/servicesComponent/lists/ShotList";
import ShotList from "../../components/servicesComponent/lists/ShotList";
import "./Shots.scss";

export default function Shots() {
  return (
    <div className="page shots-page">
      {/* HERO */}
      <section className="shots-hero">
        <h1>Vitamin & Therapeutic Shots</h1>
        <p className="subtitle">
          Concentrated intramuscular / intravenous injections designed for rapid support in
          energy, immunity, metabolism, and recovery.
        </p>
      </section>

      {/* INFO STRIP */}
      <section className="shots-info">
        <div className="info-card">
          <h4>💉 Quick Administration</h4>
          <p>
            Delivered in minutes with minimal downtime — ideal for busy
            schedules.
          </p>
        </div>

        <div className="info-card">
          <h4>⚡ Rapid Effect</h4>
          <p>
            Faster absorption than oral supplements for targeted support.
          </p>
        </div>

        <div className="info-card">
          <h4>➕ Add-On Friendly</h4>
          <p>
            Can be added to IV drips or taken as a standalone treatment.
          </p>
        </div>
      </section>

      {/* LIST */}
      <section className="shots-list-section">
        <h2>Available Shots</h2>
        <p className="section-desc">
          Our therapeutic shots are formulated to target specific health needs
          such as fatigue, immunity, weight management, and muscle recovery.
        </p>

        <ShotList />
      </section>

      {/* DISCLAIMER */}
      <section className="shots-disclaimer">
        <p>
          ⚠️ Shots are administered after a brief clinical assessment. Not
          recommended for individuals with contraindications to injectable
          therapy.
        </p>
      </section>
    </div>
  );
}
