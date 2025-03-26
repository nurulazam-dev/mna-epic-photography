import { Box, Typography } from "@mui/material";

const Overview = () => {
  return (
    <Box>
      <Box sx={{ textAlign: "center", p: 1 }}>
        <Typography
          variant="h6"
          sx={{ color: "#facc15", fontWeight: "bold", mt: 1 }}
        >
          Overview
        </Typography>
      </Box>
    </Box>
  );
};

export default Overview;
