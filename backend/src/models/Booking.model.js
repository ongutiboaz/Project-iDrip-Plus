import mongoose from "mongoose";
import { customAlphabet } from "nanoid"; // Define an alphabet without special characters const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 10);
// =======================
// CLIENT SCHEMA
// =======================
const nanoid = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  10,
);
const ClientSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  clientCode: {
    type: String,
    default: () => `CL-${nanoid(6).toUpperCase()}`,
    immutable: true,
  },

  firstName: { type: String, required: true },
  secondName: String,
  residentStatus: {
    type: String,
    default: "Local Resident",
    enum: ["Local Resident", "Traveling / Vacationing"],
  },
  birthday: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const today = new Date();
        let age = today.getFullYear() - value.getFullYear();
        const hasBirthdayPassed =
          today.getMonth() > value.getMonth() ||
          (today.getMonth() === value.getMonth() &&
            today.getDate() >= value.getDate());
        if (!hasBirthdayPassed) age--;
        return age >= 18;
      },
      message: "Client must be 18 years or older.",
    },
  },
  decideAtHome: { type: Boolean, default: false },
 


  serviceType: {
    drip: { type: Boolean, default: false },
    shot: { type: Boolean, default: false },
  },

  // =========================
  // IV DRIPS
  // =========================
  selectedDrips: [
    {
      dripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drip",
        required: true,
      },
      name: { type: String, required: true }, // <-- NEW
      priceAtBooking: { type: Number, required: true },
      addons: {
        nutrients: [
          {
            nutrientId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Nutrient",
              required: true,
            },
            name: { type: String, required: true }, // <-- NEW
            priceAtBooking: { type: Number, required: true },
          },
        ],
        shots: [
          {
            shotId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Shot",
              required: true,
            },
            name: { type: String, required: true }, // <-- NEW
            priceAtBooking: { type: Number, required: true },
          },
        ],
      },
    },
  ],

  // =========================
  // STANDALONE SHOTS
  // =========================
  selectedShots: [
    {
      shotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shot",
        required: true,
      },
      name: { type: String, required: true }, // <-- NEW
      priceAtBooking: { type: Number, required: true },
      addons: [
        {
          nutrientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Nutrient",
            required: true,
          },
          name: { type: String, required: true }, // <-- NEW
          priceAtBooking: { type: Number, required: true },
        },
      ],
    },
  ],

  notes: String,
  total: { type: Number, default: 0, immutable: true },
});

// =======================

// =======================
// EXTRA CHARGE CITIES
// =======================
const EXTRA_CHARGE_CITIES = [
  "Ruiru",
  "Thika",
  "Kiambu",
  "Ngong",
  "Syokimau",
  "Mombasa",
  "Nakuru",
  "Eldoret",
  "Athi River",
  "Machakos",
  "Kitengela",
  "Limuru",
  "Juja",
  "Other",
];

// =======================
// BOOKING SCHEMA
// =======================
function arrayLimit(val) {
  return Array.isArray(val) && val.length > 0;
}

const BookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      unique: true,
      index: true,
      immutable: true,
    },
    bookingType: {
      type: String,
      enum: ["individual", "group"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "partial", "paid"],
      default: "unpaid",
    },
    // Booking.model.js
    locked: {
      type: Boolean,
      default: false,
    },

    paidAmount: {
      type: Number,
      default: 0,
    },

    paymentMethod: {
      type: String,
      enum: ["mpesa", "cash", "card"],
      required: false,
    },

    bookingDateTime: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const now = new Date();
          const tenMinutesLater = new Date(now.getTime() + 10 * 60 * 1000);
          return value >= tenMinutesLater;
        },
        message: "Booking time must be at least 10 minutes in the future.",
      },
    },

    locationType: { type: String, enum: ["clinic", "home"], required: true },

    address: {
      country: {
        type: String,
        default: "Kenya",
        enum: ["Kenya"],
        required: true,
      },
      city: {
        type: String,
        default: "Nairobi",
        enum: [
          "Nairobi",
          "Westlands",
          "Kilimani",
          "Kileleshwa",
          "Lavington",
          "Karen",
          "Langata",
          "Ruiru",
          "Thika",
          "Kiambu",
          "Ngong",
          "Syokimau",
          "Mombasa",
          "Nakuru",
          "Eldoret",
          "Nairobi West",
          "Parklands",
          "Gigiri",
          "South C",
          "Hurlingham",
          "Donholm",
          "Kasarani",
          "Embakasi",
          "Buruburu",
          "Uthiru",
          "Zambezi",
          "Juja",
          "Ruai",
          "Gikambura",
          "Limuru",
          "Thogoto",
          "Kahawa",
          "Kahawa West",
          "Kahawa Sukari",
          "Muthaiga",
          "Spring Valley",
          "Rongai",
          "Kitengela",
          "Athi River",
          "Machakos",
          "Other",
        ],
        required: true,
      },
      apartment: String,
      houseNumber: String,
    },

    contact: {
      phone: {
        type: String,
        required: true,
        default: "+254",
        set: function (value) {
          // Normalize: remove spaces, dashes, parentheses
          return value.replace(/[\s\-()]/g, "");
        },
        validate: {
          validator: function (value) {
            // E.164 format: + followed by 8–15 digits
            return /^\+[1-9]\d{7,14}$/.test(value);
          },
          message:
            "Phone number must be in international format, e.g., +14155552671",
        },
      },
      email: {
        type: String,
        validate: {
          validator: function (value) {
            if (!value) return true;
            return /^\S+@\S+\.\S+$/.test(value);
          },
          message: "Email must be a valid email address",
        },
      },
    },

    clients: {
      type: [ClientSchema],
      required: true,
      validate: [arrayLimit, "At least one client is required."],
    },
    totalAmount: { type: Number, default: 0, immutable: true },

    notes: String,
    createdBy: { type: String, default: "web" },
  },
  { timestamps: true },
);

// =======================
// PRE-SAVE HOOK
// =======================

BookingSchema.pre("save", function () {
  // 1️⃣ booking number
  if (!this.bookingNumber) {
    this.bookingNumber = `ORD-${nanoid(8).toUpperCase()}`;
  }

  // 2️⃣ only recalc if clients changed
  if (!this.isNew && !this.isModified("clients")) return;
  // 3️⃣ calculate total amount

  let total = 0;

  this.clients.forEach((client) => {
    let clientTotal = 0;

    // Drips
    client.selectedDrips?.forEach((d) => {
      clientTotal += d.priceAtBooking || 0;

      d.addons?.nutrients?.forEach((n) => {
        clientTotal += n.priceAtBooking || 0;
      });

      d.addons?.shots?.forEach((s) => {
        clientTotal += s.priceAtBooking || 0;
      });
    });

    // Shots
    client.selectedShots?.forEach((s) => {
      clientTotal += s.priceAtBooking || 0;

      s.addons?.forEach((a) => {
        clientTotal += a.priceAtBooking || 0;
      });
    });

    client.total = clientTotal;
    total += clientTotal;
  });

  // City surcharge
  if (this.address?.city && EXTRA_CHARGE_CITIES.includes(this.address.city)) {
    total += 1000;
  }

  this.totalAmount = total;
});

BookingSchema.virtual("calculatedTotal").get(function () {
  return this.clients?.reduce((acc, client) => acc + (client.total || 0), 0);
});

// =======================
// INDEXES
// =======================
// Core
BookingSchema.index({ bookingNumber: 1 });

BookingSchema.index({ bookingDateTime: 1 });

// Status & payments
BookingSchema.index({ status: 1, bookingDateTime: -1 });
BookingSchema.index({ paymentStatus: 1, bookingDateTime: -1 });

// Client & ops

BookingSchema.index({ "clients.clientCode": 1 });
BookingSchema.index({ createdBy: 1 });
BookingSchema.index({ locationType: 1 });
BookingSchema.index({ "address.city": 1, bookingDateTime: -1 });

// =======================
// EXPORT MODEL
// =======================
export const Client =
  mongoose.models.Client || mongoose.model("Client", ClientSchema);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
