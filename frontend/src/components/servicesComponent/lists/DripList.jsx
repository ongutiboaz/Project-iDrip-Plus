// src/components/servicesComponent/lists/DripList.jsx
import { useEffect, useState } from "react";
// import DripCard from "../cards/DripCard";
import "./ServiceList.scss";
import DripCard from "../cards/DripCard";

export default function DripList() {
  const [drips, setDrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/drips")
      .then((res) => res.json())
      .then((data) => {
        setDrips(data.filter((d) => d.status === "active"));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading drips...</p>;

  return (
    <div className="service-grid">
      {drips.map((drip) => (
        <DripCard key={drip._id} drip={drip} />
      ))}
    </div>
  );
}
