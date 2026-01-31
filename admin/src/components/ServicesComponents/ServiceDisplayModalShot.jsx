import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import "./ServiceDisplayModalShot.scss";

export default function ServiceDisplayModalShot({
  isOpen,
  onClose,
  shot,
  nutrients = [], // FULL nutrient objects [{_id, name, category, componentType, benefits, images}]
}) {
  const [openFaq, setOpenFaq] = useState(null);

  if (!isOpen || !shot) return null;

  const {
    name,
    componentType,
    category,
    description,
    howItWorks,
    indications = [],
    contraindications = [],
    benefits = [],
    duration,
    price,
    status,
    images = {},
    faqs = [],
    disclaimer,
    nutrients: linkedNutrientIds = [],
  } = shot;

  // Resolve nutrient objects from IDs
  const linkedNutrients = nutrients.filter((n) =>
    linkedNutrientIds.includes(n._id)
  );
  const coverImage = images.cover
    ? images.cover.startsWith("/uploads")
      ? `http://localhost:5000${images.cover}`
      : images.cover
    : null;

  const resolveImage = (img) => {
    if (!img) return null;
    return img.startsWith("/uploads") ? `http://localhost:5000${img}` : img;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card large">
        {/* Header */}
        <div className="modal-header">
          <h2>{name}</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>






        {coverImage && (
          <div className="modal-image">
            <img src={coverImage} alt={name} />
          </div>
        )}

        {/* ================= META ================= */}
        <div className="modal-meta">
          <span className={`badge ${status}`}>{status}</span>
          <span className="badge">{componentType}</span>
          <span className="badge">{category}</span>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <section className="modal-section">
          <h4>Description</h4>
          <p>{description}</p>
        </section>

        <section className="modal-section">
          <h4>How It Works</h4>
          <p>{howItWorks}</p>
        </section>

        {/* ================= MEDICAL ================= */}
        {indications.length > 0 && (
          <section className="modal-section">
            <h4>Indications</h4>
            <ul>
              {indications.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </section>
        )}

        {contraindications.length > 0 && (
          <section className="modal-section warning">
            <h4>Contraindications</h4>
            <ul>
              {contraindications.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </section>
        )}

        {/* ================= BENEFITS ================= */}
        {benefits.length > 0 && (
          <section className="modal-section">
            <h4>Benefits</h4>
            <ul>
              {benefits.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </section>
        )}

        {/* ================= LOGISTICS ================= */}
        <section className="modal-section">
          <p>
            <strong>Duration:</strong> {duration}
          </p>
          <p>
            <strong>Price:</strong> KES {price.toLocaleString()}
          </p>
        </section>

        {/* ================= LINKED NUTRIENTS ================= */}

        {linkedNutrients.length > 0 && (
          <section className="modal-section nutrients">
            <h4>Included Nutrients</h4>

            <div className="nutrient-cards">
              {linkedNutrients.map((n) => (
                <div key={n._id} className="nutrient-card">
                  {n.images?.cover && (
                    <img
                      src={resolveImage(n.images.cover)}
                      alt={n.name}
                      className="nutrient-image"
                    />
                  )}

                  <h5>{n.name}</h5>

                  <div className="nutrient-meta">
                    <span className="badge">{n.category}</span>
                    <span className="badge">{n.componentType}</span>
                  </div>

                  {n.benefits?.length > 0 && (
                    <ul>
                      {n.benefits.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= FAQs ================= */}
        {faqs.length > 0 && (
          <section className="modal-section">
            <h4>FAQs</h4>

            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                  >
                    {faq.question}
                    {isOpen ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>

                  {isOpen && <p className="faq-answer">{faq.answer}</p>}
                </div>
              );
            })}
          </section>
        )}

        {/* ================= DISCLAIMER ================= */}
        {disclaimer && <div className="modal-disclaimer">{disclaimer}</div>}
      </div>
    </div>
  );
}
