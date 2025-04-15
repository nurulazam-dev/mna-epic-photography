import { Link, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { authContext } from "../context/AuthContext";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { DeleteForever } from "@mui/icons-material";

const Dashboard = () => {
  const [tab, setTab] = useState("overview");
  const { role } = useContext(authContext);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerWidth = isSmallScreen ? 55 : 235;

  return (
    <Box display="flex">
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: 1,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#1e293b",
            color: "white",
            pt: "70px",
          },
        }}
      >
        {!isSmallScreen && (
          <>
            <Box sx={{ textAlign: "center", p: 1 }}>
              <Typography
                variant="h6"
                sx={{ color: "#facc15", fontWeight: "bold", mt: 1 }}
              >
                DASHBOARD
              </Typography>
            </Box>
            <Divider />
          </>
        )}

        <List sx={{ px: isSmallScreen ? 0.3 : 1 }}>
          <ListItemButton
            component={Link}
            to="/dashboard"
            selected={tab === "overview"}
            onClick={() => setTab("overview")}
          >
            <ListItemIcon>
              <HomeIcon sx={{ color: "white" }} />
            </ListItemIcon>
            {!isSmallScreen && <ListItemText primary="Overview" />}
          </ListItemButton>

          {role === "client" && (
            <>
              <ListItemButton
                component={Link}
                to="/dashboard/my-bookings"
                selected={tab === "myBookings"}
                onClick={() => setTab("myBookings")}
              >
                <ListItemIcon>
                  <ReceiptIcon sx={{ color: "white" }} />
                </ListItemIcon>
                {!isSmallScreen && <ListItemText primary="My Bookings" />}
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/dashboard/user-profile"
                selected={tab === "profile"}
                onClick={() => setTab("profile")}
              >
                <ListItemIcon>
                  <AccountCircleIcon sx={{ color: "white" }} />
                </ListItemIcon>
                {!isSmallScreen && <ListItemText primary="Profile" />}
              </ListItemButton>
            </>
          )}

          {role === "photographer" && (
            <>
              <ListItemButton
                component={Link}
                to="/dashboard/bookings"
                selected={tab === "bookings"}
                onClick={() => setTab("bookings")}
              >
                <ListItemIcon>
                  <ReceiptIcon sx={{ color: "white" }} />
                </ListItemIcon>
                {!isSmallScreen && <ListItemText primary="Bookings" />}
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/dashboard/photog-profile"
                selected={tab === "profile"}
                onClick={() => setTab("profile")}
              >
                <ListItemIcon>
                  <AccountCircleIcon sx={{ color: "white" }} />
                </ListItemIcon>
                {!isSmallScreen && <ListItemText primary="Profile" />}
              </ListItemButton>
            </>
          )}

          {role === "admin" && (
            <>
              <ListItemButton
                component={Link}
                to="/dashboard/manage-users"
                selected={tab === "manageUsers"}
                onClick={() => setTab("manageUsers")}
              >
                <ListItemIcon>
                  <PeopleIcon sx={{ color: "white" }} />
                </ListItemIcon>
                {!isSmallScreen && <ListItemText primary="Manage Users" />}
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/dashboard/manage-photogs"
                selected={tab === "managePhotogs"}
                onClick={() => setTab("managePhotogs")}
              >
                <ListItemIcon>
                  <PeopleIcon sx={{ color: "white" }} />
                </ListItemIcon>
                {!isSmallScreen && <ListItemText primary="Manage Photogs" />}
              </ListItemButton>

              <ListItemButton
                component={Link}
                to="/dashboard/manage-bookings"
                selected={tab === "manageBookings"}
                onClick={() => setTab("manageBookings")}
              >
                <ListItemIcon>
                  <ReceiptIcon sx={{ color: "white" }} />
                </ListItemIcon>
                {!isSmallScreen && <ListItemText primary="Manage Bookings" />}
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/dashboard/admin-profile"
                selected={tab === "profile"}
                onClick={() => setTab("profile")}
              >
                <ListItemIcon>
                  <AccountCircleIcon sx={{ color: "white" }} />
                </ListItemIcon>
                {!isSmallScreen && <ListItemText primary="Profile" />}
              </ListItemButton>
            </>
          )}
          {!isSmallScreen && (
            <Button
              fullWidth
              variant="contained"
              startIcon={<DeleteForever />}
              color="error"
              sx={{ mt: 11, height: 45 }}
            >
              Delete Account
            </Button>
          )}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 2, height: "420px" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
