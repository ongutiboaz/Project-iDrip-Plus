import React, { useState } from "react";
import axios from "axios";

const MpesaTest = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!phone.match(/^2547\d{8}$/)) {
      setMessage("Enter a valid phone number (2547XXXXXXXX)");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setMessage("Enter a valid amount");
      return;
    }

    if (!bookingId) {
      setMessage("Booking ID is required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/mpesa/stk-push",
        {
          phone,
          amount: Number(amount),
          bookingId,
        }
      );

      if (res.data.ResponseCode === "0") {
        setMessage("✅ STK Push sent. Check your phone.");
      } else {
        setMessage(`❌ STK failed: ${res.data.ResponseDescription}`);
      }

      console.log("STK RESPONSE:", res.data);
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Payment request failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "auto", padding: 20 }}>
      <h2>M-Pesa STK Push Test</h2>

      <input
        type="text"
        placeholder="Phone (2547XXXXXXXX)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ width: "100%", marginBottom: 8, padding: 8 }}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: "100%", marginBottom: 8, padding: 8 }}
      />

      <input
        type="text"
        placeholder="Booking ID"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
        style={{ width: "100%", marginBottom: 12, padding: 8 }}
      />

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          width: "100%",
          padding: 10,
          background: "#0a66c2",
          color: "#fff",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Processing..." : "Pay with M-Pesa"}
      </button>

      {message && (
        <p style={{ marginTop: 12, background: "#f4f4f4", padding: 10 }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default MpesaTest;
