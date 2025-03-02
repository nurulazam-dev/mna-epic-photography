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

/* ====================================
  Handle Booking Checkout and Payment
======================================*/
export const getCheckoutSession = async (req, res) => {
  try {
    // const { photographerId } = req.params;
    const { programDate } = req.body;
    if (!programDate) {
      return res
        .status(400)
        .json({ success: false, message: "Program date is required" });
    }

    // const selectedDate = new Date(programDate);

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

    // const photographer = await Photographer.findById(photographerId);
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
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Error creating checkout session",
    });
  }
};
