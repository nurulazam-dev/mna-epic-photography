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
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Dashboard = () => {
  const [tab, setTab] = useState("overview");
  const { role } = useContext(authContext);

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 230,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 230,
            backgroundColor: "#1e293b",
            color: "white",
          },
        }}
      >
        <Box sx={{ textAlign: "center", p: 1 }}>
          <Typography
            variant="h6"
            sx={{ color: "#facc15", fontWeight: "bold", mt: 1 }}
          >
            DASHBOARD
          </Typography>
        </Box>
        <Divider />

        <List>
          <ListItemButton
            component={Link}
            to="/dashboard"
            selected={tab === "overview"}
            onClick={() => setTab("overview")}
          >
            <ListItemIcon>
              <HomeIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Overview" />
          </ListItemButton>

          {role === "client" && (
            <ListItemButton
              component={Link}
              to="/dashboard/my-bookings"
              selected={tab === "myBookings"}
              onClick={() => setTab("myBookings")}
            >
              <ListItemIcon>
                <ReceiptIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="My Bookings" />
            </ListItemButton>
          )}

          {role === "photographer" && (
            <ListItemButton
              component={Link}
              to="/dashboard/bookings"
              selected={tab === "bookings"}
              onClick={() => setTab("bookings")}
            >
              <ListItemIcon>
                <ReceiptIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Bookings" />
            </ListItemButton>
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
                <ListItemText primary="Manage Users" />
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
                <ListItemText primary="Manage Photogs" />
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
                <ListItemText primary="Manage Bookings" />
              </ListItemButton>
            </>
          )}

          <ListItemButton
            component={Link}
            to="/dashboard/profile"
            selected={tab === "profile"}
            onClick={() => setTab("profile")}
          >
            <ListItemIcon>
              <AccountCircleIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
