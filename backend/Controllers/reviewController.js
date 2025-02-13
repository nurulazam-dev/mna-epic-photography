import Photographer from "../models/PhotographerSchema.js";
import Review from "../models/ReviewSchema.js";

// get_all_reviews controller
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});

    res.status(200).json({
      success: true,
      message: "Successfully got all reviews",
      data: reviews,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Reviews not found" });
  }
};

// create_a_review controller
export const createReview = async (req, res) => {
  if (!req.body.photographer) req.body.photographer = req.params.photographerId;
  if (!req.body.user) req.body.user = req.userId;

  const newReview = new Review(req.body);

  try {
    const savedReview = await newReview.save();

    await Photographer.findByIdAndUpdate(req.body.photographer, {
      $push: { reviews: savedReview._id },
    });

    res.status(200).json({
      success: true,
      message: "Review submitted",
      data: savedReview,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
