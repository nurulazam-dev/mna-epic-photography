import { Box, Typography } from "@mui/material";

const ManageBookings = () => {
  return (
    <Box>
      <Box>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            backgroundColor: "#2E7D32",
            color: "white",
            py: 1,
            fontFamily: "serif",
            borderRadius: 1,
          }}
        >
          Manage Bookings
        </Typography>
      </Box>
    </Box>
  );
};

export default ManageBookings;
