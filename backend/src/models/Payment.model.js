import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      index: true,
    },

    bookingNumber: {
      type: String,
      required: true,
      index: true,
    },

    method: {
      type: String,
      enum: ["mpesa", "card", "cash"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
     attemptNumber: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "success", "failed", "cancelled"],
      default: "pending",
    },

    // ===== MPESA ONLY =====
    phone: String,
    checkoutRequestId: String,
    merchantRequestId: String,
    mpesaReceiptNumber: String,
    mpesaResultCode: Number,
    mpesaResultDesc: String,

    // ===== CARD ONLY =====
    cardProvider: String,         // Stripe, Flutterwave
    cardTransactionId: String,
    cardLast4: String,
    cardBrand: String,

    // ===== CASH ONLY =====
    cashReceivedBy: String,
    cashReceiptNumber: String,

    paidAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
