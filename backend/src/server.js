import dotenv from "dotenv";
import app from "./app.js";
import { startNgrok } from "./ngrok.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// 1. Connect database first
await connectDB();

// 2. Start server
app.listen(PORT, async () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);

  // 3. Start ngrok for STK callback
  const publicUrl = await startNgrok(PORT);

  if (publicUrl) {
    process.env.MPESA_CALLBACK_URL = `${publicUrl}/api/mpesa/callback`;
    console.log("📞 STK Callback URL:", process.env.MPESA_CALLBACK_URL);
  }
});
