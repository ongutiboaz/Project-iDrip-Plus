import { useEffect, useRef, useState } from "react";
import { PAYMENT_STATUS } from "../../constants/paymentStatus";
import { stkPush, getPaymentStatus } from "../../services/paymentService";

const POLL_INTERVAL = 4000; // 4 seconds
const MAX_POLLS = 15;

const MpesaPayment = ({ bookingNumber, amount, phone, onSuccess, onFailure }) => {
  const [status, setStatus] = useState(PAYMENT_STATUS.IDLE);
  const [message, setMessage] = useState("");
  const pollCount = useRef(0);
  const intervalRef = useRef(null);

  const normalizePhone = (p) => p.replace(/\D/g, "").replace(/^0/, "254");

  const stopPolling = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    pollCount.current = 0;
  };

  const startPolling = () => {
    intervalRef.current = setInterval(async () => {
      pollCount.current += 1;

      try {
        const res = await getPaymentStatus(bookingNumber);

        if (res.paymentStatus === "success") {
          stopPolling();
          setStatus(PAYMENT_STATUS.SUCCESS);
          setMessage("Payment successful!");
          onSuccess?.();
          return;
        }

        if (res.paymentStatus === "failed" || pollCount.current >= MAX_POLLS) {
          stopPolling();
          setStatus(PAYMENT_STATUS.FAILED);
          setMessage(
            res.paymentStatus === "failed" ? "Payment failed" : "Payment timed out"
          );
          onFailure?.();
          return;
        }
      } catch (err) {
        console.error("Error polling payment status:", err);
      }
    }, POLL_INTERVAL);
  };

  const handlePay = async () => {
    setStatus(PAYMENT_STATUS.INITIATING);
    setMessage("Initiating STK Push...");

    try {
      await stkPush({
        bookingNumber,
        amount,
        phone: normalizePhone(phone),
      });

      setStatus(PAYMENT_STATUS.PENDING);
      setMessage("Check your phone to complete the payment");
      startPolling();
    } catch (err) {
      console.error("STK Push error:", err);
      setStatus(PAYMENT_STATUS.FAILED);
      setMessage(err.message || "Failed to initiate STK Push");
    }
  };

  useEffect(() => {
    return () => stopPolling();
  }, []);

  const isLoading =
    status === PAYMENT_STATUS.INITIATING || status === PAYMENT_STATUS.PENDING;

  return (
    <div>
      <p>M-Pesa Payment</p>

      <button onClick={handlePay} disabled={isLoading}>
        {isLoading ? "Processing..." : `Pay KES ${amount}`}
      </button>

      {message && <p>{message}</p>}

      {isLoading && <p>⏳ Please wait while your payment is processed...</p>}
      {status === PAYMENT_STATUS.SUCCESS && <p>✅ Payment completed</p>}
      {status === PAYMENT_STATUS.FAILED && <p>❌ Payment failed</p>}
    </div>
  );
};

export default MpesaPayment;
