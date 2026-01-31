import React from "react";
import ClientCard from "./ClientCard";

export default function StepTwo({
  clients,
  drips,
  shots,
  loading,
  updateClient,
  removeClient,
  adjustGroup,
  onBack,
  proceedToPayment, // ✅ ONLY responsibility
}) {
  return (
    <div className="step active">
      <h2>Client Services & Addons</h2>

      {loading && <p>Loading services...</p>}

      <div className="clients-list">
        {clients.map((client, idx) => (
          <ClientCard
            key={idx}
            client={client}
            index={idx}
            drips={drips}
            shots={shots}
            loading={loading}
            updateClient={updateClient}
            removeClient={removeClient}
            showRemove={clients.length > 1}
          />
        ))}
      </div>

      <div className="add-client">
        <button
          type="button"
          className="add-btn"
          onClick={() => adjustGroup(clients.length + 1)}
        >
          + Add Person
        </button>
      </div>

      <div className="step-actions">
        <button type="button" className="back-btn" onClick={onBack}>
          Back
        </button>

        <button
          type="button"
          className="next-btn"
          onClick={proceedToPayment} // ✅ WORKS
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
