import express from "express";
import cors from "cors";
import path from "path";
//note to self remember to add auth middleware per route

import shotRoutes from "./routes/shot.routes.js";
import nutrientRoutes from "./routes/nutrient.routes.js";
import dripRoutes from "./routes/drip.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import mpesaRoutes from "./routes/mpesa.routes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/shots", shotRoutes);
app.use("/api/nutrients", nutrientRoutes);
app.use("/api/drips", dripRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/mpesa", mpesaRoutes);






app.get("/", (req, res) => {
  res.send("iDrip API running 🚀");
});

app.use(errorHandler);

export default app;
