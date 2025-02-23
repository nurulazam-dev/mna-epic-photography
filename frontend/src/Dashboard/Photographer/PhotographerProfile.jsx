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
  Container,
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { CloudUpload, Update } from "@mui/icons-material";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";

const PhotographerProfile = ({ photographerData }) => {
  const [loading, setLoading] = useState(false);

  const avatarImg =
    "https://p7.hiclipart.com/preview/717/24/975/computer-icons-user-profile-user-account-clip-art-avatar.jpg";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    gender: "",
    expertise: "",
    servicePrice: 0,
    experience: "",
    about: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      name: photographerData?.name,
      email: photographerData?.email,
      phone: photographerData?.phone,
      bio: photographerData?.bio,
      gender: photographerData?.gender,
      expertise: photographerData?.expertise,
      servicePrice: photographerData?.servicePrice,
      experience: photographerData?.experience,
      about: photographerData?.about,
      photo: photographerData?.photo,
    });
  }, [photographerData]);

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
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/photographers/${photographerData._id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
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
    <Container>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          backgroundColor: "#2E7D32",
          color: "white",
          py: 2,
          borderRadius: 1,
        }}
      >
        Profile Information
      </Typography>
      <form>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Expertise</InputLabel>
          <Select
            name="expertise"
            value={formData.expertise}
            onChange={handleInputChange}
          >
            <MenuItem value="Wedding">Wedding</MenuItem>
            <MenuItem value="Portrait">Portrait</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Service Price"
          type="number"
          name="servicePrice"
          value={formData.servicePrice}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Experience"
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="About"
          name="about"
          value={formData.about}
          onChange={handleInputChange}
          margin="normal"
          multiline
          rows={4}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            margin: "16px 0",
          }}
        >
          <IconButton color="primary" component="label">
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleFileInputChange}
            />
            <CloudUpload />
          </IconButton>
          {formData.photo && (
            <Avatar
              src={formData.photo || avatarImg}
              sx={{ width: 56, height: 56 }}
            />
          )}
        </div>

        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={updateProfileHandler}
          startIcon={loading ? <CircularProgress size={24} /> : <Update />}
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Container>
  );
};

export default PhotographerProfile;
