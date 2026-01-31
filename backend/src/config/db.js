import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pope:oyCwoOJTJABUzDZN@idrip-cluster-0.vlxqdpn.mongodb.net/idrip?retryWrites=true&w=majority"
    );
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};
