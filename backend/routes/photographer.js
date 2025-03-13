import express from "express";
import {
  deletePhotographer,
  getAllPhotographer,
  getPhotographerProfile,
  getSinglePhotographer,
  updatePhotographer,
} from "../Controllers/photographerController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from "./review.js";

const router = express.Router();

//nested route
router.use("/:photographerId/reviews", reviewRouter);

router.get("/:id", getSinglePhotographer);
router.get("/", getAllPhotographer);
router.put(
  "/:id",
  authenticate,
  restrict(["photographer", "admin"]),
  updatePhotographer
);
router.delete(
  "/:id",
  authenticate,
  restrict(["photographer"]),
  deletePhotographer
);
router.get(
  "/profile/me",
  authenticate,
  restrict(["photographer"]),
  getPhotographerProfile
);

export default router;
