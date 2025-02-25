import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  MenuList,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import logo from "../../assets/images/logo.png";
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
  const [mobileOpen, setMobileOpen] = useState(false);

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
            <Button
              component={NavLink}
              sx={{
                color: "black",
                fontWeight: "bold",
                display: { xs: "none", sm: "none", md: "flex" },
              }}
              to={
                role === "photographer"
                  ? "/photographers/profile/me"
                  : "/users/profile/me"
              }
            >
              {user?.name} <CallMadeOutlinedIcon sx={{ ml: 1 }} />
            </Button>
            <Button
              onClick={handleLogout}
              sx={{ ml: 1, color: "red", border: "red 1px solid" }}
            >
              LOGOUT
            </Button>
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
              <MenuList>
                <ListItem
                  button
                  component={NavLink}
                  sx={{ color: "black", fontWeight: "bold" }}
                  to={
                    role === "photographer"
                      ? "/photographers/profile/me"
                      : "/users/profile/me"
                  }
                >
                  PROFILE <CallMadeOutlinedIcon />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="LOGOUT" />
                </ListItem>
              </MenuList>
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
