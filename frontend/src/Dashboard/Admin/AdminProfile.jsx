/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  // Container,
  Avatar,
  CircularProgress,
  Box,
  Grid,
} from "@mui/material";
import { CloudUpload, Update } from "@mui/icons-material";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../../config";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import Loading from "../../components/Shared/Loading";

const AdminProfile = ({ adminData }) => {
  const [loading, setLoading] = useState(false);

  const avatarImg =
    "https://p7.hiclipart.com/preview/717/24/975/computer-icons-user-profile-user-account-clip-art-avatar.jpg";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      name: adminData?.name,
      email: adminData?.email,
      phone: adminData?.phone,
      gender: adminData?.gender,
      photo: adminData?.photo,
    });
  }, [adminData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setFormData({ ...formData, photo: data?.url });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    if (!adminData || !adminData._id) {
      toast.error("Admin data not loaded yet!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users/${adminData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) {
        throw Error(result.message);
      }
      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  return (
    <Box>
      {loading && <Loading />}
      {!loading && (
        <Box>
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
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  disabled
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                  {formData.photo && (
                    <Avatar
                      src={formData.photo || avatarImg}
                      sx={{ width: 56, height: 56 }}
                    />
                  )}
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUpload />}
                  >
                    Upload Photo
                    <input
                      type="file"
                      hidden
                      onChange={handleFileInputChange}
                      accept="image/*"
                    />
                  </Button>
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
                  color="success"
                  size="large"
                  fullWidth
                  onClick={updateProfileHandler}
                  startIcon={
                    loading ? <CircularProgress size={24} /> : <Update />
                  }
                >
                  {loading ? "Updating..." : "Update Profile"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default AdminProfile;
