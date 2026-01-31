import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import "./ServiceDisplayModalDrip.scss";

function NutrientCard({ item, resolveImage }) {
  return (
    <div className="nutrient-card">
      {item.images?.cover && (
        <img
          src={resolveImage(item.images.cover)}
          alt={item.name}
          className="nutrient-image"
        />
      )}
      <h5>{item.name}</h5>
      <div className="nutrient-meta">
        <span className="badge">{item.category}</span>
        <span className="badge">{item.componentType}</span>
      </div>
      {item.benefits?.length > 0 && (
        <ul>
          {item.benefits.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FaqItem({ faq, idx, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <button
        className="faq-question"
        onClick={() => onToggle(isOpen ? null : idx)}
        aria-expanded={isOpen}
      >
        {faq.question}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && <p className="faq-answer">{faq.answer}</p>}
    </div>
  );
}

export default function ServiceDisplayModalDrip({
  isOpen,
  onClose,
  drip,
  nutrients = [],
  shots = [],
}) {
  const [openFaq, setOpenFaq] = useState(null);

  if (!isOpen || !drip) return null;

  const {
    name,
    id,
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
    addonNutrients: linkedAddonNutrientIds = [],
    addonShots: linkedAddonShotIds = [],
  } = drip;

  const resolveImage = (img) =>
    img?.startsWith("/uploads") ? `http://localhost:5000${img}` : img;

  const linkedNutrients = nutrients.filter((n) =>
    linkedNutrientIds.includes(n._id)
  );
  const linkedAddonNutrients = nutrients.filter((n) =>
    linkedAddonNutrientIds.includes(n._id)
  );
  const linkedAddonShots = shots.filter((s) =>
    linkedAddonShotIds.includes(s._id)
  );

  const coverImage = images.cover ? resolveImage(images.cover) : null;

  return (
    <div className="modal-overlay">
      <div
        className="modal-card large"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <header className="modal-header">
          <h2 id="modal-title">{name}</h2>
          <button onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        {/* Cover Image */}
        {coverImage && (
          <div className="modal-image">
            <img src={coverImage} alt={name} />
          </div>
        )}

        {/* Badges */}
        <div className="modal-meta">
          <span className={`badge ${status}`}>{status}</span>
          <span className="badge">{category}</span>
          <span className="badge">ID-{id}</span>
          <span className="badge">ID-{componentType}</span>

          

        </div>

        {/* Description */}
        <section className="modal-section">
          <h4>Description</h4>
          <p>{description || "No description provided."}</p>
        </section>

        <section className="modal-section">
          <h4>How It Works</h4>
          <p>{howItWorks || "No details provided."}</p>
        </section>

        {/* Medical Info */}
        {indications.length > 0 && (
          <section className="modal-section">
            <h4>Indications</h4>
            <ul>{indications.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
          </section>
        )}

        {contraindications.length > 0 && (
          <section className="modal-section warning">
            <h4>Contraindications</h4>
            <ul>{contraindications.map((c, idx) => <li key={idx}>{c}</li>)}</ul>
          </section>
        )}

        {benefits.length > 0 && (
          <section className="modal-section">
            <h4>Benefits</h4>
            <ul>{benefits.map((b, idx) => <li key={idx}>{b}</li>)}</ul>
          </section>
        )}

        {/* Logistics */}
        <section className="modal-section">
          <p>
            <strong>Duration:</strong> {duration}
          </p>
          <p>
            <strong>Price:</strong> KES {price?.toLocaleString()}
          </p>
        </section>

        {/* Linked Nutrients */}
        {linkedNutrients.length > 0 && (
          <section className="modal-section nutrients">
            <h4>Base Nutrients</h4>
            <div className="nutrient-cards">
              {linkedNutrients.map((n) => (
                <NutrientCard key={n._id} item={n} resolveImage={resolveImage} />
              ))}
            </div>
          </section>
        )}

        {linkedAddonNutrients.length > 0 && (
          <section className="modal-section nutrients">
            <h4>Addon Nutrients</h4>
            <div className="nutrient-cards">
              {linkedAddonNutrients.map((n) => (
                <NutrientCard key={n._id} item={n} resolveImage={resolveImage} />
              ))}
            </div>
          </section>
        )}

        {linkedAddonShots.length > 0 && (
          <section className="modal-section nutrients">
            <h4>Addon Shots</h4>
            <div className="nutrient-cards">
              {linkedAddonShots.map((s) => (
                <NutrientCard key={s._id} item={s} resolveImage={resolveImage} />
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        {faqs.length > 0 && (
          <section className="modal-section">
            <h4>FAQs</h4>
            {faqs.map((faq, idx) => (
              <FaqItem
                key={idx}
                faq={faq}
                idx={idx}
                isOpen={openFaq === idx}
                onToggle={setOpenFaq}
              />
            ))}
          </section>
        )}

        {/* Disclaimer */}
        {disclaimer && <footer className="modal-disclaimer">{disclaimer}</footer>}
      </div>
    </div>
  );
}
