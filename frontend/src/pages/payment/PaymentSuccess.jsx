// src/pages/payment/PaymentSuccess.jsx
import { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { bookingNumber } = useParams();

  const method = state?.method || "unknown"; // "cash", "mpesa", "card"

  useEffect(() => {
    // Auto-redirect to dashboard or bookings page after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const getMessage = () => {
    switch (method) {
      case "cash":
        return `✅ Your booking ${bookingNumber} is confirmed. Please pay in person during your visit.`;
      case "mpesa":
        return `✅ Your M-Pesa payment for booking ${bookingNumber} was successful. Thank you!`;
      case "card":
        return `✅ Your card payment for booking ${bookingNumber} was successful. Thank you!`;
      default:
        return `✅ Payment completed for booking ${bookingNumber}.`;
    }
  };

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>{getMessage()}</p>
      <p>You will be redirected shortly...</p>
      <button onClick={() => navigate("/")}>
        Go to Dashboard
      </button>
    </div>
  );
};

export default PaymentSuccess;
