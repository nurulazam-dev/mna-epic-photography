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
  { path: "/about-us", display: "ABOUT US" },
  { path: "/contact-us", display: "CONTACT" },
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
    <AppBar position="fixed" color="inherit" elevation={3}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <NavLink to="/">
            <img src={logo} alt="Logo" style={{ width: 65 }} />
          </NavLink>
        </Box>

        {/* ====================
           Desktop Nav Links
        ==================== */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}
        >
          {navLinks.map((link) => (
            <Button
              key={link.path}
              component={NavLink}
              to={link.path}
              sx={{ color: "black", fontWeight: "bold", mx: 1 }}
            >
              {link.display}
            </Button>
          ))}
        </Box>

        {/* ========================
          User Info or Login/Logout
        ======================== */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {token && user ? (
            <>
              <Button
                component={NavLink}
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  display: { xs: "none", md: "flex" },
                }}
                to={
                  role == "admin"
                    ? "dashboard/admin/profile/me"
                    : role == "photographer"
                    ? "dashboard/photographers/profile/me"
                    : "dashboard/users/profile/me"
                }
              >
                {user?.name} <CallMadeOutlinedIcon sx={{ ml: 1 }} />
              </Button>
              <Button
                onClick={handleLogout}
                variant="outlined"
                color="error"
                sx={{ ml: 2 }}
              >
                LOGOUT
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
            >
              LOGIN
            </Button>
          )}

          {/* ====================
             Mobile Menu Button
          ==================== */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { md: "none" } }}
            onClick={toggleMobileMenu}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* ====================
           Mobile Drawer
      ==================== */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleMobileMenu}>
        <Box sx={{ width: 200 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem
                button
                component={NavLink}
                to={link.path}
                key={link.path}
                onClick={toggleMobileMenu}
              >
                <ListItemText
                  sx={{ color: "primary.dark" }}
                  primary={link.display}
                />
              </ListItem>
            ))}

            {token && user ? (
              <MenuList>
                <ListItem
                  button
                  component={NavLink}
                  sx={{ color: "primary.dark", fontWeight: "bold" }}
                  to={
                    role == "admin"
                      ? "dashboard/admin/profile/me"
                      : role == "photographer"
                      ? "dashboard/photographers/profile/me"
                      : "dashboard/users/profile/me"
                  }
                >
                  PROFILE <CallMadeOutlinedIcon />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemText
                    primary="LOGOUT"
                    sx={{
                      color: "red",
                      border: "1px solid red",
                      borderRadius: 1,
                      p: 1,
                      textAlign: "center",
                    }}
                  />
                </ListItem>
              </MenuList>
            ) : (
              <ListItem
                button
                component={Link}
                to="/login"
                onClick={toggleMobileMenu}
              >
                <ListItemText
                  primary="LOGIN"
                  sx={{
                    color: "blue",
                    border: "1px solid blue",
                    borderRadius: 1,
                    p: 1,
                    textAlign: "center",
                  }}
                />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
