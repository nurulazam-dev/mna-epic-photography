import { Box, Grid, Card, CardMedia, Typography } from "@mui/material";
import img1 from "../../assets/images/eventPhotos/2.png";
import img2 from "../../assets/images/eventPhotos/5.png";
import img3 from "../../assets/images/eventPhotos/4.png";
import img4 from "../../assets/images/eventPhotos/6.png";
import img5 from "../../assets/images/eventPhotos/3.png";
import img6 from "../../assets/images/eventPhotos/7.png";

const TestCode = () => {
  const galleryImages = [
    { src: img1, span: { xs: 12, sm: 6 }, rows: 2 },
    { src: img2, span: { xs: 6, sm: 3 }, rows: 1 },
    { src: img3, span: { xs: 6, sm: 3 }, rows: 1 },
    { src: img4, span: { xs: 12, sm: 6 }, rows: 1 },
    { src: img5, span: { xs: 4, sm: 4 }, rows: 1 },
    { src: img6, span: { xs: 4, sm: 4 }, rows: 1 },
    { src: img1, span: { xs: 4, sm: 4 }, rows: 1 },
  ];

  return (
    <Box sx={{ px: 5, py: 2 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={5}>
        Our Gallery Test
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "auto",
          gap: 3,
        }}
      >
        {galleryImages.map((image, index) => (
          <Box
            key={index}
            sx={{
              gridColumn: `span ${image.span.sm}`,
              gridRow: `span ${image.rows}`,
            }}
          >
            <Card sx={{ height: "100%", borderRadius: 2, overflow: "hidden" }}>
              <CardMedia
                component="img"
                image={image.src}
                alt={`Gallery Image ${index + 1}`}
                sx={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </Card>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default TestCode;
