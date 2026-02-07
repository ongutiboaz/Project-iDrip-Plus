import { useState, useEffect } from "react";
import { stkPush } from "../../../services/paymentService";
import axios from "axios";

const MpesaPayment = ({ bookingId, bookingNumber, amount, phone }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending");

  // Poll payment status every 5 seconds
  useEffect(() => {
    let interval;
    if (paymentStatus === "pending" && bookingNumber) {
      interval = setInterval(async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/mpesa/status/${bookingNumber}`
          );
          if (res.data.paymentStatus !== "pending") {
            setPaymentStatus(res.data.paymentStatus);
            setMessage(
              res.data.paymentStatus === "paid"
                ? `Payment successful! Receipt: ${res.data.mpesaReceipt}`
                : "Payment failed. Try again."
            );
            setLoading(false);
            clearInterval(interval);
          }
        } catch (err) {
          console.error("Error fetching payment status:", err);
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [bookingNumber, paymentStatus]);

  const handlePay = async () => {
    if (!phone || !amount || !bookingNumber) {
      setMessage("Phone number, amount, or booking number is missing.");
      return;
    }

    // Normalize phone number to 12-digit Kenya format
    let normalizedPhone = phone.replace(/\D/g, "");
    if (normalizedPhone.startsWith("0")) normalizedPhone = "254" + normalizedPhone.slice(1);
    if (!normalizedPhone.startsWith("254") || normalizedPhone.length !== 12) {
      setMessage("Invalid phone number format. Use +2547XXXXXXXX.");
      return;
    }

    setLoading(true);
    setMessage("Sending STK Push...");

    try {
      const response = await stkPush({
        phone: normalizedPhone,
        amount,
        bookingNumber, // required by backend
      });

      console.log("STK Push request body:", { phone: normalizedPhone, amount, bookingNumber });
      console.log("STK Push response:", response);

      setMessage("STK Push sent. Check your phone to complete payment.");
      setPaymentStatus("pending"); // start polling
    } catch (error) {
      console.error("STK Push failed:", error);
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        "Payment failed. Please try again.";
      setMessage(errMsg);
      setLoading(false);
    }
  };

  return (
    <div className="mpesa-payment">
      <label>
        Mpesa Number
        <input type="tel" value={phone} readOnly className="mpesa-input" />
      </label>

      <button onClick={handlePay} disabled={loading || paymentStatus === "paid"} className="mpesa-pay-button">
        {loading
          ? `Processing KES ${amount}...`
          : paymentStatus === "paid"
          ? "Payment Completed"
          : `Pay KES ${amount} with M-Pesa`}
      </button>

      {message && <p className="payment-message">{message}</p>}
    </div>
  );
};

export default MpesaPayment;
