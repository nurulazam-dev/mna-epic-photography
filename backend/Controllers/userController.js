import Booking from "../models/BookingSchema.js";
import Photographer from "../models/PhotographerSchema.js";
import User from "../models/UserSchema.js";

// update_single_User controller
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated user",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fail to update user" });
  }
};

// delete_single_User controller
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted user",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fail to delete user" });
  }
};

// get_single_User controller
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");

    res.status(200).json({
      success: true,
      message: "Successfully got a user",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "User not found" });
  }
};

// get_all_Users controller
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "Successfully got all users",
      data: users,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Users not found" });
  }
};

// get_User_Profile controller
export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// get_My_booking controller
/* export const getMyBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId });
    const photographerIds = bookings.map((el) => el.photographer.id);
    const photographers = await Photographer.find({
      _id: { $in: photographerIds },
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "Booking are getting",
      data: photographers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
}; */

export const getMyBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId })
      .populate("photographer")
      .select("status isPaid programDate createdAt servicePrice");

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
