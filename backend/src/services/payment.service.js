// src/services/payment.service.js
import Payment from "../models/Payment.model.js";
import Booking from "../models/Booking.model.js";

const MAX_MPESA_ATTEMPTS = 2;

export const getNextAttemptNumber = async (bookingId, method) => {
  const last = await Payment.findOne({ booking: bookingId, method })
    .sort({ attemptNumber: -1 });

  return last ? last.attemptNumber + 1 : 1;
};

export const isMpesaLocked = async (bookingId) => {
  const failedAttempts = await Payment.countDocuments({
    booking: bookingId,
    method: "mpesa",
    status: "failed",
  });

  return failedAttempts >= MAX_MPESA_ATTEMPTS;
};

export const createPaymentAttempt = async ({
  bookingId,
  bookingNumber,
  method,
  amount,
  phone,
}) => {
  if (method === "mpesa" && await isMpesaLocked(bookingId)) {
    throw new Error("MPESA_LOCKED");
  }

  const attemptNumber = await getNextAttemptNumber(bookingId, method);

  return Payment.create({
    booking: bookingId,
    bookingNumber,
    method,
    amount,
    phone,
    attemptNumber,
    status: "pending",
  });
};

export const markPaymentSuccess = async (paymentId, extra = {}) => {
  const payment = await Payment.findByIdAndUpdate(
    paymentId,
    {
      status: "success",
      paidAt: new Date(),
      ...extra,
    },
    { new: true }
  );

  await Booking.findByIdAndUpdate(payment.booking, {
    paymentStatus: "paid",
    paidAmount: payment.amount,
    paymentMethod: payment.method,
    locked: true,
  });

  return payment;
};

export const markPaymentFailed = async (paymentId, reason) => {
  return Payment.findByIdAndUpdate(
    paymentId,
    {
      status: "failed",
      mpesaResultDesc: reason,
    },
    { new: true }
  );
};


// ---------------- GET PAYMENT STATUS ----------------
export const getPaymentStatusByBookingNumber = async (bookingNumber) => {
  const payment = await Payment.findOne({ bookingNumber })
    .sort({ createdAt: -1 });

  if (!payment) {
    return {
      paymentStatus: "pending",
      mpesaReceipt: null,
    };
  }

  return {
    paymentStatus: payment.status, // pending | success | failed
    mpesaReceipt: payment.mpesaReceipt || null,
  };
};


//-------------------Cas

/**
 * Create a cash payment and mark booking as "pay_on_visit"
 * @param {string} bookingNumber
 * @returns Payment document
 */
export const createCashPayment = async (bookingNumber) => {
  // Find booking
  const booking = await Booking.findOne({ bookingNumber });
  if (!booking) throw new Error("Booking not found");

  // Create a payment entry
  const payment = await Payment.create({
    booking: booking._id,
    bookingNumber,
    method: "cash",
    amount: booking.amount || 0,
    status: "pending",
    paidAt: null,
    attemptNumber: 1,
  });

  // Update booking
  booking.paymentStatus = "pay_on_visit";
  await booking.save();

  return payment;
};

