import { stkPushService } from "../services/mpesa.service.js";

export const stkPushController = async (req, res) => {
  try {
    const { phone, amount } = req.body;

    const result = await stkPushService({ phone, amount });

    res.json(result);
  } catch (error) {
    console.log("MPESA ERROR =====>");
    console.log(error.response?.data || error.message);

    res.status(500).json({
      message: "STK Push failed",
      details: error.response?.data || error.message,
    });
  }
};

export const mpesaCallbackController = async (req, res) => {
  console.log("MPESA CALLBACK:", JSON.stringify(req.body, null, 2));
  res.json({ ResultCode: 0, ResultDesc: "Accepted" });
};
