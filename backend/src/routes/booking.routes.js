import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  updateBookingStatus,
  
  deleteBooking,
  deleteAllBookings,   // ✅ use this instead
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.put("/:id", updateBooking);
router.patch("/:id/status", updateBookingStatus);
router.delete("/:id", deleteBooking);
router.delete("/", deleteAllBookings);  // ✅ bulk delete route

export default router;
