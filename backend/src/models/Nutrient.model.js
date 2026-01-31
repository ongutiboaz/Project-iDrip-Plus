import mongoose from "mongoose";

const nutrientSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    componentType: {
      type: String,
      enum: ["vitamin", "mineral", "antioxidant", "amino-acid", "other"],
      required: true,
    },
    category: {
      type: String,
      enum: ["nutrient"],
      default: "nutrient",
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    duration: {
      type: String,
      default: "—",
    },
    benefits: {
      type: [String],
      default: [],
    },

    images: {
      cover: { type: String, default: "" }, // <-- new field for image URL
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Nutrient =
  mongoose.models.Nutrient || mongoose.model("Nutrient", nutrientSchema);

export default Nutrient;
