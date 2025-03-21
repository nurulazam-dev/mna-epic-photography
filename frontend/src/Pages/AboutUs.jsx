import { Box, Typography, Grid, Paper, Avatar } from "@mui/material";
import { teamData } from "../assets/data/localData";
import BusinessIcon from "@mui/icons-material/Business";
import VisibilityIcon from "@mui/icons-material/Visibility";

const AboutUs = () => {
  const missionVisionData = [
    {
      title: "Our Mission",
      text: "To create stunning visual stories that connect with people and bring emotions to life through photography.",
      icon: <BusinessIcon fontSize="large" color="primary" />,
    },
    {
      title: "Our Vision",
      text: "To be the most trusted photography brand, transforming moments into timeless art for generations.",
      icon: <VisibilityIcon fontSize="large" color="secondary" />,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: { xs: "60vh", md: "70vh", lg: "80vh" },
        px: 3,
        py: 5,
        // bgcolor: "#f5f5f5",
      }}
    >
      <Box textAlign="center" mb={3}>
        <Typography variant="h3" fontWeight="bold" color="primary">
          About Us
        </Typography>
      </Box>

      <Box mb={2} textAlign="center" maxWidth="800px" mx="auto">
        <Typography variant="h5" fontWeight="bold">
          Who We Are
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We are a leading photography company dedicated to capturing life’s
          most precious moments with artistic excellence. Our expert team
          specializes in wedding photography, portraits, events, and commercial
          shoots, ensuring timeless memories.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {missionVisionData.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper
              elevation={3}
              sx={{ p: 4, textAlign: "center", minHeight: "120px" }}
            >
              {item.icon}
              <Typography variant="h6" fontWeight="bold">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                {item.text}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={3} mb={1}>
        <Typography variant="h3" fontWeight="bold" color="primary">
          Meet Our Team
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        {teamData.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={4} sx={{ p: 3, textAlign: "center" }}>
              <Avatar
                src={member.img}
                sx={{ width: 80, height: 80, mx: "auto" }}
              />
              <Typography variant="h6" fontWeight="bold" mt={2}>
                {member.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {member.role}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AboutUs;
