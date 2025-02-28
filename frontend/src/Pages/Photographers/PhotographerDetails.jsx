import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import Loading from "../../components/Shared/Loading";
import Error from "../../components/Shared/Error";
import Feedback from "../../components/Photographers/PhotographersDetails/Feedback";
import SidePanel from "../../components/Photographers/PhotographersDetails/SidePanel";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import AboutPhotographer from "../../components/Photographers/PhotographersDetails/AboutPhotographer";

const PhotographerDetails = () => {
  const [tab, setTab] = useState("about");
  const { id } = useParams();
  const {
    data: photographer,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/photographers/${id}`);

  if (loading) return <Loading />;
  if (error) return <Error />;

  const {
    name,
    // bio,
    reviews,
    totalRating,
    expertise,
    servicePrice,
    experience,
    timeSlots,
    about,
    averageRating,
    photo,
  } = photographer;

  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Grid container spacing={5}>
        {/* Left Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box display="flex" gap={3} alignItems="center">
              <Box
                component="img"
                src={photo}
                alt="Photographer"
                sx={{ width: 120, height: 120, borderRadius: 2 }}
              />
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {expertise}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2" fontWeight="bold">
                    {averageRating}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ({totalRating})
                  </Typography>
                </Box>
                {/* <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ maxWidth: 400, mt: 1 }}
                >
                  {bio}
                </Typography> */}
              </Box>
            </Box>
            {/* Tabs: About & Feedback */}
            <Box mt={3} borderBottom={1} borderColor="primary.light">
              <Tabs
                value={tab}
                onChange={(e, newValue) => setTab(newValue)}
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab value="about" label="About" />
                <Tab value="feedback" label="Feedback" />
              </Tabs>
            </Box>
            {/* Tab Content */}
            <Box mt={3}>
              {tab === "about" && (
                <AboutPhotographer
                  name={name}
                  about={about}
                  experience={experience}
                />
              )}
              {tab === "feedback" && (
                <Feedback reviews={reviews} totalRating={totalRating} />
              )}
            </Box>
          </Paper>
        </Grid>
        {/* Right Section: Side Panel */}
        <Grid item xs={12} md={4}>
          <SidePanel
            photographer={photographer._id}
            servicePrice={servicePrice}
            timeSlots={timeSlots}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PhotographerDetails;
