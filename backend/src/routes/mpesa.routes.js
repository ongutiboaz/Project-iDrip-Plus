import express from "express";
import {
  stkPushController,
  mpesaCallbackController,
  getPaymentStatusController,
} from "../controllers/mpesa.controller.js";

const router = express.Router();

router.post("/stk-push", stkPushController);
router.post("/callback", mpesaCallbackController);
router.get("/status/:bookingNumber", getPaymentStatusController);


export default router;
