import { useEffect, useRef, useState } from "react";
import { PAYMENT_STATUS } from "../../constants/paymentStatus";
import { stkPush, getPaymentStatus } from "../../services/paymentService";

const POLL_INTERVAL = 4000; // 4 seconds
const MAX_POLLS = 15;

const MpesaPayment = ({ bookingNumber, amount, phone: initialPhone, mpesaName: initialName, onSuccess, onFailure }) => {
  const [status, setStatus] = useState(PAYMENT_STATUS.IDLE);
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState(initialPhone || "");
  const [mpesaName, setMpesaName] = useState(initialName || "");
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
    if (!phone || !mpesaName) {
      setMessage("Please enter both phone number and M-Pesa name");
      return;
    }

    setStatus(PAYMENT_STATUS.INITIATING);
    setMessage("Initiating STK Push...");

    try {
      await stkPush({
        bookingNumber,
        amount,
        phone: normalizePhone(phone),
        mpesaName,
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
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <p>M-Pesa Payment</p>

      {/* Editable phone input */}
      <label>
        Phone Number
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isLoading}
          placeholder="e.g., 254701234567"
          style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
        />
      </label>

      {/* Editable M-Pesa name */}
      <label>
        M-Pesa Name
        <input
          type="text"
          value={mpesaName}
          onChange={(e) => setMpesaName(e.target.value)}
          disabled={isLoading}
          placeholder="Name registered on M-Pesa"
          style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
        />
      </label>

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
