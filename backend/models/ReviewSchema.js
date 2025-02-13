import mongoose from "mongoose";
import Photographer from "./PhotographerSchema.js";

const ReviewSchema = new mongoose.Schema(
  {
    photographer: {
      type: mongoose.Types.ObjectId,
      ref: "Photographer",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

ReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

ReviewSchema.statics.calcAverageRatings = async function (photographerId) {
  const stats = await this.aggregate([
    {
      $match: { photographer: photographerId },
    },
    {
      $group: {
        _id: "$photographer",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  await Photographer.findByIdAndUpdate(photographerId, {
    totalRating: stats[0].numOfRating,
    averageRating: stats[0].avgRating,
  });
};

ReviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.photographer);
});
export default mongoose.model("Review", ReviewSchema);
