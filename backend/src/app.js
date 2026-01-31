import express from "express";
import cors from "cors";
import path from "path";

import shotRoutes from "./routes/shot.routes.js";
import nutrientRoutes from "./routes/nutrient.routes.js";
import dripRoutes from "./routes/drip.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
// import paymentRoutes from "./routes/payment.routes.js";
import mpesaRoutes from "./routes/mpesa.routes.js";

import errorHandler from "./middleware/error.middleware.js";

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// app.use("/api/payments", authMiddleware, paymentRoutes);

/* ================= API ROUTES ================= */
app.use("/api/shots", shotRoutes);
app.use("/api/nutrients", nutrientRoutes);
app.use("/api/drips", dripRoutes);

app.use("/api/bookings", bookingRoutes);
// app.use("/api/payments", paymentRoutes);

app.use("/api/mpesa", mpesaRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("iDrip API running 🚀");
});

/* ================= ERROR HANDLER ================= */
app.use(errorHandler);

export default app;
