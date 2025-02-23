/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../../../config";
// import convertTime from "../../utils/convertTime";
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  Divider,
} from "@mui/material";

const SidePanel = ({ photographerId, servicePrice, timeSlots }) => {
  console.log(servicePrice, timeSlots);

  const bookingHandler = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${photographerId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      <Box my={3}>
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
                {/* {convertTime(item.startingTime)} -{" "} */}
                {/* {convertTime(item.endingTime)} */}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Booking Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={bookingHandler}
      >
        Booking
      </Button>
    </Paper>
  );
};

export default SidePanel;
