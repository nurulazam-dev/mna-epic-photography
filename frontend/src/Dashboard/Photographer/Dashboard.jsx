import { useState } from "react";
import { AccountCircle, PlaylistAdd, Edit, Warning } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Alert,
} from "@mui/material";
import starIcon from "../../assets/images/icons/Star.png";
import Error from "../../components/Shared/Error";
import Loading from "../../components/Shared/Loading";
import useGetProfile from "../../hooks/useFetchData";
import AboutPhotographer from "../../components/Photographers/PhotographersDetails/AboutPhotographer";
import { BASE_URL } from "../../../config";
import Bookings from "./Bookings";
import PhotographerProfile from "./PhotographerProfile";

const Dashboard = () => {
  const [tab, setTab] = useState("overview");

  const userAvatar =
    "https://p7.hiclipart.com/preview/717/24/975/computer-icons-user-profile-user-account-clip-art-avatar.jpg";

  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/photographers/profile/me`
  );

  return (
    <Box maxWidth={1220} mx="auto" my={6} px={2}>
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <Box display="flex" width="100%" mx="auto">
          {/* Left Side / Tabs */}
          <Card sx={{ width: { xs: "25%", md: "20%" }, p: 2, mr: 2 }}>
            <CardContent>
              <Button
                fullWidth
                onClick={() => setTab("overview")}
                startIcon={<AccountCircle />}
                variant={tab === "overview" ? "contained" : "outlined"}
                sx={{ mb: 2 }}
              >
                Overview
              </Button>
              <Button
                fullWidth
                onClick={() => setTab("bookings")}
                startIcon={<PlaylistAdd />}
                variant={tab === "bookings" ? "contained" : "outlined"}
                sx={{ mb: 2 }}
              >
                Bookings
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

          {/* Right Side / Details Layout */}
          <Box flex={1} px={2}>
            {data.isApproved === "pending" && (
              <Alert severity="warning" icon={<Warning />} sx={{ my: 2 }}>
                To get approval, please complete your profile. We&apos;ll review
                manually and approve within 3 days.
              </Alert>
            )}

            {tab === "overview" && (
              <Box>
                <Typography
                  variant="h5"
                  textAlign="center"
                  bgcolor="green"
                  color="white"
                  p={2}
                >
                  About {data?.name}
                </Typography>
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  alignItems="center"
                  gap={2}
                  pt={3}
                >
                  <Avatar
                    src={data?.photo || userAvatar}
                    sx={{ width: 120, height: 120 }}
                  />
                  <Box>
                    <Typography variant="h6">{data.name}</Typography>
                    <Typography color="textSecondary" fontSize={14}>
                      {data.expertise || (
                        <Typography color="error">
                          Expertise profile isn&apos;t updated. Please update
                          your expertise profile.
                        </Typography>
                      )}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <img src={starIcon} alt="rating" width={20} />
                      <Typography>
                        {data.averageRating} ({data.totalRating})
                      </Typography>
                    </Box>
                    <Typography fontSize={15} color="textSecondary" mt={1}>
                      {data?.bio}
                    </Typography>
                  </Box>
                </Box>
                <AboutPhotographer
                  name={data?.name}
                  about={data?.about}
                  experience={data?.experience}
                />
              </Box>
            )}

            {tab === "bookings" && <Bookings bookings={data.bookings} />}
            {tab === "settings" && (
              <PhotographerProfile photographerData={data} />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
