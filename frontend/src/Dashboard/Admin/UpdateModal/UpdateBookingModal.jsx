/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../../../config";
import { useState } from "react";
import { Update } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { formatDate } from "../../../utils/formatDate";

const UpdateBookingModal = ({ booking, onClose }) => {
  const [updatedBooking, setUpdatedBooking] = useState({
    programDate: booking?.programDate,
    status: booking?.status,
    servicePrice: booking?.servicePrice,
    isPaid: booking?.isPaid,
  });

  const handleChange = (e) => {
    setUpdatedBooking({ ...updatedBooking, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${BASE_URL}/bookings/${booking?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBooking),
      });

      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }

      toast.success(message);
      onClose();
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Modal open={!!booking} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={onClose}
          sx={{
            position: "absolute",
            borderRadius: 1,
            right: "2%",
            top: "2%",
          }}
        >
          ✕
        </Button>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ textAlign: "center", color: "green" }}
            gutterBottom
          >
            Update Booking
          </Typography>

          <TextField
            label="Program Date"
            name="programDate"
            fullWidth
            value={formatDate(updatedBooking?.programDate)}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            label="Service Price"
            name="servicePrice"
            fullWidth
            value={updatedBooking?.servicePrice}
            onChange={handleChange}
            required
            margin="normal"
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={updatedBooking?.status}
                  onChange={handleChange}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Paid Status</InputLabel>
                <Select
                  name="isPaid"
                  value={updatedBooking?.isPaid}
                  onChange={handleChange}
                >
                  <MenuItem value="false">Unpaid</MenuItem>
                  <MenuItem value="true">Paid</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="end">
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={handleUpdate}
              startIcon={<Update />}
            >
              Update
            </Button>
          </Box>
        </Grid>
      </Box>
    </Modal>
  );
};

export default UpdateBookingModal;
