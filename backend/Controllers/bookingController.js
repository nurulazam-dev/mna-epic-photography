import Stripe from "stripe";
import Booking from "../models/BookingSchema.js";
import Photographer from "../models/PhotographerSchema.js";
import User from "../models/UserSchema.js";

export const getCheckoutSession = async (req, res) => {
  try {
    // get currently booked Photographer
    const photographer = await Photographer.findById(req.params.photographerId);
    const user = await User.findById(req.userId);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // create stripe checkout session
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
      servicePrice: photographer.servicePrice,
      session: session.id,
    });

    await booking.save();

    res.status(200).json({
      success: true,
      message: "successfully paid",
      session,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating checkout session",
    });
  }
};
