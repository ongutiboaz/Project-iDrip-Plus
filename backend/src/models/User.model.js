import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: String,
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "patient", "nurse"],
      default: "patient",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
