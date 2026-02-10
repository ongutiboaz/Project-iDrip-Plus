// src/services/mpesa.service.js
import Payment from "../models/Payment.model.js";
import { initiateStkPush } from "../api/mpesa.api.js";
import {
  markPaymentSuccess,
  markPaymentFailed,
} from "./payment.service.js";

export const sendStkPush = async ({ phone, amount, accountReference }) => {
  return initiateStkPush({
    phone,
    amount,
    accountReference,
    transactionDesc: "IV Therapy Payment",
  });
};

export const handleMpesaCallback = async (payload) => {
  const callback = payload?.Body?.stkCallback;
  if (!callback) return;

  const {
    CheckoutRequestID,
    ResultCode,
    ResultDesc,
    CallbackMetadata,
  } = callback;

  const payment = await Payment.findOne({
    checkoutRequestId: CheckoutRequestID,
  });

  if (!payment) return;

  if (ResultCode === 0) {
    const receipt =
      CallbackMetadata?.Item?.find(
        (i) => i.Name === "MpesaReceiptNumber"
      )?.Value;

    await markPaymentSuccess(payment._id, {
      mpesaReceipt: receipt,
      mpesaResultDesc: ResultDesc,
    });
  } else {
    await markPaymentFailed(payment._id, ResultDesc);
  }
};
