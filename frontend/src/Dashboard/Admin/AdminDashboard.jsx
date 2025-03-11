import { useState } from "react";
import { AccountCircle, PlaylistAdd, Edit } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { BASE_URL } from "../../../config";

import Error from "../../components/Shared/Error";
import Loading from "../../components/Shared/Loading";
import useGetProfile from "../../hooks/useFetchData";
import AdminDashboardHome from "./AdminDashboardHome";
import ManageBookings from "./ManageBookings";
import AdminProfile from "./AdminProfile";
import ManagePhotographers from "./ManagePhotographers";
import ManageUsers from "./ManageUsers";

const AdminDashboard = () => {
  const [tab, setTab] = useState("adminDashboard");

  const userAvatar =
    "https://p7.hiclipart.com/preview/717/24/975/computer-icons-user-profile-user-account-clip-art-avatar.jpg";

  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/users/profile/me`
  );

  return (
    <Box maxWidth={1220} mx="auto" my={3} px={2}>
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <Box display="flex" width="100%" mx="auto">
          <Card sx={{ width: { xs: "25%", md: "20%" }, p: 2, mr: 2 }}>
            <CardContent>
              <Button
                fullWidth
                onClick={() => setTab("adminDashboard")}
                startIcon={<AccountCircle />}
                variant={tab === "adminDashboard" ? "contained" : "outlined"}
                sx={{ mb: 2 }}
              >
                Overview
              </Button>
              <Button
                fullWidth
                onClick={() => setTab("manageUsers")}
                startIcon={<PlaylistAdd />}
                variant={tab === "manageUsers" ? "contained" : "outlined"}
                sx={{ mb: 2 }}
              >
                Manage Users
              </Button>
              <Button
                fullWidth
                onClick={() => setTab("managePhotographers")}
                startIcon={<PlaylistAdd />}
                variant={
                  tab === "managePhotographers" ? "contained" : "outlined"
                }
                sx={{ mb: 2 }}
              >
                Manage Photographers
              </Button>
              <Button
                fullWidth
                onClick={() => setTab("manageBookings")}
                startIcon={<PlaylistAdd />}
                variant={tab === "manageBookings" ? "contained" : "outlined"}
                sx={{ mb: 2 }}
              >
                Manage Bookings
              </Button>
              <Button
                fullWidth
                onClick={() => setTab("settings")}
                startIcon={<Edit />}
                variant={tab === "settings" ? "contained" : "outlined"}
                sx={{ mb: 2 }}
              >
                Profile
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 6 }}
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>

          <Box flex={1} px={2}>
            {tab === "adminDashboard" && (
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    backgroundColor: "green",
                    color: "white",
                    textAlign: "center",
                    py: 1,
                    fontFamily: "serif",
                  }}
                >
                  About {data?.name}
                </Typography>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  alignItems="center"
                  gap={2}
                  pt={1}
                >
                  <Avatar
                    src={data?.photo || userAvatar}
                    sx={{ width: 120, height: 120 }}
                  />
                  <Box>
                    <Typography variant="h6">{data.name}</Typography>

                    {/* <Typography fontSize={15} color="textSecondary" mt={1}>
                      {data?.bio}
                    </Typography> */}
                  </Box>
                </Box>
                {/* admin dashboard home */}
                <AdminDashboardHome />
              </Box>
            )}

            {tab === "manageBookings" && (
              <ManageBookings manageBookings={data?.bookings} />
            )}
            {tab === "manageUsers" && (
              <ManageUsers manageUsers={data?.bookings} />
            )}
            {tab === "managePhotographers" && (
              <ManagePhotographers managePhotographers={data?.bookings} />
            )}
            {tab === "settings" && <AdminProfile adminData={data} />}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AdminDashboard;
