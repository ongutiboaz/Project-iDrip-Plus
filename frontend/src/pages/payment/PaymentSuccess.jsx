// src/pages/payment/PaymentSuccess.jsx
import { useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { bookingNumber } = useParams();

  const method = state?.method || "unknown"; // "cash", "mpesa", "card"

  useEffect(() => {
    // Auto-redirect to home or dashboard after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const getMessage = () => {
    switch (method.toLowerCase()) {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full text-center">
        <div className="text-green-600 text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-semibold mb-4">Payment Successful!</h1>
        <p className="text-gray-700 mb-6">{getMessage()}</p>
        <p className="text-gray-500 mb-4">You will be redirected shortly...</p>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
