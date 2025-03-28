import Stripe from "stripe";
import Booking from "../models/BookingSchema.js";
import Photographer from "../models/PhotographerSchema.js";
import User from "../models/UserSchema.js";

export const checkPhotographerAvailability = async (req, res) => {
  try {
    const { photographerId, date } = req.params;
    const selectedDate = new Date(date);

    const existingBooking = await Booking.findOne({
      photographer: photographerId,
      programDate: selectedDate,
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "Photographer is already booked on this date.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Photographer is available on this date.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error checking availability",
    });
  }
};

export const photographerBookedDate = async (req, res) => {
  try {
    const { photographerId } = req.params;

    const bookings = await Booking.find({
      photographer: photographerId,
    }).select("programDate");

    const bookedDates = bookings.map((booking) => booking.programDate);

    res.status(200).json({ success: true, bookedDates });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching booked dates" });
  }
};

/* ====================================
  Handle Booking Checkout and Payment
======================================*/
export const getCheckoutSession = async (req, res) => {
  try {
    const { programDate } = req.body;
    if (!programDate) {
      return res
        .status(400)
        .json({ success: false, message: "Program date is required" });
    }

    const isBooked = await Booking.findOne({
      photographer: req.params.photographerId,
      programDate: new Date(programDate),
    });

    if (isBooked) {
      return res.status(400).json({
        success: false,
        message: "Photographer is already booked on this date",
      });
    }

    const photographer = await Photographer.findById(req.params.photographerId);

    const user = await User.findById(req.userId);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/photographers/${
        photographer.id
      }`,
      customer_email: user.email,
      client_reference_id: req.params.photographerId,
      line_items: [
        {
          price_data: {
            currency: "bdt",
            unit_amount: photographer.servicePrice * 100,
            product_data: {
              name: photographer.name,
              images: [photographer.photo],
            },
          },
          quantity: 1,
        },
      ],
    });

    // create new booking
    const booking = new Booking({
      photographer: photographer._id,
      user: user._id,
      programDate: new Date(programDate),
      servicePrice: photographer.servicePrice,
      session: session.id,
    });

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Successfully paid",
      session,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating checkout session",
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can view all bookings.",
      });
    }

    // const bookings = await Booking.find()
    /* .populate("user", "name email phone photo isVerified role")
      .populate(
        "photographer",
        "name email phone photo isApproved servicePrice"
      ) */
    const bookings = await Booking.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "photographers",
          localField: "photographer",
          foreignField: "_id",
          as: "photographer",
        },
      },
      { $unwind: "$photographer" },
      {
        $project: {
          "user.name": 1,
          "user.email": 1,
          "user.phone": 1,
          "user.photo": 1,
          "user.isVerified": 1,
          "photographer.name": 1,
          "photographer.email": 1,
          "photographer.phone": 1,
          "photographer.photo": 1,
          "photographer.isApproved": 1,
          servicePrice: 1,
          isPaid: 1,
          status: 1,
          programDate: 1,
          createdAt: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Successfully got all bookings",
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const updateBooking = await Booking.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated booking",
      data: updateBooking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fail to update booking" });
  }
};
