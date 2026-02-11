import express from "express";
import {
    stkPushController,
    mpesaCallbackController
} from "../controllers/mpesa.controller.js";

const router = express.Router();

// Initiate STK Push
router.post("/stk-push", stkPushController);

// MPESA callback (from Safaricom)
router.post("/callback", mpesaCallbackController);

export default router;
