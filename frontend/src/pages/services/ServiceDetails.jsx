import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ServiceDetails.scss";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);

        // Adjust API endpoint to match your backend
        const res = await fetch(`http://localhost:5000/api/drips/${id}`);
        if (!res.ok) throw new Error("Failed to fetch service");

        const data = await res.json();
        setService(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) return <h2 style={{ padding: "2rem" }}>Loading service...</h2>;
  if (error) return <h2 style={{ padding: "2rem" }}>Error: {error}</h2>;
  if (!service) return <h2 style={{ padding: "2rem" }}>Service not found</h2>;

  const coverImage = service.images?.cover
    ? service.images.cover.startsWith("/uploads")
      ? `http://localhost:5000${service.images.cover}`
      : service.images.cover
    : null;

  return (
    <div className="service-details">
      {coverImage && (
        <img src={coverImage} alt={service.name} className="header-img" />
      )}

      <div className="content">
        <h1>{service.name}</h1>

        <h3>What It Does</h3>
        <ul>
          {service.details?.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>

        <h3>Ingredients</h3>
        <ul>
          {service.ingredients?.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>

        <p className="duration">⏱ Duration: {service.duration || "—"}</p>
        <p className="price">
          💰 Price: KES {Number(service.price || 0).toLocaleString()}
        </p>

        <button className="book-btn">Book This Drip</button>
      </div>
    </div>
  );
};

export default ServiceDetails;
