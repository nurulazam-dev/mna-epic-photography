import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import {
  checkPhotographerAvailability,
  getBookings,
  getCheckoutSession,
} from "../Controllers/bookingController.js";
import Booking from "../models/BookingSchema.js";

const router = express.Router();

router.get(
  "/check-availability/:photographerId/:date",
  checkPhotographerAvailability
);

router.get("/booked-dates/:photographerId", async (req, res) => {
  try {
    const { photographerId } = req.params;

    const bookings = await Booking.find({
      photographer: photographerId,
    }).select("programDate");

    const bookedDates = bookings.map((booking) => booking.programDate);

    res.status(200).json({ success: true, bookedDates });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching booked dates" });
  }
});

router.get("/my-bookings", authenticate, getBookings);

router.post(
  "/checkout-session/:photographerId",
  authenticate,
  getCheckoutSession
);

export default router;
