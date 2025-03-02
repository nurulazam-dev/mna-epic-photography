/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

const AboutPhotographer = ({ about, experience }) => {
  return (
    <Box mb={5}>
      <Box>
        <Typography variant="body1" fontSize={{ xs: 14, lg: 16 }}>
          {about ? (
            about
          ) : (
            <Typography color="error" sx={{ animation: "pulse 1s infinite" }}>
              Bio/About profile isn&apos;t updated. Please update your bio/about
              profile.
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
          <Typography color="error" sx={{ animation: "pulse 1s infinite" }}>
            Experience profile isn&apos;t updated. Please update your experience
            profile.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AboutPhotographer;
