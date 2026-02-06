import React, { useState } from "react";
import axios from "axios";

const MpesaTest = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    // Input validation
    if (!phone.match(/^2547\d{8}$/)) {
      setMessage("Enter a valid phone number (2547XXXXXXXX).");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setMessage("Enter a valid amount.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/mpesa/stkpush", {
        phone,
        amount: Number(amount)
      });

      // STK request accepted
      if (response.data.ResponseCode === "0") {
        setMessage(
          `STK Push initiated! Check your phone. MerchantRequestID: ${response.data.MerchantRequestID}`
        );
      } else {
        setMessage(`STK Push failed: ${response.data.ResponseDescription}`);
      }

      console.log("STK Push Response:", response.data);
    } catch (error) {
      console.error("STK Push Error:", error.response?.data || error.message);
      setMessage(
        `Payment failed: ${error.response?.data?.errorMessage || error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>M-Pesa STK Push Test</h2>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Phone (2547XXXXXXXX)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "Processing..." : "Pay with M-Pesa"}
      </button>

      {message && (
        <p style={{ marginTop: "15px", padding: "10px", backgroundColor: "#f0f0f0" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default MpesaTest;
