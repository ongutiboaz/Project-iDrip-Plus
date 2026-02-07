import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PaymentMethodSelector from "../../components/paymentComponents/PaymentMethodSelector";
import MpesaPayment from "../../components/paymentComponents/mpesaComponents/MpesaPayment";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [method, setMethod] = useState("mpesa");

  // ---------------- Guard + Restore ----------------
  useEffect(() => {
    if (state?.bookingId) {
      setBooking(state);
      sessionStorage.setItem("currentBooking", JSON.stringify(state));
    } else {
      // Try to restore from sessionStorage
      const savedBooking = sessionStorage.getItem("currentBooking");
      if (savedBooking) {
        setBooking(JSON.parse(savedBooking));
      } else {
        navigate("/booking"); // No data → redirect
      }
    }
  }, [state, navigate]);

  if (!booking) return null; // Prevent rendering before booking loaded

  const {
    bookingId,
    bookingNumber,
    amount,
    phone,
    bookingDateTime,
  } = booking;

  return (
    <div className="payment-page">
      <h1>Complete Your Payment</h1>

      {/* ---------------- Booking Summary ---------------- */}
      <section className="payment-summary">
        <h2>Booking Summary</h2>
        <ul>
          <li>
            <strong>Booking Number:</strong> {bookingNumber}
          </li>
          <li>
            <strong>Booking Date:</strong>{" "}
            {bookingDateTime
              ? new Date(bookingDateTime).toLocaleString()
              : "N/A"}
          </li>
          <li>
            <strong>Amount to Pay:</strong> KES {amount.toLocaleString()}
          </li>
          <li>
            <strong>Phone:</strong> {phone}
          </li>
          <li>
            <strong>Payment Method:</strong> {method.toUpperCase()}
          </li>
        </ul>
      </section>

      {/* ---------------- Payment Method Selector ---------------- */}
      <section className="payment-method-selector">
        <h2>Choose Payment Method</h2>
        <PaymentMethodSelector method={method} setMethod={setMethod} />
      </section>

      {/* ---------------- Payment Action ---------------- */}
      <section className="payment-action">
        {method === "mpesa" && (
          <MpesaPayment
            bookingId={bookingId}
            bookingNumber={bookingNumber}
            amount={amount}
            phone={phone}
          />
        )}

        {method === "cash" && (
          <div className="cash-info">
            <p>
              <strong>Cash Payment:</strong> Pay in person at the clinic or at
              your home visit.
            </p>
          </div>
        )}

        {method === "card" && (
          <div className="card-info">
            <p>
              <strong>Card Payment:</strong> Coming soon 💳. You will be able to
              pay using Visa, Mastercard, or mobile banking.
            </p>
          </div>
        )}
      </section>

      {/* ---------------- Optional Notes / Help ---------------- */}
      <section className="payment-notes">
        <p>
          After completing the payment, your booking status will automatically
          update. For assistance, contact us at <strong>+254 XXXXXXXX</strong>.
        </p>
      </section>
    </div>
  );
};

export default PaymentPage;
