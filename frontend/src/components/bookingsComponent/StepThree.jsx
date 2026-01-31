import React, { useState } from "react";
import BookingSummary from "./BookingSummary";
// import "./StepThree.scss";

export default function StepThree({ clients, total, onBack, onPay }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Example: Call backend API to initiate payment
      const res = await fetch("http://localhost:5000/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clients, total }),
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect to payment gateway or show success
        onPay();
      } else {
        alert(data.message || "Payment failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="step active step-three">
      <h2>Confirm & Pay</h2>

      <div className="step-three-container">
        <div className="summary-wrapper">
          {/* Reuse BookingSummary for final confirmation */}
          <BookingSummary
            clients={clients}
            bookingDate={clients[0]?.bookingDate} // if per client
            time={clients[0]?.time}
            locationType={clients[0]?.locationType}
            address={clients[0]?.address}
            contact={clients[0]?.contact}
            bookingType={clients[0]?.bookingType}
          />
        </div>

        <div className="actions">
          <button className="back-btn" onClick={onBack} disabled={loading}>
            ← Back
          </button>

          <button
            className="pay-btn"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay KES ${total.toLocaleString("en-KE")}`}
          </button>
        </div>
      </div>
    </div>
  );
}
