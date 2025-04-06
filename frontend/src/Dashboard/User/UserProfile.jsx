/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CloudUpload, Update } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  // Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import { BASE_URL, token } from "../../../config.js";
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";

const defaultAvatar =
  "https://p7.hiclipart.com/preview/717/24/975/computer-icons-user-profile-user-account-clip-art-avatar.jpg";

const UserProfile = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    phone: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      photo: user?.photo || defaultAvatar,
      gender: user?.gender,
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(user);

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!user || !user._id) {
      toast.error("User data not loaded yet!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/users/profile/me");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <Box mt={1}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          backgroundColor: "#2E7D32",
          color: "white",
          py: 1,
          fontFamily: "serif",
          borderRadius: 1,
        }}
      >
        Profile Information
      </Typography>
      {loading && (
        <Box mt={10} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                disabled
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt={2}
              >
                <input
                  type="file"
                  accept=".jpg, .png, .jpeg"
                  style={{ display: "none" }}
                  id="upload-photo"
                  onChange={handleFileInputChange}
                />
                <label htmlFor="upload-photo">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUpload />}
                  >
                    Upload Photo
                  </Button>
                </label>
                <img
                  src={formData.photo || defaultAvatar}
                  alt="User"
                  style={{ width: 48, height: 48, borderRadius: "50%" }}
                />
              </Box>
            </Grid>
          </Grid>

          <Box mt={3} textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={loading}
              startIcon={loading ? <CircularProgress size={24} /> : <Update />}
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default UserProfile;
