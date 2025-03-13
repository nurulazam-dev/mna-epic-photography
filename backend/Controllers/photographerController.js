import Booking from "../models/BookingSchema.js";
import Photographer from "../models/PhotographerSchema.js";

// update_single_Photographer controller
export const updatePhotographer = async (req, res) => {
  const id = req.params.id;
  try {
    const updatePhotographer = await Photographer.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated Photographer",
      data: updatePhotographer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Fail to update Photographer" });
  }
};

// delete_single_Photographer controller
export const deletePhotographer = async (req, res) => {
  const id = req.params.id;
  try {
    await Photographer.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted Photographer",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Fail to delete Photographer" });
  }
};

// get_single_Photographer controller
export const getSinglePhotographer = async (req, res) => {
  const id = req.params.id;
  try {
    const photographer = await Photographer.findById(id)
      .populate("reviews")
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Successfully got a Photographer",
      data: photographer,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Photographer not found" });
  }
};

// get_all_Photographers controller
export const getAllPhotographer = async (req, res) => {
  try {
    const { query } = req.query;
    /*  let photographers;
    if (query) {
      photographers = await Photographer.find({
        isApproved: "approved" || "pending",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { expertise: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      photographers = await Photographer.find({
        isApproved: "approved" || "pending",
      }).select("-password");
    }  */

    // const photographers = await Photographer.find({}).select("-password");

    let filter = { isApproved: { $in: ["approved", "pending"] } };

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { expertise: { $regex: query, $options: "i" } },
      ];
    }

    const photographers = await Photographer.find(filter).select("-password");

    res.status(200).json({
      success: true,
      message: "Successfully got all Photographers",
      data: photographers,
    });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "Photographers not found" });
  }
};

// get_Photographer_Profile controller
export const getPhotographerProfile = async (req, res) => {
  const photographerId = req.userId;

  try {
    const photographer = await Photographer.findById(photographerId);

    if (!photographer) {
      res.status(404).json({
        success: false,
        message: "Photographer not found",
      });
    }

    const { password, ...rest } = photographer._doc;
    const bookings = await Booking.find({ photographer: photographerId });

    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest, bookings },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
