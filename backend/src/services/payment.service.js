// src/services/payment.service.js
import Payment from "../models/Payment.model.js";
import Booking from "../models/Booking.model.js";

/**
 * Get next attempt number per booking + method
 */
export const getNextAttemptNumber = async (bookingId, method) => {
  const last = await Payment.findOne({ booking: bookingId, method })
    .sort({ attemptNumber: -1 });

  return last ? last.attemptNumber + 1 : 1;
};

/**
 * Create a generic payment attempt (used by mpesa, card later)
 */
export const createPaymentAttempt = async ({
  bookingId,
  bookingNumber,
  method,
  amount,
  phone = null,
}) => {
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

/**
 * Mark payment success and lock booking
 */
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

/**
 * Mark payment failed
 */
export const markPaymentFailed = async (paymentId, reason) => {
  return Payment.findByIdAndUpdate(
    paymentId,
    {
      status: "failed",
      failureReason: reason,
    },
    { new: true }
  );
};

/**
 * Get latest payment status by bookingNumber
 */
export const getPaymentStatusByBookingNumber = async (bookingNumber) => {
  const payment = await Payment.findOne({ bookingNumber })
    .sort({ createdAt: -1 });

  if (!payment) {
    return { paymentStatus: "pending", receipt: null };
  }

  return {
    paymentStatus: payment.status,
    receipt: payment.mpesaReceipt || null,
  };
};

/**
 * CASH payment creation (pay on visit)
 */
export const createCashPayment = async (bookingNumber) => {
  const booking = await Booking.findOne({ bookingNumber });
  if (!booking) throw new Error("Booking not found");

  const payment = await Payment.create({
    booking: booking._id,
    bookingNumber,
    method: "cash",
    amount: booking.amount || 0,
    status: "pending",
    attemptNumber: 1,
  });

  booking.paymentStatus = "pay_on_visit";
  await booking.save();

  return payment;
};
