// Payment.model.js
import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    name: { type: String, required: true },
    mpesaPhone: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentRequired: { type: Boolean, default: true },
    method: { type: String, enum: ["mpesa"], default: "mpesa" },
    status: {
      type: String,
      enum: ["pending", "initiated", "success", "failed", "cancelled"],
      default: "pending",
    },
    checkoutRequestID: { type: String, unique: true, sparse: true },
    mpesaReceipt: { type: String, unique: true, sparse: true },
  },
  { timestamps: true },
);

// Prevent duplicate success updates
paymentSchema.index(
  { checkoutRequestID: 1, status: 1 },
  { unique: true, partialFilterExpression: { status: "success" } },
);

export default mongoose.model("Payment", paymentSchema);
