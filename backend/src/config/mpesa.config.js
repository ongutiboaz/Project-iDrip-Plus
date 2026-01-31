import axios from "axios";

const BASE_URL = "https://sandbox.safaricom.co.ke";

export const getAccessToken = async () => {
  const url = `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`;

  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  const response = await axios.get(url, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  return response.data.access_token;
};

export { BASE_URL };

