import {
  processPaymentService,
  confirmMpesaPaymentService,
  failPaymentService,
  // getPaymentsByBookingService,
  // getPaymentByIdService,
  // getAllPaymentsService,
} from "../services/payment.service.js";

/**
 * POST /api/payments
 * Create payment + initiate MPESA or mark CASH
 */
export const createPayment = async (req, res) => {
  try {
    const {
      bookingId,
      method, // mpesa | cash
      amount,
      phone,
      payerName,
    } = req.body;

    if (!bookingId || !method || !amount) {
      return res.status(400).json({
        success: false,
        message: "bookingId, method and amount are required",
      });
    }

    const result = await processPaymentService({
      bookingId,
      method,
      amount,
      phone,
      payerName,
    });

    res.status(201).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * POST /api/payments/mpesa/callback
 * Safaricom STK callback
 */
export const mpesaCallback = async (req, res) => {
  try {
    const callback = req.body?.Body?.stkCallback;

    // Safaricom retry protection
    if (!callback) {
      return res.json({ ResultCode: 0, ResultDesc: "No callback body" });
    }

    const {
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = callback;

    // ❌ Failed / cancelled / timeout
    if (ResultCode !== 0) {
      await failPaymentService({
        checkoutRequestID: CheckoutRequestID,
        reason: ResultDesc,
      });

      return res.json({
        ResultCode: 0,
        ResultDesc: "Failed payment recorded",
      });
    }

    // ✅ Successful payment
    const items = CallbackMetadata?.Item || [];

    const receipt = items.find(
      (i) => i.Name === "MpesaReceiptNumber"
    )?.Value;

    const amount = items.find(
      (i) => i.Name === "Amount"
    )?.Value;

    const phone = items.find(
      (i) => i.Name === "PhoneNumber"
    )?.Value;

    await confirmMpesaPaymentService({
      checkoutRequestID: CheckoutRequestID,
      mpesaReceipt: receipt,
      amount,
      phone,
    });

    res.json({
      ResultCode: 0,
      ResultDesc: "Payment processed successfully",
    });
  } catch (error) {
    console.error("M-Pesa callback error:", error);

    // 🚨 ALWAYS return ResultCode 0 to Safaricom
    res.json({
      ResultCode: 0,
      ResultDesc: "Callback received",
    });
  }
};

/**
 * GET /api/payments/booking/:bookingId
 */
export const getPaymentsByBooking = async (req, res) => {
  try {
    const payments = await getPaymentsByBookingService(req.params.bookingId);

    res.json({
      success: true,
      payments,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET /api/payments/:id
 */
export const getPaymentById = async (req, res) => {
  try {
    const payment = await getPaymentByIdService(req.params.id);

    res.json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET /api/payments
 * Admin
 */
export const getAllPayments = async (req, res) => {
  try {
    const payments = await getAllPaymentsService(req.query);

    res.json({
      success: true,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
