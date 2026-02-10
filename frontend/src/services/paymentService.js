// src/services/paymentService.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// ---------------- M-PESA STK PUSH ----------------
export const stkPush = async ({ bookingNumber, phone, amount }) => {
  try {
    const response = await API.post("/payments/mpesa/stk-push", {
      bookingNumber,
      phone,
      amount,
    });
    console.log("STK Push response:", response.data);
    return response.data;
  } catch (error) {
    // More descriptive error handling
    throw error.response?.data || { message: "Failed to initiate STK push" };
  }
};

// ---------------- GET PAYMENT STATUS ----------------
export const getPaymentStatus = async (bookingNumber) => {
  try {
    const response = await API.get(`/payments/status/${bookingNumber}`);
    console.log("Payment status response:", response.data);
    return response.data;
    
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch payment status" };
  }
};
