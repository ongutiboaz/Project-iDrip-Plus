import Shot from "../models/Shot.model.js";
import Nutrient from "../models/Nutrient.model.js";
import shots from "../data/shots.data.js";

export const seedShots = async () => {
  try {
    console.log("💉 Seeding shots...");

    for (const shot of shots) {
      // Resolve nutrient ObjectIds from custom nutrient IDs
      let nutrientIds = [];

      if (shot.nutrients?.length) {
        const nutrients = await Nutrient.find({
          id: { $in: shot.nutrients },
        }).select("_id");

        nutrientIds = nutrients.map((n) => n._id);
      }

      // Prepare full payload for insertion
      const shotPayload = {
        ...shot,
        nutrients: nutrientIds,
      };

      // Upsert: insert if not exists, update if exists
      await Shot.updateOne(
        { id: shot.id },        // match by custom ID
        { $set: shotPayload },  // update or insert
        { upsert: true }
      );
    }

    console.log("✅ Shots seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding shots:", error);
    throw error;
  }
};
