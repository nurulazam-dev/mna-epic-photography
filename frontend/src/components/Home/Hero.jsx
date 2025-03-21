import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import img1 from "../../assets/images/eventPhotos/2.png";
import img2 from "../../assets/images/eventPhotos/3.png";
import img3 from "../../assets/images/eventPhotos/4.png";
import img4 from "../../assets/images/eventPhotos/5.png";

const images = [img1, img2, img3, img4];

const Hero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "70vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
          zIndex: 10,
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Welcome to Our Event
        </Typography>
        <Typography variant="h6" mt={1}>
          Discover the moments captured in our gallery
        </Typography>
      </Box>

      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 3000 }}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
        style={{ width: "100%", height: "100%" }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              src={image}
              alt={`Slide ${index + 1}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Hero;
