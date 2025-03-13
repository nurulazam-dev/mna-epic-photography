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
import { BASE_URL } from "../../../../config";
import { Update } from "@mui/icons-material";

const UpdateUserModal = ({ user, onClose }) => {
  const [updatedUser, setUpdatedUser] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    role: user?.role,
    gender: user?.gender,
    isVerified: user?.isVerified,
  });

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/${user?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
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
    <Modal open={!!user} onClose={onClose}>
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
            Update User
          </Typography>

          <TextField
            label="Name"
            name="name"
            fullWidth
            value={updatedUser?.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={updatedUser?.email}
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
                value={updatedUser?.phone}
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
                  value={updatedUser.gender}
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
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={updatedUser?.role}
                  onChange={handleChange}
                >
                  <MenuItem value="client">Client</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Verified</InputLabel>
                <Select
                  name="isVerified"
                  value={updatedUser?.isVerified}
                  onChange={handleChange}
                >
                  <MenuItem value="false">Not Verified</MenuItem>
                  <MenuItem value="true">Verified</MenuItem>
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

export default UpdateUserModal;
