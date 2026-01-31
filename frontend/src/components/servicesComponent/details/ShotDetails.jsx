import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ShotDetail.scss";

export default function ShotDetail() {
  const { id } = useParams();

  const [shot, setShot] = useState(null);
  const [allNutrients, setAllNutrients] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    fetchShot();
    fetchNutrients();
  }, [id]);

  /* ---------------- FETCH SHOT ---------------- */
  const fetchShot = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/shots/${id}`);
      const data = await res.json();
      setShot(data);
    } catch (err) {
      console.error("FETCH SHOT ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FETCH ADDON NUTRIENTS ---------------- */
  const fetchNutrients = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/nutrients");
      const data = await res.json();
      setAllNutrients(data);
    } catch (err) {
      console.error("FETCH NUTRIENTS ERROR:", err);
    }
  };

  /* ---------------- ADDON FILTER ---------------- */
  const addonNutrients =
    shot?.nutrients?.length && allNutrients.length
      ? allNutrients.filter((n) => shot.nutrients.includes(n._id))
      : [];

  /* ---------------- ADD ADDON ---------------- */
  const handleAddAddon = (nutrient) => {
    setSelectedAddons((prev) =>
      prev.some((n) => n._id === nutrient._id) ? prev : [...prev, nutrient]
    );
  };

  if (loading) return <p className="loading">Loading injection...</p>;
  if (!shot) return <p>Injection not found</p>;

  return (
    <div className="shot-detail">
      <Link to="/shots" className="back-link">
        ← Back to Injections
      </Link>

      {/* HEADER */}
      <div className="header">
        <img
          src={`http://localhost:5000${shot.images?.cover}`}
          alt={shot.name}
        />

        <div className="info">
          <h1>{shot.name}</h1>
          <p className="description">{shot.description}</p>

          <div className="meta">
            <span>⏱ {shot.duration}</span>
            <span>💉 {shot.componentType}</span>
            <span className="price">KES {shot.price.toLocaleString()}</span>
          </div>

          <button className="btn-primary">Book This {shot.category}</button>
        </div>
      </div>

      {/* HOW IT WORKS */}
      {shot.howItWorks && (
        <section>
          <h3>How It Works</h3>
          <p>{shot.howItWorks}</p>
        </section>
      )}

      {/* BENEFITS */}
      {!!shot.benefits?.length && (
        <section>
          <h3>Benefits</h3>
          <ul>
            {shot.benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </section>
      )}

      {/* INDICATIONS */}
      {!!shot.indications?.length && (
        <section>
          <h3>Indications</h3>
          <ul>
            {shot.indications.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </section>
      )}

      {/* CONTRAINDICATIONS */}
      {!!shot.contraindications?.length && (
        <section className="warning">
          <h3>Contraindications</h3>
          <ul>
            {shot.contraindications.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </section>
      )}

      <div className="addon-list">
        {/* ADD-ON NUTRIENTS */}
        {!!addonNutrients.length && (
          <section className="addons-section">
            <h3>Available Add-ons</h3>
            <div className="addons-grid">
              {addonNutrients.map((nutrient) => (
                <div className="addon-card" key={nutrient._id}>
                  <img
                    src={`http://localhost:5000${nutrient.images?.cover}`}
                    alt={nutrient.name}
                    loading="lazy"
                  />
                  <div className="addon-info">
                    <h4>{nutrient.name}</h4>
                    <p className="addon-price">
                      KES {nutrient.price.toLocaleString()}
                    </p>
                    <ul>
                      {nutrient.benefits?.slice(0, 3).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => handleAddAddon(nutrient)}
                    >
                      Add to Treatment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>



















      {/* FAQs (Accordion) */}
      {!!shot.faqs?.length && (
        <section className="faq-section">
          <h3>FAQs</h3>

          {shot.faqs.map((f, idx) => {
            const isOpen = openFaq === idx;

            return (
              <div key={idx} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <span>{f.question}</span>
                  <span className="icon">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="faq-answer">
                    <p>{f.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )}

      {/* DISCLAIMER */}
      {shot.disclaimer && (
        <section className="disclaimer">
          <p>{shot.disclaimer}</p>
        </section>
      )}
    </div>
  );
}
