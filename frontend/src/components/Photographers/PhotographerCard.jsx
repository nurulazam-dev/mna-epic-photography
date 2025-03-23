/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import {
  LinkedIn,
  Instagram,
  Facebook,
  Twitter,
  Star,
  ArrowForward,
} from "@mui/icons-material";

const PhotographerCard = ({ photographer }) => {
  const { name, expertise, averageRating, totalRating, photo, experience } =
    photographer;

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, pb: 2 }}>
      <Box
        sx={{ display: "flex", justifyContent: "end", position: "relative" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#e0e0e0",
            px: 1,
            py: 0.5,
            borderTopRightRadius: 4,
            borderBottomLeftRadius: 4,
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          <Star sx={{ color: "gold", fontSize: 18, mr: 0.5 }} />
          <Typography variant="body2" fontWeight={600} color="textPrimary">
            {averageRating > 0 ? averageRating?.toFixed(1) : averageRating}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ ml: 0.5 }}>
            ({totalRating})
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 3,
        }}
      >
        <CardMedia
          component="img"
          image={photo}
          alt={name}
          sx={{ width: "75%" }}
        />
      </Box>

      <CardContent sx={{ textAlign: "center", py: 0 }}>
        <Typography variant="h6" fontWeight={800} color="primary">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {expertise + " photography expert" || (
            <Typography color="error" variant="body2">
              expertise Not Updated
            </Typography>
          )}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Experience:{" "}
          {experience + " years" || (
            <Typography color="error" variant="body2">
              Experience Not Updated
            </Typography>
          )}
        </Typography>
      </CardContent>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <IconButton
          sx={{
            bgcolor: "#1877F2",
            color: "white",
            mx: 1,
            "&:hover": { bgcolor: "#E65100" },
          }}
        >
          <LinkedIn />
        </IconButton>
        <IconButton
          sx={{
            bgcolor: "#1877F2",
            color: "white",
            mx: 1,
            "&:hover": { bgcolor: "#E65100" },
          }}
        >
          <Instagram />
        </IconButton>
        <IconButton
          sx={{
            bgcolor: "#1877F2",
            color: "white",
            mx: 1,
            "&:hover": { bgcolor: "#E65100" },
          }}
        >
          <Facebook />
        </IconButton>
        <IconButton
          sx={{
            bgcolor: "#1877F2",
            color: "white",
            mx: 1,
            "&:hover": { bgcolor: "#E65100" },
          }}
        >
          <Twitter />
        </IconButton>
      </Box>

      <Box sx={{ px: 2 }}>
        <Link
          to={`/photographers/${photographer._id}`}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "green",
              color: "white",
              "&:hover": { bgcolor: "darkgreen" },
            }}
            endIcon={<ArrowForward />}
          >
            Details
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

export default PhotographerCard;
