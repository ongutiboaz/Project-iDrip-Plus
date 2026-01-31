import mongoose from "mongoose";
import Booking from "../models/Booking.js";

export const bookingSeedData = [
  {
    bookingType: "individual",
    status: "pending",
    paymentStatus: "unpaid",
    locationType: "home",

    bookingDateTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now

    address: {
      country: "Kenya",
      city: "Kilimani",
      apartment: "Green Heights",
      houseNumber: "A12",
    },

    contact: {
      phone: "+254712345678",
      email: "client1@example.com",
    },

    clients: [
      {
        firstName: "Jane",
        secondName: "Doe",
        birthday: new Date("1995-06-12"),

        serviceType: "drip",
        decideAtHome: false,

        selectedDrip: {
          id: new mongoose.Types.ObjectId("695b9f3464cd5828bcba321a"), // Sex Drip
          name: "Sex Drip",
          price: 23000,
        },

        selectedShot: {
          id: new mongoose.Types.ObjectId("695abb9ad24a319ee06a450d"), // B12
          name: "Vitamin B12 Injection",
          price: 1500,
        },

        addons: [
          {
            id: new mongoose.Types.ObjectId("695abb9ad24a319ee06a4508"), // Vit C
            name: "Vitamin C",
            price: 20,
          },
        ],

        notes: "First-time IV therapy",
      },
    ],

    totalAmount: 0, // auto-calculated in pre-save
    createdBy: "seed",
  },

  // =========================
  // GROUP BOOKING
  // =========================
  {
    bookingType: "group",
    status: "pending",
    paymentStatus: "unpaid",
    locationType: "clinic",

    bookingDateTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now

    address: {
      country: "Kenya",
      city: "Westlands",
    },

    contact: {
      phone: "+254798654321",
      email: "groupbooking@example.com",
    },

    clients: [
      {
        firstName: "John",
        secondName: "Mwangi",
        birthday: new Date("1990-02-20"),

        serviceType: "shot",

        selectedShot: {
          id: new mongoose.Types.ObjectId("695abb9ad24a319ee06a4510"), // Glutathione
          name: "Glutathione Injection",
          price: 2000,
        },

        addons: [],
      },
      {
        firstName: "Alice",
        secondName: "Wanjiku",
        birthday: new Date("1992-09-14"),

        serviceType: "shot",

        selectedShot: {
          id: new mongoose.Types.ObjectId("695abb9ad24a319ee06a450e"), // Vit C Shot
          name: "Vitamin C Injection",
          price: 1200,
        },

        addons: [
          {
            id: new mongoose.Types.ObjectId("695abb9ad24a319ee06a450c"), // Zinc
            name: "Zinc",
            price: 200,
          },
        ],
      },
    ],

    totalAmount: 0,
    createdBy: "seed",
  },
];
