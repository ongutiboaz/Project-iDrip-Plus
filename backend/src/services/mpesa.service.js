// src/services/mpesa.service.js
import Payment from "../models/Payment.model.js";
import {
    createPaymentAttempt,
    markPaymentSuccess,
    markPaymentFailed,
} from "./payment.service.js";


const MAX_MPESA_ATTEMPTS = 2;

export const isMpesaLocked = async (bookingId) => {
    const failedAttempts = await Payment.countDocuments({
        booking: bookingId,
        method: "mpesa",
        status: "failed",
    });

    return failedAttempts >= MAX_MPESA_ATTEMPTS;
};

export const createMpesaPaymentAttempt = async (payload) => {
    if (await isMpesaLocked(payload.bookingId)) {
        throw new Error("MPESA_LOCKED");
    }

    return createPaymentAttempt({
        ...payload,
        method: "mpesa",
    });
};



//------mpesa callback handler (to be called by mpesa api route)------


export const handleMpesaCallback = async (payload) => {
    const callback = payload?.Body?.stkCallback;

    // Ignore malformed payloads
    if (!callback) {
        return { ack: true, message: "Ignored" };
    }

    const {
        CheckoutRequestID,
        ResultCode,
        ResultDesc,
        CallbackMetadata,
    } = callback;

    // Find payment attempt
    const payment = await Payment.findOne({
        checkoutRequestId: CheckoutRequestID,
    });

    if (!payment) {
        return { ack: true, message: "Payment not found" };
    }

    // Idempotency guard
    if (payment.status === "success") {
        return { ack: true, message: "Already processed" };
    }

    // ❌ FAILED PAYMENT
    if (ResultCode !== 0) {
        await markPaymentFailed(
            payment._id,
            ResultDesc,
            ResultCode
        );

        return { ack: true, message: "Failure processed" };
    }

    // ✅ SUCCESS PAYMENT
    const metadata = {};
    CallbackMetadata?.Item?.forEach((item) => {
        metadata[item.Name] = item.Value;
    });

    await markPaymentSuccess(payment._id, {
        mpesaReceiptNumber: metadata.MpesaReceiptNumber,
        phone: metadata.PhoneNumber,
    });

    return { ack: true, message: "Success processed" };
};
