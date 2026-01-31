import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Services.scss";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDrips = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/drips");
        if (!res.ok) throw new Error("Failed to fetch services");

        const data = await res.json();

        // Only show active drips
        const activeDrips = data.filter((d) => d.status === "active");
        setServices(activeDrips);
      } catch (err) {
        console.error(err);
        setError("Unable to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchDrips();
  }, []);

  if (loading) {
    return (
      <div className="services-page">
        <p className="loading">Loading IV therapies…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="services-page">
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="services-page">
      {/* HERO */}
      <section className="services-hero">
        <div className="hero-content">
          <h1>IV Therapy Services</h1>
          <p>
            Clinician-led IV drip therapy delivered safely to your home or office.
          </p>
          <Link to="/book" className="hero-btn">
            Book a Session
          </Link>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="services-list">
        <h2>Our IV Drip Packages</h2>
        <p className="subtitle">
          Personalized wellness drips tailored to your needs
        </p>

        <div className="service-grid">
          {services.map((item) => (
            <div className="service-card" key={item._id}>
              <img
                src={
                  item.images?.cover
                    ? `http://localhost:5000${item.images.cover}`
                    : "/images/placeholder.jpg"
                }
                alt={item.name}
              />

              <div className="content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>

                <div className="meta">
                  <span>{item.duration}</span>
                  <span className="price">KES {item.price}</span>
                </div>

                <Link
                  to={`/services/${item.id}`}
                  className="service-btn"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
