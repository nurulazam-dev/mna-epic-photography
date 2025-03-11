import { Box, Typography } from "@mui/material";

const ManageUsers = () => {
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
          Manage Users
        </Typography>
      </Box>
    </Box>
  );
};

export default ManageUsers;
