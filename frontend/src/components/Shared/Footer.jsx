import {
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import { YouTube, GitHub, Instagram, LinkedIn } from "@mui/icons-material";

const quickLinks = [
  { path: "/", display: "Home" },
  { path: "/about", display: "About Us" },
  { path: "/services", display: "Services" },
  { path: "/photographers", display: "Find a Photographer" },
  { path: "/contact", display: "Contact" },
];

const socialLinks = [
  {
    id: "01",
    path: "https://www.youtube.com/mnawebprogrammingbd",
    icon: <YouTube sx={{ fontSize: 30, color: "#FF0000" }} />,
  },
  {
    id: "02",
    path: "https://github.com/mnaofficialbd",
    icon: <GitHub sx={{ fontSize: 30, color: "#FFF" }} />,
  },
  {
    id: "03",
    path: "https://www.instagram.com/mnaofficialbd",
    icon: <Instagram sx={{ fontSize: 30, color: "#E4405F" }} />,
  },
  {
    id: "04",
    path: "https://www.linkedin.com/in/mnaofficialbd",
    icon: <LinkedIn sx={{ fontSize: 30, color: "#0A66C2" }} />,
  },
];

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "primary.dark", color: "white", py: 5 }}>
      <Container maxWidth="lg">
        {/* Top Section */}
        <Grid container spacing={4}>
          {/* About Us */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              MNA Epic Photography
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
              fuga nesciunt ullam hic corrupti mollitia aspernatur repudiandae.
              Natus beatae fugiat ratione sint error incidunt ipsa hic labore?
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            {quickLinks.map((link) => (
              <Typography key={link.display} variant="body2">
                <Link href={link.path} color="inherit" underline="hover">
                  {link.display}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Contact Us
            </Typography>
            <Typography variant="body2">
              123 Studio St., Raozan, Chattogram
            </Typography>
            <Typography variant="body2">
              Phone:{" "}
              <Link href="tel:+8801234567890" color="inherit" underline="hover">
                +8801234-567890
              </Link>
            </Typography>
            <Typography variant="body2">
              Email:{" "}
              <Link
                href="mailto:info@mnaepicphotography.com"
                color="inherit"
                underline="hover"
              >
                info@mnaepicphotography.com
              </Link>
            </Typography>
          </Grid>

          {/* Newsletter Subscription */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Stay Updated
            </Typography>
            <Typography variant="body2">
              Subscribe to our newsletter for the latest photography tips and
              updates.
            </Typography>
            <Box component="form" sx={{ display: "flex", mt: 2 }}>
              <TextField
                label="Your Email"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ bgcolor: "white", borderRadius: 1 }}
              />
              <Button variant="contained" color="success" sx={{ ml: 1 }}>
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 3, bgcolor: "gray" }} />

        {/* Bottom Section */}
        <Grid container justifyContent="space-between" alignItems="center">
          {/* Social Media Links */}
          <Grid item>
            {socialLinks.map((social) => (
              <IconButton key={social.id} href={social.path} target="_blank">
                {social.icon}
              </IconButton>
            ))}
          </Grid>

          {/* Copyright */}
          <Grid item>
            <Typography variant="body2" color="gray">
              &copy; {new Date().getFullYear()} MNA Epic Photography. All rights
              reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
