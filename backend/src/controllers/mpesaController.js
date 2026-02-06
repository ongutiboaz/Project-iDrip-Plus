import axios from "axios";
import { getAccessToken } from "../config/mpesaAuth.js";

export const stkPush = async (req, res) => {
  try {
    const { phone, amount } = req.body;
    const token = await getAccessToken();

    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, 14);

    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    const response = await axios.post(
      `${process.env.MPESA_ENV}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: "iDripOrder",
        TransactionDesc: "STK Push Payment",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("❌ STK Push Error:", error.response?.data || error.message);
    res.status(500).json(error.response?.data || { error: "STK failed" });
  }
};

export const mpesaCallback = (req, res) => {
  console.log("📥 STK CALLBACK:", JSON.stringify(req.body, null, 2));

  res.json({
    ResultCode: 0,
    ResultDesc: "Accepted",
  });
};
