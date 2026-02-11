// src/controllers/mpesa.controller.js
import Booking from "../models/Booking.model.js";
import {
    createMpesaPaymentAttempt,
    handleMpesaCallback
} from "../services/mpesa.service.js";
import { initiateStkPush } from "../api/mpesa.api.js";


export const stkPushController = async (req, res) => {
    try {
        const { bookingNumber, phone, amount } = req.body;

        const booking = await Booking.findOne({ bookingNumber });
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const payment = await createMpesaPaymentAttempt({
            bookingId: booking._id,
            bookingNumber,
            amount,
            phone,
        });

        const mpesaResponse = await initiateStkPush({
            phone,
            amount,
            accountReference: bookingNumber,
            transactionDesc: "IV Therapy Payment",
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
            return res.status(423).json({
                message: "MPESA attempts exceeded. Please pay via cash.",
            });
        }

        res.status(500).json({ message: error.message });
    }
};


//---------mpesa callback handler (to be called by mpesa api route)---------


export const mpesaCallbackController = async (req, res) => {
    try {
        const result = await handleMpesaCallback(req.body);

        // Always ACK Safaricom
        return res.json({
            ResultCode: 0,
            ResultDesc: result.message,
        });

    } catch (error) {
        console.error("MPESA CALLBACK ERROR:", error);

        // Always ACK to stop retries
        return res.json({
            ResultCode: 0,
            ResultDesc: "Server error",
        });
    }
};
