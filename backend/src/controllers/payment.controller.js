// src/controllers/payment.controller.js
import {
  createCashPayment,
  getPaymentStatusByBookingNumber,
} from "../services/payment.service.js";

// ================= PAYMENT STATUS =================
export const getPaymentStatusController = async (req, res) => {
  try {
    const { bookingNumber } = req.params;
    const status = await getPaymentStatusByBookingNumber(bookingNumber);
    res.json(status);
  } catch {
    res.status(500).json({ message: "Failed to fetch payment status" });
  }
};

// ================= CASH PAYMENT =================
export const markCashPaymentController = async (req, res) => {
  try {
    const { bookingNumber } = req.body;
    const payment = await createCashPayment(bookingNumber);

    res.json({
      message: "Cash payment recorded (pay on visit)",
      payment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
