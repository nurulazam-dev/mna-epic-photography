import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import { servicesData } from "../assets/data/localData";

const Services = () => {
  return (
    <Container
      sx={{ minHeight: { xs: "60vh", md: "70vh", lg: "80vh" }, py: 2 }}
    >
      <Box textAlign="center" mb={3}>
        <Typography variant="h3" fontWeight="bold" color="primary">
          Our Services
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {servicesData.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={service?.image}
                alt={service?.title}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {service?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service?.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;
