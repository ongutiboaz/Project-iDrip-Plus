import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import {connectDB} from "./config/db.js";
dotenv.config();

const app = express();

/* ===================== Middleware ===================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===================== Health Check ===================== */
app.get("/", (req, res) => {
  res.json({ status: "Server running 🚀" });
});

/* ===================== MongoDB Connection ===================== */
connectDB();
mongoose.set("debug", true);

/* ===================== Routes ===================== */
// app.use("/api/auth", authRoutes);
// app.use("/api/payments", mpesaRoutes);
// app.use("/api/bookings", bookingRoutes);

/* ===================== Server ===================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
