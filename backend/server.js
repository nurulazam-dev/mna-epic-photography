import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";
import { set, connect } from "mongoose";

import authRoute from "./routes/auth.js";
import bookingRoute from "./routes/booking.js";
import photographerRoute from "./routes/photographer.js";
import reviewRoute from "./routes/review.js";
import userRoute from "./routes/user.js";

config();

const app = express();
const port = process.env.PORT || 8000;

const corsOption = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("MNA_Epic_Photography's Api is working");
});

// DB_Connection
set("strictQuery", false);
const connectDB = async () => {
  try {
    // connect(process.env.LOCAL_DATABASE);
    connect(process.env.MONGODB_URL);
    console.log("MongoDB is connected");
  } catch (err) {
    console.log("MongoDB connection fail");
  }
};

// middleware
app.use(cookieParser());
app.use(json());
app.use(cors(corsOption));

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/photographers", photographerRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);

app.listen(port, () => {
  connectDB();
  console.log("MNA_Epic_Photography's Server is running on port" + " " + port);
});
