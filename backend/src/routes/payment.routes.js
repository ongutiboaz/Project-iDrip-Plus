import express from "express";
import { stkPushController, getPaymentStatusController, markCashPaymentController } from "../controllers/payment.controller.js";

const router = express.Router();
// M-PESA routes

// --------Initiate STK Push-------
router.post("/mpesa/stk-push", stkPushController);

// -------Poll payment status--------
router.get("/status/:bookingNumber", getPaymentStatusController);


// Cash payment route
router.post("/cash", markCashPaymentController);

export default router;
