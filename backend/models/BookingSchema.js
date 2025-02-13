import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    photographer: {
      type: mongoose.Types.ObjectId,
      ref: "Photographer",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    servicePrice: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

BookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "photographer",
    select: "name",
  });

  next();
});

export default mongoose.model("Booking", BookingSchema);
