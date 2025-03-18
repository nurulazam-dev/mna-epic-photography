import { useState } from "react";
import { Box, Typography, Modal } from "@mui/material";

import img1 from "../../assets/images/eventPhotos/2.png";
import img2 from "../../assets/images/eventPhotos/3.png";
import img3 from "../../assets/images/eventPhotos/4.png";
import img4 from "../../assets/images/eventPhotos/5.png";
import img5 from "../../assets/images/eventPhotos/6.png";
import img6 from "../../assets/images/eventPhotos/7.png";

const images = [img1, img2, img3, img4, img5, img6];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        Our Gallery
      </Typography>

      {/* Image Grid */}
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={2}
      >
        {images.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            alt={`Gallery ${index + 1}`}
            sx={{
              width: "100%",
              height: { xs: 160, sm: 190, md: 220 },
              objectFit: "cover",
              borderRadius: 2,
              boxShadow: 3,
              cursor: "pointer",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </Box>

      {/* Image Modal */}
      <Modal open={!!selectedImage} onClose={() => setSelectedImage(null)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 3,
            borderRadius: 2,
            boxShadow: 4,
            maxWidth: 600,
          }}
        >
          <Box
            component="img"
            src={selectedImage}
            alt="Selected"
            sx={{ width: "100%", borderRadius: 2 }}
          />
          <Typography
            textAlign="center"
            mt={2}
            color="error"
            sx={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => setSelectedImage(null)}
          >
            Close
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default GallerySection;
