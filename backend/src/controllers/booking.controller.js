import {
  createBookingService,
  getAllBookingsService,
  getBookingByIdService,
  getBookingByNumberService,
  getBookingsByClientCodeService,
  updateBookingService,
  cancelBookingService,
  deleteBookingService,
  deleteAllBookingsService,
} from "../services/booking.service.js";

/**
 * POST /api/bookings
 * Create booking
 */
export const createBooking = async (req, res) => {
  try {
    const booking = await createBookingService(req.body);

    res.status(201).json({
      success: true,
      bookingId: booking._id,
      bookingNumber: booking.bookingNumber,
      totalAmount: booking.totalAmount,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/bookings
 * Admin/staff list with pagination
 */
export const getAllBookings = async (req, res) => {
  try {
    const { page, limit, ...filters } = req.query;

    const bookings = await getAllBookingsService(filters, {
      page,
      limit,
    });

    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/bookings/:id
 */
export const getBookingById = async (req, res) => {
  try {
    const booking = await getBookingByIdService(req.params.id);
    res.json({ success: true, booking });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/bookings/number/:bookingNumber
 */
export const getBookingByNumber = async (req, res) => {
  try {
    const booking = await getBookingByNumberService(req.params.bookingNumber);
    res.json({ success: true, booking });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/bookings/client/:clientCode
 */
export const getBookingsByClientCode = async (req, res) => {
  try {
    const bookings = await getBookingsByClientCodeService(
      req.params.clientCode,
    );
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * PUT /api/bookings/:id
 */
export const updateBooking = async (req, res) => {
  try {
    const booking = await updateBookingService(req.params.id, req.body);
    res.json({ success: true, booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * PATCH /api/bookings/:id/cancel
 */
export const cancelBooking = async (req, res) => {
  try {
    const booking = await cancelBookingService(req.params.id);
    res.json({ success: true, booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * DELETE /api/bookings/:id
 */
export const deleteBooking = async (req, res) => {
  try {
    await deleteBookingService(req.params.id);
    res.json({ success: true, message: "Booking deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * DELETE /api/bookings
 * ⚠️ DEV / ADMIN ONLY
 */
export const deleteAllBookings = async (req, res) => {
  try {
    if (process.env.NODE_ENV === "production") {
      return res.status(403).json({
        success: false,
        message: "Operation not allowed in production",
      });
    }

    const result = await deleteAllBookingsService();

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} bookings`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

import { updateBookingStatusService } from "../services/booking.service.js";

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await updateBookingStatusService(req.params.id, status);

    res.json({ success: true, booking });
  } catch (err) {
    if (err.message.startsWith("Invalid status")) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (err.message === "Booking not found") {
      return res.status(404).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};
