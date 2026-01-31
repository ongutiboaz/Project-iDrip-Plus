import React from "react";
import "./DripOrShot.scss";

export default function DripOrShot({ item, type, formatKES }) {
  // Normalize addons depending on type
  const dripNutrients = item.addons?.nutrients || [];
  const dripInjectables = item.addons?.shots || [];
  const shotNutrients = Array.isArray(item.addons) ? item.addons : [];

  // Reusable renderer for addon lists
  const renderAddonList = (addons, cssClass, icon) =>
    addons.length > 0 && (
      <ul className={`addon-list ${cssClass}`}>
        {addons.map((a) => (
          <li key={a._id} className={`addon-item ${cssClass} item-pill`}>
            <span className="addon-label">{icon}</span>
            <span className="addon-name">{a.name}</span>
            <span className="addon-price">KES {formatKES(a.priceAtBooking)}</span>
          </li>
        ))}
      </ul>
    );

  return (
    <li className={type === "drip" ? "drip" : "shot"}>
      {/* Header */}
      <div className="item-card header">
        <div className="item-name">{item.name}</div>
        <div className="item-price">KES {formatKES(item.priceAtBooking)}</div>
      </div>

      {/* Drip-specific addons */}
      {type === "drip" && (
        <>
          {renderAddonList(dripNutrients, "nutrient", "🧪")}
          {renderAddonList(dripInjectables, "injectable", "💉")}
        </>
      )}

      {/* Shot-specific addons */}
      {type === "shot" && renderAddonList(shotNutrients, "nutrient", "🧪")}
    </li>
  );
}
