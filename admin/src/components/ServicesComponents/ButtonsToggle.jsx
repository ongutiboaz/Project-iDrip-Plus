import React from "react";
import "./ButtonsToggle.scss";

const SERVICE_TYPES = ["All", "nutrients", "shots", "drips"];

export default function ButtonsToggle({ activeType, onChange }) {
  return (
    <div className="service-tabs">
      {SERVICE_TYPES.map((type) => (
        <button
          key={type}
          className={activeType === type.toLowerCase() ? "active" : ""}
          onClick={() => onChange(type.toLowerCase())} // convert to lowercase for consistency
        >
          {type.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
