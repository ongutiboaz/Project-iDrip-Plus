// src/components/servicesComponent/cards/ShotCard.jsx
import { Link } from "react-router-dom";
import "./ServiceCard.scss";

export default function ShotCard({ shot }) {
  return (
    <div className="service-card">
      <div className="image-wrap">
        <img
          src={`http://localhost:5000${shot.images?.cover}`}
          alt={shot.name}
        />
      </div>

      <div className="service-content">
        <div className="service-meta">
          <span>{shot.duration}</span>
          <span className="price">KES {shot.price}</span>
        </div>

        <div className="service-name-description">
          <h3>{shot.name}</h3>
          <p className="desc">{shot.description?.slice(0, 80)}...</p>
        </div>
      </div>
      <div className="service-buttons">
        <Link to={`/Shots/${shot._id}`} className="service-btn">
          View More
        </Link>
        <Link to={`/Shots/${shot._id}`} className="service-btn">
          Book Drip
        </Link>
      </div>
    </div>
  );
}
