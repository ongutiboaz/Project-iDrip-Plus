import Booking from "../models/Booking.model.js";

/**
 * Create booking
 */
export const createBookingService = async (data) => {
  const booking = new Booking(data);
  await booking.save(); // pre-save hooks handle totals + bookingNumber
  return booking;
};

/**
 * Get all bookings (admin / staff) with pagination
 */
export const getAllBookingsService = async (
  filters = {},
  { page = 1, limit = 20 } = {},
) => {
  return Booking.find(filters)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
};

/**
 * Get booking by Mongo ID
 */
export const getBookingByIdService = async (id) => {
  const booking = await Booking.findById(id);
  if (!booking) throw new Error("Booking not found");
  return booking;
};

/**
 * Get booking by public booking number
 */
export const getBookingByNumberService = async (bookingNumber) => {
  const booking = await Booking.findOne({ bookingNumber });
  if (!booking) throw new Error("Booking not found");
  return booking;
};

/**
 * Get bookings by client code
 */
export const getBookingsByClientCodeService = async (clientCode) => {
  return Booking.find({ "clients.clientCode": clientCode }).sort({
    createdAt: -1,
  });
};

/**
 * Update booking (safe fields only)
 * Totals auto-recalculate via pre-save hook
 */

/**
 * Cancel booking
 */
export const cancelBookingService = async (id) => {
  const booking = await Booking.findById(id);
  if (!booking) throw new Error("Booking not found");

  booking.status = "cancelled";
  await booking.save();

  return booking;
};

/**
 * Delete single booking (admin only)
 */
export const deleteBookingService = async (id) => {
  const booking = await Booking.findByIdAndDelete(id);
  if (!booking) throw new Error("Booking not found");
  return booking;
};

/**
 * Delete all bookings (⚠️ dev / admin only)
 */
export const deleteAllBookingsService = async () => {
  return Booking.deleteMany({});
};

/**
 * Update booking (safe fields only)
 * Totals auto-recalculate via pre-save hook
 */
export const updateBookingService = async (id, data) => {
  const booking = await Booking.findById(id);
  if (!booking) throw new Error("Booking not found");

  // 🔒 protect immutable / system fields
  delete data.bookingNumber;
  delete data.totalAmount;
  delete data.createdAt;
  delete data.updatedAt;

  // ✅ lock enforcement logic
  if (booking.locked) {
    throw new Error("Booking is locked after payment");
  }

  Object.assign(booking, data);

  // ✅ reconciliation logic
  if (booking.paidAmount >= booking.totalAmount) {
    booking.paymentStatus = "paid";
    booking.locked = true;
  }

  await booking.save();
  return booking;
};

const allowedStatuses = ["pending", "confirmed", "completed", "cancelled"];

export const updateBookingStatusService = async (id, status) => {
  if (!allowedStatuses.includes(status)) {
    throw new Error(`Invalid status. Allowed: ${allowedStatuses.join(", ")}`);
  }

  const booking = await Booking.findById(id);
  if (!booking) {
    throw new Error("Booking not found");
  }

  booking.status = status;
  await booking.save();

  return booking;
};

