import mongoose from "mongoose";
import dotenv from "dotenv";
import Booking from "../models/Booking.model.js";
import bookings from "../data/booking.data.js";

dotenv.config();

const seedBookings = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("🧹 Clearing bookings...");
    await Booking.deleteMany();

    console.log("🌱 Seeding bookings...");
    await Booking.insertMany(bookings);

    console.log("✅ Booking seeding completed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Booking seeding failed:", error);
    process.exit(1);
  }
};

seedBookings();
