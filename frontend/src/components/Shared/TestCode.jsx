import { Box, Grid, Card, CardMedia, Typography } from "@mui/material";
import img1 from "../../assets/images/eventPhotos/2.png";
import img2 from "../../assets/images/eventPhotos/3.png";
import img3 from "../../assets/images/eventPhotos/4.png";
import img4 from "../../assets/images/eventPhotos/5.png";
import img5 from "../../assets/images/eventPhotos/6.png";
import img6 from "../../assets/images/eventPhotos/7.png";

const images = [
  {
    src: img1,
    cols: 6,
    rows: 2,
  },
  {
    src: img2,
    cols: 3,
    rows: 1,
  },
  {
    src: img3,
    cols: 3,
    rows: 1,
  },
  {
    src: img4,
    cols: 6,
    rows: 1,
  },
  {
    src: img5,
    cols: 4,
    rows: 2,
  },
  {
    src: img6,
    cols: 4,
    rows: 2,
  },
  {
    src: img1,
    cols: 4,
    rows: 2,
  },
];

const TestCode = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        Our Gallery
      </Typography>

      <Grid container spacing={2}>
        {images.map((img, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={img.cols * 2}
            md={img.cols}
            lg={img.cols}
          >
            <Card
              sx={{
                position: "relative",
                height: img.rows * 170,
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                height="100%"
                image={img.src}
                alt={img.title}
                sx={{ objectFit: "cover", width: "100%" }}
              />
              {/* <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  p: 2,
                }}
              >
                {img.category && (
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    {img.category}
                  </Typography>
                )}
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {img.title}
                </Typography>
              </Box> */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TestCode;
