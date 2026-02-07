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
  proceedToPayment,
}) {
  return (
    <section className="step step-two active">
      <section className="step-title">
        <h2>Client Services & Add-ons</h2>
        <p>Select the services for each person in this booking.</p>
      </section>

      {loading && (
        <section className="loading">
          <p>Loading services…</p>
        </section>
      )}

      <section className="clients-list">
        {clients.map((client, index) => (
          <ClientCard
            key={index}
            client={client}
            index={index}
            drips={drips}
            shots={shots}
            loading={loading}
            updateClient={updateClient}
            removeClient={removeClient}
            showRemove={clients.length > 1}
          />
        ))}
      </section>

      <section className="add-client">
        <button
          type="button"
          className="add-btn"
          onClick={() => adjustGroup(clients.length + 1)}
        >
          + Add Another Person
        </button>
      </section>

      <section className="step-actions">
        <button
          type="button"
          className="back-btn"
          onClick={onBack}
        >
          Back
        </button>

        <button
          type="button"
          className="next-btn"
          onClick={proceedToPayment}
        >
          Proceed to Payment
        </button>
      </section>
    </section>
  );
}
