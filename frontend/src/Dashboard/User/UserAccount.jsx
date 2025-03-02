import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  // Container,
  Divider,
  Typography,
} from "@mui/material";
import Error from "../../components/Shared/Error";
import useGetProfile from "../../hooks/useFetchData";
import MyBookings from "./MyBookings";
import { BASE_URL } from "../../../config";
import UserProfile from "./UserProfile";

const UserAccount = () => {
  const [tab, setTab] = useState("bookings");

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  const userAvatar =
    "https://p7.hiclipart.com/preview/717/24/975/computer-icons-user-profile-user-account-clip-art-avatar.jpg";

  return (
    <Box maxWidth={1220} mx="auto" my={6} px={2}>
      {loading && !error && (
        <CircularProgress sx={{ display: "block", mx: "auto" }} />
      )}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            p: 3,
            boxShadow: 3,
          }}
        >
          {/* Left Side - Profile Info */}
          <CardContent
            sx={{ width: { xs: "100%", lg: "20%" }, textAlign: "center" }}
          >
            <Avatar
              src={userData?.photo || userAvatar}
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                border: "2px solid #673AB7",
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ mr: 1 }}>
                {userData?.name}
              </Typography>
              <Typography variant="body2" color="success">
                ({userData?.role})
              </Typography>
            </Box>

            <Typography variant="body2" color="textSecondary">
              {userData?.email}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {userData?.phone}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Gender: {userData?.gender}
            </Typography>
            <Button variant="contained" color="error" fullWidth sx={{ mt: 4 }}>
              Delete Account
            </Button>
          </CardContent>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 2, display: { xs: "none", lg: "block" } }}
          />

          {/* Right Side - Tabs */}
          <CardContent sx={{ width: { xs: "100%", lg: "80%" } }}>
            <Box>
              <Button
                onClick={() => setTab("bookings")}
                variant={tab === "bookings" ? "contained" : "outlined"}
                color="success"
                sx={{ mr: 2 }}
              >
                My Bookings
              </Button>
              <Button
                onClick={() => setTab("settings")}
                variant={tab === "settings" ? "contained" : "outlined"}
                color="success"
              >
                Profile Settings
              </Button>
            </Box>

            {tab === "bookings" && <MyBookings />}
            {tab === "settings" && <UserProfile user={userData} />}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default UserAccount;
