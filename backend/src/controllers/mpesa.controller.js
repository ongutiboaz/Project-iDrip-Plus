// src/controllers/mpesa.controller.js
import Booking from "../models/Booking.model.js";
import {
  createPaymentAttempt,
  markPaymentSuccess,
  markPaymentFailed,
} from "../services/payment.service.js";
import {
  sendStkPush,
  handleMpesaCallback,
} from "../services/mpesa.service.js";

// ================= STK PUSH =================
export const stkPushController = async (req, res) => {
  try {
    const { bookingNumber, phone, amount } = req.body;

    const booking = await Booking.findOne({ bookingNumber });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const payment = await createPaymentAttempt({
      bookingId: booking._id,
      bookingNumber,
      method: "mpesa",
      amount,
      phone,
    });

    const mpesaResponse = await sendStkPush({
      phone,
      amount,
      accountReference: bookingNumber,
    });

    payment.checkoutRequestId = mpesaResponse.CheckoutRequestID;
    payment.merchantRequestId = mpesaResponse.MerchantRequestID;
    await payment.save();

    res.json({
      message: "STK push sent",
      bookingNumber,
      checkoutRequestId: payment.checkoutRequestId,
    });
  } catch (error) {
    if (error.message === "MPESA_LOCKED") {
      return res.status(423).json({ message: "MPESA locked. Use cash." });
    }
    res.status(500).json({ message: error.message });
  }
};

// ================= CALLBACK =================
export const mpesaCallbackController = async (req, res) => {
  try {
    await handleMpesaCallback(req.body);
    res.sendStatus(200);
  } catch {
    res.sendStatus(200); // Safaricom requires 200 always
  }
};
