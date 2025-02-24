import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Photographer from "../models/PhotographerSchema.js";
import User from "../models/UserSchema.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "2d",
    }
  );
};

export const register = async (req, res) => {
  const { email, password, name, phone, role, photo } = req.body;

  try {
    let user = null;

    if (role == "client") {
      user = await User.findOne({ email });
    } else if (role == "photographer") {
      user = await Photographer.findOne({ email });
    }

    //check if user exist
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role == "client") {
      user = new User({
        name,
        email,
        phone,
        role,
        photo,
        password: hashPassword,
      });
    }

    if (role == "photographer") {
      user = new Photographer({
        name,
        email,
        phone,
        role,
        photo,
        password: hashPassword,
      });
    }

    await user.save();
    res
      .status(200)
      .json({ status: true, message: "User successfully created" });
  } catch (error) {
    res.status(500).json({ status: false, message: "User created fail" });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;
  try {
    let user = null;

    const client = await User.findOne({ email });
    const photographer = await Photographer.findOne({ email });

    if (client) {
      user = client;
    }
    if (photographer) {
      user = photographer;
    }

    //check if user exist or not
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare password
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }

    // get token
    const token = generateToken(user);

    const { password, role, bookings, ...rest } = user._doc;
    return res.status(200).json({
      status: true,
      message: "Successfully login",
      token,
      data: { ...rest },
      role,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Failed to login" });
  }
};
