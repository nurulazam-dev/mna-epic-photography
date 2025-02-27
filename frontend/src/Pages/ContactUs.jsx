import { Box, Typography, Grid, Paper, TextField, Button } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";

const ContactUs = () => {
  const contactInfo = [
    {
      title: "Address",
      info: "123 Photography Lane, MNA Studio, CTG, BD.",
      icon: <LocationOnIcon fontSize="large" color="primary" />,
    },
    {
      title: "Phone",
      info: "+88 01745-678923",
      icon: <PhoneIcon fontSize="large" color="secondary" />,
    },
    {
      title: "Email",
      info: "info@mnaepicphotography.com",
      icon: <EmailIcon fontSize="large" color="success" />,
    },
  ];
  return (
    <Box
      sx={{
        minHeight: { xs: "60vh", md: "70vh", lg: "80vh" },
        px: 3,
        py: 5,
        bgcolor: "#f5f5f5",
      }}
    >
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" fontWeight="bold" color="primary">
          Contact Us
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mt={1}>
          We&apos;d love to hear from you! Reach out for inquiries,
          collaborations, or support.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              mb={3}
              textAlign="center"
            >
              Get in Touch
            </Typography>
            <Box display="flex" flexDirection="column" gap={3}>
              {contactInfo.map((item, index) => (
                <Paper
                  key={index}
                  elevation={4}
                  sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}
                >
                  {item.icon}
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.info}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper elevation={4} sx={{ p: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              textAlign="center"
              mb={3}
            >
              Send Us a Message
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField label="Your Name" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Your Email" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Your Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<SendIcon />}
                  fullWidth
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Google Map */}
      <Box mt={6} textAlign="center">
        <Typography variant="h4" fontWeight="bold" color="primary" mb={2}>
          Find Us Here
        </Typography>
        <Paper elevation={3} sx={{ overflow: "hidden", borderRadius: 2 }}>
          <iframe
            title="Google Map"
            width="100%"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7351.157546348601!2d91.82465879244582!3d22.503226050073946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd812fc3d3583%3A0x2a3b0d6f6b9c1769!2sRaozan%20Chattogram!5e0!3m2!1sen!2sbd!4v1697046123456!5m2!1sen!2sbd"
          ></iframe>
        </Paper>
      </Box>
    </Box>
  );
};

export default ContactUs;
