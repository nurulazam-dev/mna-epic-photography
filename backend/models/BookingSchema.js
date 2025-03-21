import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  programDate: {
    type: Date,
    required: true,
  },
  servicePrice: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0, "Amount cannot be negative"],
  },
  status: {
    type: String,
    enum: ["pending", "approved", "cancelled", "completed"],
    default: "pending",
  },
  isPaid: {
    type: Boolean,
    default: true,
  },
  photographer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Photographer",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

BookingSchema.pre(/^find/, function (next) {
  /* this.populate("user").populate({
    path: "photographer",
    select: "name",
  }); */
  this.populate("user").populate("photographer");
  next();
});

export default mongoose.model("Booking", BookingSchema);
