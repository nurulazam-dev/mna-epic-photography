import { Typography, Avatar, Box, Paper } from "@mui/material";
import { BASE_URL } from "../../../config";
import Error from "../../components/Shared/Error";
import Loading from "../../components/Shared/Loading";
import useGetProfile from "../../hooks/useFetchData";
import AdminDashboardHome from "./AdminDashboardHome";

const AdminDashboard = () => {
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
          <Box flex={1} px={2}>
            <Box>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  padding: 3,
                  backgroundColor: "primary.main",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Avatar
                    src={data?.photo || userAvatar}
                    sx={{
                      width: 120,
                      height: 120,
                      border: "3px solid white",
                    }}
                  />
                  <Box>
                    <Typography variant="h5" fontWeight="bold">
                      {data?.name}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8 }}>
                      {data?.phone}
                    </Typography>
                    <Typography variant="h6" sx={{ fontStyle: "italic" }}>
                      {data?.email}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    opacity: 0.8,
                    fontFamily: "Monospace",
                    textAlign: "justify",
                  }}
                >
                  Welcome back, {data?.name}! 👋 As an admin, you have full
                  control over managing users, photographers, and bookings. Stay
                  updated with the latest platform insights and ensure
                  everything runs smoothly. Let’s make today productive!
                </Typography>
              </Paper>

              {/* Admin Dashboard Summary */}
              <Box sx={{ marginTop: 3 }}>
                <AdminDashboardHome />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AdminDashboard;
