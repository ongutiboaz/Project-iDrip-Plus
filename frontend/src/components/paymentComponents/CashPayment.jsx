// src/components/payment/CashPayment.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CashPayment = ({ bookingNumber }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = async () => {
    if (confirmed) return;

    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/payments/cash`,
        { bookingNumber }
      );

      setConfirmed(true);

      // Navigate to success page, sending payment method
      navigate(`/payment-success/${bookingNumber}`, {
        state: { method: "cash" },
      });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to confirm cash payment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>You can pay in person during your visit.</p>

      {error && <p>{error}</p>}

      <button onClick={handleConfirm} disabled={loading || confirmed}>
        {loading ? "Confirming..." : confirmed ? "Confirmed" : "Confirm Cash Payment"}
      </button>
    </div>
  );
};

export default CashPayment;
