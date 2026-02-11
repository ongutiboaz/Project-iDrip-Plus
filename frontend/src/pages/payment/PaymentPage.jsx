import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PaymentMethodSelector from "../../components/paymentComponents/PaymentMethodSelector";
import MpesaPayment from "../../components/paymentComponents/MpesaPayment";
import CardPayment from "../../components/paymentComponents/CardPayment";
import CashPayment from "../../components/paymentComponents/CashPayment";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [method, setMethod] = useState(state?.method || "mpesa");

  useEffect(() => {
    if (state?.booking) {
      setBooking(state.booking);
      sessionStorage.setItem("currentBooking", JSON.stringify(state.booking));
    } else {
      const saved = sessionStorage.getItem("currentBooking");
      if (saved) setBooking(JSON.parse(saved));
      else navigate("/booking"); // fallback
    }
  }, [state, navigate]);

  if (!booking) return null;

  const commonProps = {
    bookingId: booking.bookingId,
    bookingNumber: booking.bookingNumber,
    amount: booking.amount,
    phone: booking.phone,
    onSuccess: () =>
      navigate(`/payment-success/${booking.bookingNumber}`, { state: { method } }),
    onFailure: () =>
      navigate(`/payment-failed/${booking.bookingNumber}`, { state: { method } }),
  };

  return (
    <div
      className="payment-page"
      style={{ maxWidth: "600px", margin: "2rem auto", padding: "0 1rem" }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Complete Payment
      </h1>

      {/* Booking Summary */}
      <div
        className="booking-summary-card"
        style={{
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "1.5rem",
          marginBottom: "2rem",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "#111827" }}>
          Booking Summary
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem 1.5rem",
          }}
        >
          <div>
            <p style={{ margin: "0.25rem 0", fontWeight: 600 }}>Booking Number</p>
            <p style={{ margin: 0 }}>{booking.bookingNumber}</p>
          </div>
          <div>
            <p style={{ margin: "0.25rem 0", fontWeight: 600 }}>Patient Name</p>
            <p style={{ margin: 0 }}>{booking.patientName || booking.name}</p>
          </div>
          <div>
            <p style={{ margin: "0.25rem 0", fontWeight: 600 }}>Service</p>
            <p style={{ margin: 0 }}>{booking.serviceName || booking.service}</p>
          </div>
          <div>
            <p style={{ margin: "0.25rem 0", fontWeight: 600 }}>Amount</p>
            <p style={{ margin: 0 }}>KES {booking.amount}</p>
          </div>
          <div>
            <p style={{ margin: "0.25rem 0", fontWeight: 600 }}>Phone</p>
            <p style={{ margin: 0 }}>{booking.phone}</p>
          </div>
          <div>
            <p style={{ margin: "0.25rem 0", fontWeight: 600 }}>Date</p>
            <p style={{ margin: 0 }}>
              {booking.date || new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <PaymentMethodSelector method={method} setMethod={setMethod} />

      <div style={{ marginTop: "1.5rem" }}>
        {method === "mpesa" && <MpesaPayment {...commonProps} />}
        {method === "card" && <CardPayment {...commonProps} />}
        {method === "cash" && <CashPayment {...commonProps} />}
      </div>
    </div>
  );
};

export default PaymentPage;
