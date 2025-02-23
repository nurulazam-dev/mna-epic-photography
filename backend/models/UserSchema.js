import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6, select: false },
  name: { type: String, required: true, trim: true },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: [true, "Phone number is unique"],
    match: [/^[0-9]{11}$/, "Phone number isn't 11 characters"],
  },
  photo: { type: String },
  role: {
    type: String,
    enum: ["admin", "photographer", "client"],
    default: "client",
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/* UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
}); */

/* UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}; */

export default mongoose.model("User", UserSchema);
