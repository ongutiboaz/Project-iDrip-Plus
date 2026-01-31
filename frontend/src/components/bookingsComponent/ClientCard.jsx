import React from "react";
import DripSelector from "./DripSelector";
import ShotSelector from "./ShotSelector";
import "./ClientCard.scss";

export default function ClientCard({
  client,
  index,
  drips,
  shots,
  loading,
  updateClient,
  removeClient,
  showRemove,
}) {
  // ---------------- BASIC UPDATE HANDLER ----------------
  const handleChange = (field, value) => {
    updateClient(index, { [field]: value });
  };

  // ---------------- DECIDE AT HOME ----------------
  const handleDecideAtHomeChange = (checked) => {
    updateClient(index, {
      decideAtHome: checked,
      // Keep previous selections intact, just hide the selectors
      activeService: checked ? null : client.activeService,
    });
  };

  // ---------------- SERVICE TOGGLE (DISPLAY ONLY) ----------------
  const toggleService = (type) => {
    updateClient(index, {
      activeService: client.activeService === type ? null : type,
    });
  };

  // ---------------- CHECK WHICH SERVICE IS DISPLAYED ----------------
  const isActiveService = (type) => client.activeService === type;

  return (
    <div className="client-card">
      {showRemove && (
        <button
          type="button"
          className="remove-btn"
          onClick={() => removeClient(index)}
        >
          Remove
        </button>
      )}

      {/* ---------------- BASIC INFO ---------------- */}
      <div className="basic-info">
        <input
          type="text"
          placeholder="First Name"
          value={client.firstName || ""}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
        <input
          type="text"
          placeholder="Second Name"
          value={client.secondName || ""}
          onChange={(e) => handleChange("secondName", e.target.value)}
        />
        <input
          type="date"
          value={client.birthday || ""}
          onChange={(e) => handleChange("birthday", e.target.value)}
        />
      </div>

      {/* ---------------- RESIDENT STATUS ---------------- */}
      <div className="resident-status">
        <label>Resident Status:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name={`resident-${index}`}
              checked={client.residentStatus === "traveling"}
              onChange={() => handleChange("residentStatus", "traveling")}
            />
            Traveling / Vacationing
          </label>

          <label>
            <input
              type="radio"
              name={`resident-${index}`}
              checked={client.residentStatus === "local"}
              onChange={() => handleChange("residentStatus", "local")}
            />
            Local Resident
          </label>
        </div>
      </div>

      {/* ---------------- DECIDE AT HOME TOGGLE ---------------- */}
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={!!client.decideAtHome}
          onChange={(e) => handleDecideAtHomeChange(e.target.checked)}
        />
        <span className="slider" />
        Decide at Home
      </label>

      {/* ---------------- SERVICE SELECTION ---------------- */}
      {!client.decideAtHome && (
        <div className="service-selection">
          <div className="service-buttons">
            <button
              type="button"
              className={isActiveService("drip") ? "active" : ""}
              onClick={() => toggleService("drip")}
            >
              Drip
            </button>

            <button
              type="button"
              className={isActiveService("shot") ? "active" : ""}
              onClick={() => toggleService("shot")}
            >
              Shot
            </button>
          </div>

          {/* ---------------- DRIP SELECTOR ---------------- */}
          {isActiveService("drip") && (
            <DripSelector
              client={client}
              index={index}
              drips={drips}
              loading={loading}
              updateClient={updateClient}
            />
          )}

          {/* ---------------- SHOT SELECTOR ---------------- */}
          {isActiveService("shot") && (
            <ShotSelector
              client={client}
              index={index}
              shots={shots}
              loading={loading}
              updateClient={updateClient}
            />
          )}
        </div>
      )}

      {/* ---------------- NOTES ---------------- */}
      <div className="comments">
        <label>Comments / Notes:</label>
        <textarea
          placeholder="Add any notes about the client..."
          value={client.notes || ""}
          onChange={(e) => handleChange("notes", e.target.value)}
        />
      </div>
    </div>
  );
}
