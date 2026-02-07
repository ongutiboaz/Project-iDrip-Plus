import express from "express";
import { stkPush, mpesaCallback, getPaymentStatus } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/stkpush", stkPush);
router.post("/callback", mpesaCallback); // This is your Ngrok callback URL
router.get("/:id/status", getPaymentStatus);

export default router;
