import mongoose from "mongoose";

const PhotographerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6, select: false },
  name: { type: String, required: true },
  phone: { type: String },
  photo: { type: String },
  servicePrice: { type: Number },
  role: {
    type: String,
    enum: ["admin", "photographer"],
    default: "photographer",
  },
  expertise: { type: String }, // Wedding, Event, Portrait, etc.
  experience: { type: Number, default: 0 },
  // availability: { type: Array }, // Available time slots for bookings
  unavailableDates: [{ type: Date }], // Store booked dates
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: { type: Number, default: 0 },
  totalRating: { type: Number, default: 0 },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
});

export default mongoose.model("Photographer", PhotographerSchema);
