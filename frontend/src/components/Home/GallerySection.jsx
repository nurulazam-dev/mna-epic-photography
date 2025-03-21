import { Box, Grid, Card, CardMedia, Typography } from "@mui/material";
import { galleryImagesData } from "../../assets/data/localData";

const GallerySection = () => {
  return (
    <Box sx={{ px: 5, py: 2 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={5}>
        Our Gallery
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
        {galleryImagesData.map((image, index) => (
          <Box
            key={index}
            sx={{
              gridColumn: `span ${image?.span.sm}`,
              gridRow: `span ${image?.rows}`,
            }}
          >
            <Card sx={{ height: "100%", borderRadius: 2, overflow: "hidden" }}>
              <CardMedia
                component="img"
                image={image?.src}
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

export default GallerySection;
