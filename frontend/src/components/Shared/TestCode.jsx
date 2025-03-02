/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../../../config";
import {
  Box,
  Typography,
  Button,
  Paper,
  // List,
  // ListItem,
  Divider,
  TextField,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

// const SidePanel = ({ photographerId, servicePrice, timeSlots }) => {
const SidePanel = ({ photographerId, servicePrice }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/bookings/booked-dates/${photographerId}`
        );
        const data = await res.json();
        if (res.ok) {
          setBookedDates(data.bookedDates.map((date) => dayjs(date)));
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        toast.error(err);
      }
    };
    fetchBookedDates();
  }, [photographerId]);

  // Handle booking
  const bookingHandler = async () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${photographerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ programDate: selectedDate }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message + " Please try again");
      }
      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      {/* Service Price */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          Service Price
        </Typography>
        <Typography variant="h6" color="primary" fontWeight="bold">
          {servicePrice} BDT
        </Typography>
      </Box>

      {/* Available Time Slots */}
      {/* <Box my={3}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          Available Time Slots:
        </Typography>
        <List>
          {timeSlots?.map((item, index) => (
            <ListItem
              key={index}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="body2" fontWeight="bold">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </Typography>
              <Typography
                variant="body2"
                fontWeight="bold"
                color="textSecondary"
              >
                Time Slots
                {convertTime(item.startingTime)} -{" "} 
                {convertTime(item.endingTime)} 
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box> */}

      {/* Date Picker for Booking */}
      <Box my={3}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          Select a Date:
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            disablePast
            shouldDisableDate={(date) =>
              bookedDates.some((bookedDate) => bookedDate.isSame(date, "day"))
            }
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Booking Button */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        onClick={bookingHandler}
      >
        Booking
      </Button>
    </Paper>
  );
};

export default SidePanel;
