import { Box, Grid, Card, CardMedia, Typography } from "@mui/material";
import img1 from "../../assets/images/eventPhotos/2.png";
import img2 from "../../assets/images/eventPhotos/3.png";
import img3 from "../../assets/images/eventPhotos/4.png";
import img4 from "../../assets/images/eventPhotos/5.png";
import img5 from "../../assets/images/eventPhotos/6.png";
import img6 from "../../assets/images/eventPhotos/7.png";

const TestCode = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        Our Gallery test
      </Typography>

      <Grid
        container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "repeat(2, auto)",
          gap: 3,
        }}
      >
        <Box sx={{ gridColumn: "span 6", gridRow: "span 2" }}>
          <Card sx={{ height: "100%", borderRadius: 2, overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={img1}
              alt="Gallery Image 1"
              sx={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Card>
        </Box>

        <Box sx={{ gridColumn: "span 3", gridRow: "span 1" }}>
          <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={img2}
              alt="Gallery Image 2"
              sx={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Card>
        </Box>

        <Box sx={{ gridColumn: "span 3", gridRow: "span 1" }}>
          <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={img3}
              alt="Gallery Image 3"
              sx={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Card>
        </Box>

        <Box sx={{ gridColumn: "span 6", gridRow: "span 1" }}>
          <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={img4}
              alt="Gallery Image 4"
              sx={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Card>
        </Box>
      </Grid>
      <Grid
        container
        mt={2}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "repeat(3, auto)",
          gap: 3,
        }}
      >
        <Box sx={{ gridColumn: "span 4", gridRow: "span 1" }}>
          <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={img5}
              alt="Gallery Image 4"
              sx={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Card>
        </Box>
        <Box sx={{ gridColumn: "span 4", gridRow: "span 1" }}>
          <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={img6}
              alt="Gallery Image 4"
              sx={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Card>
        </Box>
        <Box sx={{ gridColumn: "span 4", gridRow: "span 1" }}>
          <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={img1}
              alt="Gallery Image 4"
              sx={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Card>
        </Box>
      </Grid>
    </Box>
  );
};

export default TestCode;
