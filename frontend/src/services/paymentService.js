// src/services/paymentService.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------- M-PESA STK PUSH ----------------
export const stkPush = async ({ bookingNumber, phone, amount }) => {
  try {
    const response = await api.post("/mpesa/stk-push", {
      bookingNumber,
      phone,
      amount,
    });

    console.log("[STK PUSH] response:", response.data);
    return response.data;
  } catch (error) {
    console.error("[STK PUSH] error:", error?.response?.data || error.message);
    throw error?.response?.data || { message: "Failed to initiate STK push" };
  }
};

// ---------------- GET PAYMENT STATUS ----------------
export const getPaymentStatus = async (bookingNumber) => {
  try {
    const response = await api.get(`/payments/status/${bookingNumber}`);
    console.log("[PAYMENT STATUS] response:", response.data);
    return response.data;
  } catch (error) {
    console.error("[PAYMENT STATUS] error:", error?.response?.data || error.message);
    throw error?.response?.data || { message: "Failed to fetch payment status" };
  }
};
