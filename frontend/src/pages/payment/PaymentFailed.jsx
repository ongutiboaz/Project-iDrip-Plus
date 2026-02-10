import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPaymentStatus } from "../../services/paymentService";

const PaymentFailed = () => {
  const { bookingNumber } = useParams();
  const navigate = useNavigate();
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      const res = await getPaymentStatus(bookingNumber);
      if (res.paymentStatus === "locked") {
        setLocked(true);
      }
    };
    checkStatus();
  }, [bookingNumber]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full text-center">

        <div className="text-red-600 text-5xl mb-4">❌</div>

        <h1 className="text-2xl font-semibold mb-2">Payment Failed</h1>

        <p className="text-gray-600 mb-4">
          Booking <span className="font-medium">{bookingNumber}</span>
        </p>

        {locked ? (
          <p className="text-sm text-red-500 mb-4">
            M-Pesa attempts exceeded. Please pay via cash.
          </p>
        ) : (
          <button
            onClick={() => navigate("/payment")}
            className="w-full bg-red-600 text-white py-2 rounded-lg mb-3"
          >
            Retry Payment
          </button>
        )}

        <button
          onClick={() => navigate("/")}
          className="text-sm text-gray-500"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
