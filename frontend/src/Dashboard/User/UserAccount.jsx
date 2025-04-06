import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import Error from "../../components/Shared/Error";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import { GppBad, VerifiedUser } from "@mui/icons-material";

const UserAccount = () => {
  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);
  console.log("user : ", userData);

  const userAvatar =
    "https://p7.hiclipart.com/preview/717/24/975/computer-icons-user-profile-user-account-clip-art-avatar.jpg";

  return (
    <Box maxWidth={1220} mx="auto" my={3} px={2}>
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
            sx={{ width: { xs: "100%", lg: "25%" }, textAlign: "center" }}
          >
            <Avatar
              src={userData?.photo || userAvatar}
              sx={{
                width: 150,
                height: 150,
                mx: "auto",
                border: "2px solid #673AB7",
              }}
            />
          </CardContent>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 2, display: { xs: "none", lg: "block" } }}
          />

          {/* Right Side - Tabs */}
          <CardContent
            sx={{ width: { xs: "100%", lg: "75%", textAlign: "center" } }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                {userData?.name}
              </Typography>
              {userData?.isVerified == "true" ? (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="green"
                  height={16}
                  width={16}
                  sx={{ marginLeft: "3px" }}
                >
                  <VerifiedUser fontSize="10px" />
                </Box>
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="red"
                  height={16}
                  width={16}
                  sx={{ marginLeft: "3px" }}
                >
                  <GppBad fontSize="10px" />
                </Box>
              )}
            </Box>

            <Typography variant="body2" color="success">
              ({userData?.role})
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {userData?.email}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Phone : {userData?.phone}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Gender : {userData?.gender}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Registered :{" "}
              {userData?.createdAt
                ? new Date(userData.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "???"}
            </Typography>

            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 2 }}
            >
              Update Account
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default UserAccount;
