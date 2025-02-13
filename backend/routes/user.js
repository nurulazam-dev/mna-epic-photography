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

router.get("/:id", authenticate, restrict(["client"]), getSingleUser);
router.get("/", authenticate, restrict(["admin"]), getAllUser);
router.put("/:id", authenticate, restrict(["client"]), updateUser);
router.delete("/:id", authenticate, restrict(["client"]), deleteUser);
router.get("/profile/me", authenticate, restrict(["client"]), getUserProfile);
router.get(
  "/booking/my-bookings",
  authenticate,
  restrict(["client"]),
  getMyBooking
);

export default router;
