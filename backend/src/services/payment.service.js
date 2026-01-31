import Payment from "../models/Payment.model.js";
import Booking from "../models/booking.model.js";
import { initiateStkPush } from "./mpesa.service.js";
import normalizePhone from "../utils/normalizePhone.js";

export async function processPaymentService({ bookingId, method, amount, phone, payerName }) {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new Error("Booking not found");

  // Create payment record
  const payment = await Payment.create({
    booking: bookingId,
    method,
    amount,
    mpesaPhone: phone ? normalizePhone(phone) : "",
    name: payerName || "",
    status: method === "cash" ? "pending" : "initiated",
  });

  // CASH
  if (method === "cash") {
    booking.paymentStatus = "pay_at_home";
    booking.paymentMethod = "cash";
    await booking.save();
    return { payment, message: "Cash payment selected. Pay at home." };
  }

  // MPESA
  if (method === "mpesa") {
    const stk = await initiateStkPush({
      phone,
      amount,
      accountReference: booking._id.toString(),
      transactionDesc: "EasyAfya Booking Payment",
    });

    payment.checkoutRequestID = stk.CheckoutRequestID;
    await payment.save();

    booking.paymentStatus = "stk_sent";
    booking.paymentMethod = "mpesa";
    await booking.save();

    return { payment, stkResponse: stk, message: "STK push sent" };
  }

  throw new Error("Unsupported payment method");
}

export async function confirmMpesaPaymentService({ checkoutRequestID, mpesaReceipt, amount, phone }) {
  const payment = await Payment.findOne({ checkoutRequestID });
  if (!payment) throw new Error("Payment not found");

  payment.status = "success";
  payment.mpesaReceipt = mpesaReceipt;
  await payment.save();

  const booking = await Booking.findById(payment.booking);
  booking.paymentStatus = "paid";
  booking.paidAmount = amount;
  await booking.save();

  return payment;
}

export async function failPaymentService({ checkoutRequestID, reason }) {
  const payment = await Payment.findOne({ checkoutRequestID });
  if (!payment) return;

  payment.status = "failed";
  await payment.save();

  const booking = await Booking.findById(payment.booking);
  booking.paymentStatus = "unpaid";
  await booking.save();
}
