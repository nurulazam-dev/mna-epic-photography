import { Box, Grid, Card, CardMedia, Typography } from "@mui/material";
import img1 from "../../assets/images/eventPhotos/2.png";
import img2 from "../../assets/images/eventPhotos/3.png";
import img3 from "../../assets/images/eventPhotos/4.png";
import img4 from "../../assets/images/eventPhotos/5.png";
// import img5 from "../../assets/images/eventPhotos/6.png";
// import img6 from "../../assets/images/eventPhotos/7.png";

/* const images = [
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
]; */

const TestCode = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        Our Gallery test
      </Typography>

      {/* <Grid container spacing={2}>
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
            </Card>
          </Grid>
        ))}
      </Grid> */}

      <Grid container spacing={2}>
        {/* 1st Image (Large - 6 cols, 2 rows) */}
        <Grid item xs={12} sm={6} md={6} lg={6} sx={{ gridRow: "span 2" }}>
          <Card sx={{ height: "100%", borderRadius: 2, overflow: "hidden" }}>
            <CardMedia
              component="img"
              height="100%"
              image={img1}
              alt="Gallery Image 1"
              sx={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Card>
        </Grid>

        {/* 2nd Image (Small - 3 cols, 1 row) */}
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={img2}
              alt="Gallery Image 2"
              sx={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Card>
        </Grid>

        {/* 3rd Image (Small - 3 cols, 1 row) */}
        <Grid item xs={12} sm={3} md={3} lg={3}>
          <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={img3}
              alt="Gallery Image 3"
              sx={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Card>
        </Grid>

        {/* 4th Image (Corrected placement - Below 2nd & 3rd, beside 1st Image) */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
            <CardMedia
              component="img"
              image={img4}
              alt="Gallery Image 4"
              sx={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TestCode;
