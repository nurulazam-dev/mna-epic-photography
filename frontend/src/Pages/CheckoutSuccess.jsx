import { Link } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";
import brandLogo from "../assets/images/logo.png";

const CheckoutSuccess = () => {
  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center" mt={4}>
        <img
          src={brandLogo}
          alt="MNA Epic Photography"
          style={{ width: "100px", maxWidth: "230px" }}
        />
      </Box>
      <Box textAlign="center" mt={3}>
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          Payment Done
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={1}>
          Thank you for completing your secure online payment!
        </Typography>
        <Typography variant="body1" mt={1}>
          Have a great day!
        </Typography>
        <Box mt={4} sx={{ animation: "bounce 1s infinite" }}>
          <Button
            component={Link}
            to="/home"
            variant="contained"
            color="primary"
          >
            Go Back To Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CheckoutSuccess;
