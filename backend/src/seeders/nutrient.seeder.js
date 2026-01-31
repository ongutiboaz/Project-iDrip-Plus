import Nutrient from "../models/Nutrient.model.js";
import nutrients from "../data/nutrients.data.js";

export const seedNutrients = async () => {
  try {
    console.log("🌱 Seeding nutrients...");

    for (const nutrient of nutrients) {
      await Nutrient.updateOne(
        { id: nutrient.id },     // match by custom id
        { $set: nutrient },      // update if exists
        { upsert: true }         // insert if not
      );
    }

    console.log("✅ Nutrients seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding nutrients:", error);
    throw error;
  }
};
