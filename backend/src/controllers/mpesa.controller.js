import Booking from "../models/Booking.model.js";
import { initiateStkPush } from "../services/mpesa.service.js";

// ================= STK PUSH =================
export const stkPushController = async (req, res) => {
  try {
    const { phone, amount, bookingNumber } = req.body;

    if (!phone || !amount || !bookingNumber) {
      return res.status(400).json({
        message: "phone, amount, bookingNumber required",
      });
    }

    // ✅ FIND BOOKING BY bookingNumber
    const booking = await Booking.findOne({ bookingNumber });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const stkResponse = await initiateStkPush({
      phone,
      amount,
      accountReference: bookingNumber,
      transactionDesc: "iDrip Payment",
    });

    // ✅ UPDATE BOOKING USING bookingNumber
    booking.checkoutRequestId = stkResponse.CheckoutRequestID;
    booking.paymentMethod = "mpesa";
    booking.paymentStatus = "pending";
    await booking.save();

    res.json(stkResponse);
  } catch (error) {
    console.error("❌ STK Push Error:", error.response?.data || error.message);
    res.status(500).json({ message: "STK Push failed" });
  }
};

// ================= CALLBACK =================
export const mpesaCallbackController = async (req, res) => {
  try {
    console.log("📥 STK CALLBACK:", JSON.stringify(req.body, null, 2));

    const callback = req.body?.Body?.stkCallback;
    if (!callback) {
      return res.json({ ResultCode: 0, ResultDesc: "No callback body" });
    }

    const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } =
      callback;

    // ✅ FIND BOOKING BY checkoutRequestId
    const booking = await Booking.findOne({
      checkoutRequestId: CheckoutRequestID,
    });

    if (!booking) {
      return res.json({ ResultCode: 0, ResultDesc: "Booking not found" });
    }

    if (ResultCode === 0) {
      const metadata = CallbackMetadata.Item.reduce((acc, item) => {
        acc[item.Name] = item.Value;
        return acc;
      }, {});

      booking.paymentStatus = "paid";
      booking.status = "confirmed";
      booking.paidAmount = metadata.Amount;
      booking.mpesaReceipt = metadata.MpesaReceiptNumber;
      booking.locked = true;

      console.log("✅ Payment successful:", metadata.MpesaReceiptNumber);
    } else {
      booking.paymentStatus = "unpaid";
      booking.status = "pending";
      console.log("❌ Payment failed:", ResultDesc);
    }

    await booking.save();

    res.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (error) {
    console.error("❌ Callback error:", error);
    res.status(500).json({ ResultCode: 1, ResultDesc: "Error" });
  }
};

// ================= PAYMENT STATUS =================
export const getPaymentStatusController = async (req, res) => {
  try {
    const { bookingNumber } = req.params;

    const booking = await Booking.findOne({ bookingNumber }).select(
      "paymentStatus paidAmount mpesaReceipt status"
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
