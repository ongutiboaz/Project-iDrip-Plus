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

/* =========================
   SHOT SCHEMA
========================= */
const shotSchema = new mongoose.Schema(
  {
    /* =========================
       BASIC INFO
    ========================= */

    id: {
      type: String,
      required: true,
      unique: true, // eg: shot-b12
      index: true,
    },

    name: {
      type: String,
      required: true,
      unique: true,
    },

    category: {
      type: String,
      default: "shot",
      enum: ["shot"],
    },

    /* =========================
       CLASSIFICATION
    ========================= */

    componentType: {
      type: String,
      enum: ["vitamin", "mineral", "antioxidant", "amino-acid", "other"],
      required: true,
    },

    // allows ["vitamin", "addon"]
    // type: {
      // type: [String],
      // default: [],
    // },

    /* =========================
       DESCRIPTION
    ========================= */

    description: {
      type: String,
      required: true,
    },

    howItWorks: {
      type: String,
      required: true,
    },

    /* =========================
       MEDICAL
    ========================= */

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
       LINKED NUTRIENTS
       (STRING IDs FOR SEEDING)
    ========================= */

    nutrients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nutrient",
      },
    ],
  
  
  

    /* =========================
       LOGISTICS
    ========================= */

    duration: {
      type: String,
      default: "5 mins",
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
      cover: { type: String },
      nutrients: {
        type: [String],
        default: [],
      },
    },

    /* =========================
       FAQs & LEGAL
    ========================= */

    faqs: {
      type: [faqSchema],
      default: [],
    },

    disclaimer: {
      type: String,
      default:
        "This injection is administered after clinical assessment by a licensed healthcare professional.",
    },
  },
  {
    timestamps: true,
  }
);

/* =========================
   MODEL EXPORT (SAFE)
========================= */
const Shot = mongoose.models.Shot || mongoose.model("Shot", shotSchema);
export default Shot;
