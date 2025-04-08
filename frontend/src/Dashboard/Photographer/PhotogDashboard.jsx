import { Warning, Star, ArrowOutward } from "@mui/icons-material";
import { Button, Typography, Avatar, Box, Alert } from "@mui/material";
import Error from "../../components/Shared/Error";
import Loading from "../../components/Shared/Loading";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import { Link } from "react-router-dom";

const PhotogDashboard = () => {
  const userAvatar =
    "https://p7.hiclipart.com/preview/717/24/975/computer-icons-user-profile-user-account-clip-art-avatar.jpg";

  const {
    data: photogData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/photographers/profile/me`);

  const {
    name,
    photo,
    expertise,
    isApproved,
    about,
    averageRating,
    experience,
  } = photogData || {};

  return (
    <Box>
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <Box px={2}>
          {isApproved === "pending" && (
            <Alert severity="warning" icon={<Warning />} sx={{ my: 2 }}>
              To get approval, please complete your profile. We&apos;ll review
              manually and approve within 3 days.
            </Alert>
          )}

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
              About {name}
            </Typography>
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              alignItems="center"
              gap={2}
              pt={1}
            >
              <Avatar
                src={photo || userAvatar}
                sx={{ width: 120, height: 120 }}
              />
              <Box>
                <Typography variant="h6">{name}</Typography>
                <Typography color="textSecondary" fontSize={14}>
                  {expertise + " Photography Expert" || (
                    <Typography color="error">
                      Expertise profile isn&apos;t updated. Please update your
                      expertise profile.
                    </Typography>
                  )}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  {<Star />}
                  <Typography>
                    {averageRating > 0
                      ? averageRating?.toFixed(1)
                      : averageRating}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box mb={2}>
              <Box>
                <Typography variant="body1" fontSize={{ xs: 14, lg: 16 }}>
                  {about ? (
                    about
                  ) : (
                    <Typography
                      color="error"
                      sx={{ animation: "pulse 1s infinite" }}
                    >
                      Bio/About profile isn&apos;t updated. Please update your
                      bio/about profile.
                    </Typography>
                  )}
                </Typography>
              </Box>

              <Box mt={3}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  Experience
                </Typography>
                {experience ? (
                  experience + " years of professional experience."
                ) : (
                  <Typography
                    color="error"
                    sx={{ animation: "pulse 1s infinite" }}
                  >
                    Experience profile isn&apos;t updated. Please update your
                    experience profile.
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      <Box sx={{ px: 2 }}>
        <Link
          to={`/dashboard/photog-profile`}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "black",
              color: "white",
              "&:hover": { bgcolor: "darkgreen" },
            }}
            endIcon={<ArrowOutward />}
          >
            Update Account
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default PhotogDashboard;
