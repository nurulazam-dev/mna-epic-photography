import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import {
  checkPhotographerAvailability,
  getAllBookings,
  getCheckoutSession,
  photographerBookedDate,
  updateBooking,
} from "../Controllers/bookingController.js";

const router = express.Router();

router.get(
  "/check-availability/:photographerId/:date",
  checkPhotographerAvailability
);

router.get(
  "/booked-dates/:photographerId",
  authenticate,
  photographerBookedDate
);

router.post(
  "/checkout-session/:photographerId",
  authenticate,
  getCheckoutSession
);

router.get("/", authenticate, restrict(["admin"]), getAllBookings);
router.put("/:id", authenticate, restrict(["admin"]), updateBooking);

export default router;
