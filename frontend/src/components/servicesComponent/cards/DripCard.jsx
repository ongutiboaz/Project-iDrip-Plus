// src/components/servicesComponent/cards/DripCard.jsx
import { Link } from "react-router-dom";
// import "./.scss";
import "./ServiceCard.scss";

export default function DripCard({ drip }) {
  return (
    <div className="service-card">
      <div className="image-wrap">
        <img
          src={`http://localhost:5000${drip.images?.cover}`}
          alt={drip.name}
        />
      </div>

      <div className="service-content">
        <div className="service-meta">
          <span>{drip.duration}</span>
          <span className="price">KES {drip.price}</span>
        </div>
        <div className="service-name-description">
          <h3>{drip.name}</h3>
          <p className="desc">{drip.description}</p>
        </div>
      </div>
      <div className="service-buttons">
        <Link to={`/drips/${drip._id}`} className="service-btn">
          View More
        </Link>
        <Link to={`/drips/${drip._id}`} className="service-btn">
          Book Drip
        </Link>
      </div>
    </div>
  );
}
