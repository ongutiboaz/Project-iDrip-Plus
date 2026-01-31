import Drip from "../models/drip.model.js";
import Nutrient from "../models/Nutrient.model.js";
import Shot from "../models/shot.model.js";
import drips from "../data/drips.data.js";

export const seedDrips = async () => {
  try {
    console.log("💧 Seeding drips...");

    for (const drip of drips) {
      // Resolve base nutrients
      const baseNutrients = await Nutrient.find({
        id: { $in: drip.nutrients },
      }).select("_id");

      // Resolve addon nutrients
      const addonNutrients = await Nutrient.find({
        id: { $in: drip.addonNutrients },
      }).select("_id");

      // Resolve addon shots
      const addonShots = await Shot.find({
        id: { $in: drip.addonShots },
      }).select("_id");

      const dripPayload = {
        ...drip,
        nutrients: baseNutrients.map((n) => n._id),
        addonNutrients: addonNutrients.map((n) => n._id),
        addonShots: addonShots.map((s) => s._id),
      };

      // Upsert to avoid duplicates
      await Drip.updateOne(
        { id: drip.id },
        { $set: dripPayload },
        { upsert: true }
      );
    }

    console.log("✅ Drips seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding drips:", error);
    throw error;
  }
};
