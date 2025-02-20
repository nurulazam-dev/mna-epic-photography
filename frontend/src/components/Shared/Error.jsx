/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

const Error = ({ errMessage }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
    >
      <Typography variant="h6" color="error" fontWeight="bold">
        {errMessage}
      </Typography>
    </Box>
  );
};

export default Error;
