import dotenv from "dotenv";
import dns from "dns";
import connectDB from "./config/db.js";
import app from "./app.js";

dns.setDefaultResultOrder("ipv4first");
dotenv.config();

console.log("MONGO_URI =", process.env.MONGO_URI); // Debug line

// Connect MongoDB
connectDB();

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});
