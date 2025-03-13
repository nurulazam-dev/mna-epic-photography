/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../../../config";
import { Update } from "@mui/icons-material";

const UpdatePhotogModal = ({ photographer, onClose }) => {
  const [updatedPhotog, setUpdatedPhotog] = useState({
    name: photographer?.name,
    email: photographer?.email,
    expertise: photographer?.expertise,
    experience: photographer?.experience,
    phone: photographer?.phone,
    servicePrice: photographer?.servicePrice,
    gender: photographer?.gender,
    isApproved: photographer?.isApproved,
  });

  const handleChange = (e) => {
    setUpdatedPhotog({ ...updatedPhotog, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/photographers/${photographer?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedPhotog),
        }
      );

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
    <Modal open={!!photographer} onClose={onClose}>
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
            Update Photographer
          </Typography>

          <TextField
            label="Name"
            name="name"
            fullWidth
            value={updatedPhotog?.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={updatedPhotog?.email}
            onChange={handleChange}
            disabled
            margin="normal"
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Phone"
                name="phone"
                fullWidth
                value={updatedPhotog?.phone}
                onChange={handleChange}
                margin="normal"
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={updatedPhotog.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Experience</InputLabel>
                <Select
                  name="experience"
                  value={updatedPhotog?.experience}
                  onChange={handleChange}
                >
                  <MenuItem value="1">1 Years</MenuItem>
                  <MenuItem value="2">2 Years</MenuItem>
                  <MenuItem value="3">3 Years</MenuItem>
                  <MenuItem value="4">4 Years</MenuItem>
                  <MenuItem value="5">5 Years</MenuItem>
                  <MenuItem value="6">6 Years</MenuItem>
                  <MenuItem value="7">7 Years</MenuItem>
                  <MenuItem value="8">8 Years</MenuItem>
                  <MenuItem value="9">9 Years</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Service Price"
                name="servicePrice"
                fullWidth
                value={updatedPhotog?.servicePrice}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Expertise</InputLabel>
                <Select
                  name="expertise"
                  value={updatedPhotog?.expertise}
                  onChange={handleChange}
                >
                  <MenuItem value="Wedding">Wedding</MenuItem>
                  <MenuItem value="Event">Event</MenuItem>
                  <MenuItem value="Portrait">Portrait</MenuItem>
                  <MenuItem value="Fashion">Fashion</MenuItem>
                  <MenuItem value="Product">Product</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  name="isApproved"
                  value={updatedPhotog?.isApproved}
                  onChange={handleChange}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
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

export default UpdatePhotogModal;
