// src/components/servicesComponent/lists/ShotList.jsx
import { useEffect, useState } from "react";
// import ShotCard from "../cards/ShotCard";
// import "./ShotList.scss";
import ShotCard from "../cards/ShotCard";
import "./ServiceList.scss";


export default function ShotList() {
  const [shots, setShots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchShots();
  }, []);

  const fetchShots = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/shots");
      if (!res.ok) throw new Error("Failed to load shots");

      const data = await res.json();
      setShots(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load shots at the moment.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     RENDER STATES
  ========================= */

  if (loading) {
    return <p className="shots-loading">Loading shots...</p>;
  }

  if (error) {
    return <p className="shots-error">{error}</p>;
  }

  if (!shots.length) {
    return <p className="shots-empty">No shots available.</p>;
  }

  return (
    <div className="service-grid">
      {shots.map((shot) => (
        <ShotCard key={shot._id} shot={shot} />
      ))}
    </div>
  );
}
