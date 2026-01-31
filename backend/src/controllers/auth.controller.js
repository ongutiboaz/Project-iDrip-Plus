import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res, next) => {
  try {
    const { name, phone, password } = req.body;

    const exists = await User.findOne({ phone });
    if (exists) throw new Error("User already exists");

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      password: hashed,
    });

    res.status(201).json({
      token: generateToken(user._id),
      user,
    });
  } catch (error) {
    next(error);
  }
};
