import mongoose from "mongoose";
import dotenv from "dotenv";

import { seedNutrients } from "./nutrient.seeder.js";
import { seedShots } from "./shot.seeder.js";
import { seedDrips } from "./drip.seeder.js";
// import { seedBookings } from "./booking.seeder.js"; 

dotenv.config();

const runSeeders = async () => {
  try {
    // 1️⃣ Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // 2️⃣ Seed data
    await seedNutrients(); // Seed nutrients first
    await seedShots();     // Then seed shots
    await seedDrips();     // Finally seed drips (which reference nutrients & shots)
    // await seedBookings();  // Seed bookings last
    
    console.log("🎯 All seeders completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder error:", error);
    process.exit(1);
  }
};

// Run seeder
runSeeders();
