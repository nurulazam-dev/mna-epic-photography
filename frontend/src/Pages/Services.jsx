import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const Services = () => {
  const services = [
    {
      title: "Wedding Photography",
      description:
        "Capture the most beautiful moments of your special day with our expert photographers.",
      image: "https://source.unsplash.com/400x300/?wedding,photography",
    },
    {
      title: "Event Photography",
      description:
        "We cover corporate and personal events with high-quality photography.",
      image: "https://source.unsplash.com/400x300/?event,photography",
    },
    {
      title: "Portrait Photography",
      description:
        "Professional portrait sessions tailored to your personality and style.",
      image: "https://source.unsplash.com/400x300/?portrait,photography",
    },
    {
      title: "Product Photography",
      description:
        "High-quality product photos that make your brand stand out.",
      image: "https://source.unsplash.com/400x300/?product,photography",
    },
    {
      title: "Fashion Photography",
      description:
        "Showcase the latest fashion trends with stunning photography.",
      image: "https://source.unsplash.com/400x300/?fashion,photography",
    },
    {
      title: "Nature Photography",
      description:
        "Capture the beauty of nature with our professional photographers.",
      image: "https://source.unsplash.com/400x300/?nature,photography",
    },
  ];

  return (
    <Container
      sx={{ minHeight: { xs: "60vh", md: "70vh", lg: "80vh" }, py: 5 }}
    >
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Our Photography Services
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" mb={4}>
        Explore our wide range of photography services to capture your special
        moments.
      </Typography>

      <Grid container spacing={3}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={service.image}
                alt={service.title}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
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
