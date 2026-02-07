import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// ✅ Include bookingNumber and fix endpoint
export const stkPush = async ({ phone, amount, bookingNumber }) => {
  const res = await API.post("/mpesa/stk-push", {
    phone,
    amount,
    bookingNumber,
  });
  return res.data;
};
