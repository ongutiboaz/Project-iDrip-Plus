import express from "express";
import { stkPushController, mpesaCallbackController } from "../controllers/mpesa.controller.js";

const router = express.Router();

router.post("/stkpush", stkPushController);
router.post("/callback", mpesaCallbackController);

export default router;
