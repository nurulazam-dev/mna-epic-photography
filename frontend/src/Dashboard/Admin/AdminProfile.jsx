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
  return <div>AdminProfile</div>;
};

export default AdminProfile;
