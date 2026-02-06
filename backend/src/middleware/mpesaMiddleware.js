import axios from "axios";

export const mpesaAuth = async (req, res, next) => {
  try {
    const auth = Buffer.from(
      `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString("base64");

    const response = await axios.get(
      `${process.env.MPESA_ENV}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: { Authorization: `Basic ${auth}` }
      }
    );

    console.log("M-Pesa access token fetched successfully");
    req.token = response.data.access_token;
    next();
  } catch (error) {
    console.error("M-Pesa Auth Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to authenticate with M-Pesa" });
  }
};
