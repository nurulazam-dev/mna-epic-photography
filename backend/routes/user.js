import express from "express";
import {
  deleteUser,
  getAllUser,
  getMyBooking,
  getSingleUser,
  getUserProfile,
  updateUser,
} from "../Controllers/userController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/:id", authenticate, restrict(["client", "admin"]), getSingleUser);
router.get("/", authenticate, restrict(["admin"]), getAllUser);
router.put("/:id", authenticate, restrict(["client", "admin"]), updateUser);
router.delete("/:id", authenticate, restrict(["client", "admin"]), deleteUser);
router.get(
  "/profile/me",
  authenticate,
  restrict(["client", "admin"]),
  getUserProfile
);
router.get(
  "/booking/my-bookings",
  authenticate,
  restrict(["client"]),
  getMyBooking
);

export default router;
