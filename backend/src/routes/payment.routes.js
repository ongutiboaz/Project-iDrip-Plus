import express from "express";
import {
  createPayment,
  mpesaCallback,
  getPaymentsByBooking,
  getPaymentById,
  getAllPayments,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/", createPayment);
router.post("/mpesa/callback", mpesaCallback);
router.get("/", getAllPayments);
router.get("/booking/:bookingId", getPaymentsByBooking);
router.get("/:id", getPaymentById);
export default router;
