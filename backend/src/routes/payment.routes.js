// src/routes/payment.routes.js
import express from "express";
import {
  getPaymentStatusController,
  markCashPaymentController,
} from "../controllers/payment.controller.js";

const router = express.Router();

// Get latest payment status by booking number
router.get(
  "/status/:bookingNumber",
  getPaymentStatusController
);

// Mark cash payment (pay on visit)
router.post(
  "/cash",
  markCashPaymentController
);

export default router;
