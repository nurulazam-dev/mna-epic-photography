import { useEffect, useState } from "react";
import { CloudUpload, Update } from "@mui/icons-material";
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
import useGetProfile from "../../hooks/useFetchData.jsx";
import Loading from "../../components/Shared/Loading.jsx";
import Error from "../../components/Shared/Error.jsx";

const UserProfile = () => {
  const { data: user, error } = useGetProfile(`${BASE_URL}/users/profile/me`);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: null,
    gender: "",
    phone: "",
  });

  const defaultAvatar =
    "https://p7.hiclipart.com/preview/717/24/975/computer-icons-user-profile-user-account-clip-art-avatar.jpg";

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

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

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

      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
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
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  margin: "16px 0",
                }}
              >
                {" "}
                <img
                  src={formData.photo || defaultAvatar}
                  alt="User"
                  style={{ width: 56, height: 56, borderRadius: "50%" }}
                />
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
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                color="success"
                size="large"
                fullWidth
                disabled={loading}
                startIcon={
                  loading ? <CircularProgress size={24} /> : <Update />
                }
              >
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
};

export default UserProfile;
