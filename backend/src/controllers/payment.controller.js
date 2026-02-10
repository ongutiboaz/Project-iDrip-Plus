// src/controllers/payment.controller.js
import Booking from "../models/Booking.model.js";
import {
  createPaymentAttempt,
  getPaymentStatusByBookingNumber,
  createCashPayment
} from "../services/payment.service.js";
import { initiateStkPush } from "../api/mpesa.api.js";

// ================= STK PUSH =================
export const stkPushController = async (req, res) => {
  try {
    const { bookingNumber, phone, amount } = req.body;

    // 🔑 Use bookingNumber (NOT bookingId)
    const booking = await Booking.findOne({ bookingNumber });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const payment = await createPaymentAttempt({
      bookingId: booking._id,
      bookingNumber: booking.bookingNumber,
      method: "mpesa",
      amount,
      phone,
    });

    const mpesaResponse = await initiateStkPush({
      phone,
      amount,
      accountReference: booking.bookingNumber,
      transactionDesc: "IV Therapy Payment",
    });

    payment.checkoutRequestId = mpesaResponse.CheckoutRequestID;
    payment.merchantRequestId = mpesaResponse.MerchantRequestID;
    await payment.save();

    res.json({
      message: "STK push sent",
      bookingNumber: booking.bookingNumber,
      checkoutRequestId: payment.checkoutRequestId,
    });

  } catch (error) {
    if (error.message === "MPESA_LOCKED") {
      return res.status(423).json({
        message: "MPESA attempts exceeded. Please pay via cash.",
      });
    }

    res.status(500).json({ message: error.message });
  }
};

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


//-------------------Cash Payment-------------------

export const markCashPaymentController = async (req, res) => {
  try {
    const { bookingNumber } = req.body;

    const payment = await createCashPayment(bookingNumber);

    res.json({ message: "Cash payment confirmed", payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Failed to confirm cash payment" });
  }
};
