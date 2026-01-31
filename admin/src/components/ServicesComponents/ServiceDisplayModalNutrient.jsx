import { X } from "lucide-react";
import "./ServiceDisplayModalNutrient.scss";

export default function ServiceDisplayModalNutrient({ isOpen, onClose, nutrient }) {
  if (!isOpen || !nutrient) return null;

  const {
    name,
    id,
    componentType,
    category,
    price,
    duration,
    status,
    images = {},
    benefits = [],
  } = nutrient;

  const coverImage = images.cover
    ? images.cover.startsWith("/uploads")
      ? `http://localhost:5000${images.cover}`
      : images.cover
    : null;

  const safeBenefits = Array.isArray(benefits) ? benefits : [];

  return (
    <div className="modal-overlay">
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nutrient-title"
      >
        {/* Header */}
        <div className="modal-header">
          <h2 id="nutrient-title">{name || "Nutrient Details"}</h2>
          <button onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Image */}
        {coverImage ? (
          <div className="modal-image">
            <img src={coverImage} alt={name} />
          </div>
        ) : (
          <div className="modal-image placeholder">No image available</div>
        )}

        {/* Meta info */}
        <div className="modal-meta">
          {status && <span className={`badge ${status}`}>{status}</span>}
          {componentType && <span className="badge">{componentType}</span>}
          {category && <span className="badge">{category}</span>}
          {id && <span className="badge">ID: {id}</span>}
        </div>

        {/* Details */}
        <div className="modal-section">
          <p>
            <strong>Price:</strong>{" "}
            {price ? `KES ${Number(price).toLocaleString()}` : "Not specified"}
          </p>
          <p>
            <strong>Duration:</strong> {duration || "Not specified"}
          </p>
        </div>

        {/* Benefits */}
        {safeBenefits.length > 0 && (
          <div className="modal-section nutrient-benefits">
            <h4>Benefits</h4>
            <ul>
              {safeBenefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
