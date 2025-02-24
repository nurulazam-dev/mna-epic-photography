import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/images/logo.png";
import userAvatar from "../../assets/images/logo.png";
import { authContext } from "../../context/AuthContext";

const navLinks = [
  { path: "/", display: "HOME" },
  { path: "/photographers", display: "PHOTOGRAPHERS" },
  { path: "/services", display: "SERVICES" },
  { path: "/about", display: "ABOUT US" },
  { path: "/contact", display: "CONTACT" },
];

const Header = () => {
  const { user, role, token, dispatch } = useContext(authContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={3}>
      <Toolbar>
        {/* Logo */}
        <NavLink to="/">
          <img src={logo} alt="Logo" style={{ width: 65 }} />
        </NavLink>

        {/* Desktop Nav Links */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 3 }}>
          {navLinks.map((link) => (
            <Button
              key={link.path}
              component={NavLink}
              to={link.path}
              sx={{ color: "black", fontWeight: "bold", ml: 2 }}
            >
              {link.display}
            </Button>
          ))}
        </Box>

        {/* User Info or Login/Logout */}
        {token && user ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ mr: 1 }}>{user?.name}</Typography>
            <Avatar
              src={user?.photo || userAvatar}
              alt="User"
              onClick={handleMenuOpen}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                component={Link}
                to={
                  role === "photographer"
                    ? "/photographers/profile/me"
                    : "/users/profile/me"
                }
              >
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
          >
            Login
          </Button>
        )}

        {/* Mobile Menu Button */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { md: "none" } }}
          onClick={toggleMobileMenu}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleMobileMenu}>
        <Box sx={{ width: 250 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem
                button
                component={NavLink}
                to={link.path}
                key={link.path}
                onClick={toggleMobileMenu}
              >
                <ListItemText primary={link.display} />
              </ListItem>
            ))}
            {token && user ? (
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            ) : (
              <ListItem
                button
                component={Link}
                to="/login"
                onClick={toggleMobileMenu}
              >
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
