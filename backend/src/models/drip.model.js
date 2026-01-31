import mongoose from "mongoose";

/* =========================
   FAQ SUB-SCHEMA
========================= */
const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const dripSchema = new mongoose.Schema(
  {
    /* =========================
       CORE INFO
    ========================= */

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

    category: {
      type: String,
      enum: ["drip"],
      default: "drip",
    },

    componentType: {
      type: String,
      enum: ["vitamin", "mineral", "antioxidant", "amino-acid", "other"],
      required: true,
    },


    description: {
      type: String,
      required: true,
    },

    /* =========================
       MEDICAL
    ========================= */

    howItWorks: {
      type: String,
      required: true,
    },

    indications: {
      type: [String],
      default: [],
    },

    contraindications: {
      type: [String],
      default: [],
    },

    benefits: {
      type: [String],
      default: [],
    },

    /* =========================
       BASE NUTRIENTS
       (Stored as IDs, resolved in seeder)
    ========================= */

    nutrients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nutrient",
      },
    ],

    /* =========================
       ADDONS
    ========================= */

    addonNutrients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nutrient",
      },
    ],

    addonShots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shot",
      },
    ],

    /* =========================
       LOGISTICS
    ========================= */

    duration: {
      type: String,
      default: "30 mins",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    /* =========================
       MEDIA
    ========================= */

    images: {
      cover: String,
      nutrients: {
        type: [String],
        default: [],
      },
    },
    faqs: {
      type: [faqSchema],
      default: [],
    },

    /* =========================
       LEGAL / SEO
    ========================= */

    disclaimer: {
      type: String,
      default:
        "All IV therapies are administered following medical consultation by a licensed healthcare professional.",
    },

    seo: {
      title: String,
      description: String,
    },
  },
  { timestamps: true }
);

/* =========================
   SAFE EXPORT
========================= */
const Drip = mongoose.models.Drip || mongoose.model("Drip", dripSchema);

export default Drip;
