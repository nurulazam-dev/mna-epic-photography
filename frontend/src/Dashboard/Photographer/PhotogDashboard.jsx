import { Warning, Star, ArrowOutward } from "@mui/icons-material";
import { Button, Typography, Avatar, Box, Alert } from "@mui/material";
import Error from "../../components/Shared/Error";
import Loading from "../../components/Shared/Loading";
import useGetProfile from "../../hooks/useFetchData";
import AboutPhotographer from "../../components/Photographers/PhotographersDetails/AboutPhotographer";
import { BASE_URL } from "../../../config";
import { Link } from "react-router-dom";

const PhotogDashboard = () => {
  const userAvatar =
    "https://p7.hiclipart.com/preview/717/24/975/computer-icons-user-profile-user-account-clip-art-avatar.jpg";

  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/photographers/profile/me`
  );

  return (
    <Box>
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <Box px={2}>
          {data?.isApproved === "pending" && (
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
                <Typography variant="h6">{data?.name}</Typography>
                <Typography color="textSecondary" fontSize={14}>
                  {data?.expertise + " Photography Expert" || (
                    <Typography color="error">
                      Expertise profile isn&apos;t updated. Please update your
                      expertise profile.
                    </Typography>
                  )}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  {<Star />}
                  <Typography>
                    {data?.averageRating > 0
                      ? data?.averageRating?.toFixed(1)
                      : data?.averageRating}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <AboutPhotographer
              name={data?.name}
              about={data?.about}
              experience={data?.experience}
            />
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
              bgcolor: "blue",
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
