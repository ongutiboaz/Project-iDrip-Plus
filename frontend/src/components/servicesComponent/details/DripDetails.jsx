// src/pages/DripDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./DripDetails.scss";

export default function DripDetails() {
  const { id } = useParams();
  const [drip, setDrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const [allNutrients, setAllNutrients] = useState([]);
  const [allShots, setAllShots] = useState([]);

  useEffect(() => {
    fetchDrip();
    fetchNutrients();
    fetchShots();
  }, [id]);

  const fetchDrip = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/drips/${id}`);
      const data = await res.json();
      setDrip(data);
    } catch (err) {
      console.error("FETCH DRIP ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNutrients = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/nutrients");
      const data = await res.json();
      setAllNutrients(data);
    } catch (err) {
      console.error("FETCH NUTRIENTS ERROR:", err);
    }
  };

  const fetchShots = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/shots");
      const data = await res.json();
      setAllShots(data);
    } catch (err) {
      console.error("FETCH SHOTS ERROR:", err);
    }
  };
  const addonNutrients =
    drip?.addonNutrients?.length && allNutrients.length
      ? allNutrients.filter((n) => drip.addonNutrients.includes(n._id))
      : [];

  const addonShots =
    drip?.addonShots?.length && allShots.length
      ? allShots.filter((s) => drip.addonShots.includes(s._id))
      : [];

  if (loading) return <p className="loading">Loading drip...</p>;
  if (!drip) return <p>Drip not found</p>;

  return (
    <div className="drip-detail">
      <Link to="/drips" className="back-link">
        ← Back to Drips
      </Link>

      {/* HEADER */}
      <div className="header">
        <img
          src={`http://localhost:5000${drip.images?.cover}`}
          alt={drip.name}
        />

        <div className="info">
          <h1>{drip.name}</h1>

          <p className="description">{drip.description}</p>

          <div className="meta">
            <span>⏱ {drip.duration}</span>
            <span>💉 {drip.componentType}</span>
            <span className="price">KES {drip.price}</span>
          </div>

          <button className="btn-primary">Book This {drip.category}</button>
        </div>
      </div>

      {/* HOW IT WORKS */}
      {drip.howItWorks && (
        <section>
          <h3>How It Works</h3>
          <p>{drip.howItWorks}</p>
        </section>
      )}

      {/* BENEFITS */}
      {!!drip.benefits?.length && (
        <section>
          <h3>Benefits</h3>
          <ul>
            {drip.benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </section>
      )}

      {/* INDICATIONS */}
      {!!drip.indications?.length && (
        <section>
          <h3>Indications</h3>
          <ul>
            {drip.indications.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </section>
      )}

      {/* CONTRAINDICATIONS */}
      {!!drip.contraindications?.length && (
        <section className="warning">
          <h3>Contraindications</h3>
          <ul>
            {drip.contraindications.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ADD-ON NUTRIENTS */}

      <div className="addon-list">
        {/* ADD-ON NUTRIENTS */}
        {!!addonNutrients.length && (
          <section className="addons-section">
            <h3>Optional Add-on Nutrients</h3>
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
      <div className="addon-list">
        {/* ADD-ON SHOTS */}
        {!!addonShots.length && (
          <section className="addons-section">
            <h3>Optional Add-on Injections</h3>

            <div className="addons-grid">
              {addonShots.map((shot) => (
                <div className="addon-card" key={shot._id}>
                  <img
                    src={`http://localhost:5000${shot.images?.cover}`}
                    alt={shot.name}
                  />

                  <div className="addon-info">
                    <h4>{shot.name}</h4>
                    <p className="addon-price">
                      KES {shot.price?.toLocaleString()}
                    </p>

                    <ul>
                      {shot.benefits?.slice(0, 3).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>

                    <button className="btn btn-outline">Add Injection</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* FAQ */}
      {/* FAQs */}
      {!!drip.faqs?.length && (
        <section className="faq-section">
          <h3>FAQs</h3>

          {drip.faqs.map((f, idx) => {
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
      {drip.disclaimer && (
        <section className="disclaimer">
          <p>{drip.disclaimer}</p>
        </section>
      )}
    </div>
  );
}
