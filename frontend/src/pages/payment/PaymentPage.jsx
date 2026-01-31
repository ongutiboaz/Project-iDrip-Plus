import React, { useState } from "react";
import axios from "axios";

export default function Payment() {
  const [bookingId, setBookingId] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const payMpesa = async () => {
    try {
      setLoading(true);

      console.log("➡️ Sending MPESA request:", {
        bookingId,
        amount,
        phone,
      });

      const res = await axios.post("/api/payments", {
        bookingId,
        method: "mpesa",
        amount: Number(amount),
        phone: normalizePhone(phone),
        payerName: "Test User",
      });

      console.log("✅ MPESA RESPONSE:", res.data);
      console.log(
        "📲 CheckoutRequestID:",
        res.data.payment.checkoutRequestID
      );
    } catch (err) {
      console.error(
        "❌ MPESA ERROR:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>MPESA Test</h3>

      <input
        placeholder="Booking ID"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Phone (07...)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <button onClick={payMpesa} disabled={loading}>
        {loading ? "Sending..." : "Send MPESA"}
      </button>
    </div>
  );
}

/* ======================
   PHONE NORMALIZER
====================== */
const normalizePhone = (phone) => {
  if (!phone) return "";
  if (phone.startsWith("+254")) return phone.slice(1);
  if (phone.startsWith("0")) return `254${phone.slice(1)}`;
  return phone;
};
