import { Link, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import brandLogo from "../../assets/images/logo.png";

// MUI Components
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

// MUI Icons
import HomeIcon from "@mui/icons-material/Home";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";

const TestCode = () => {
  const [tab, setTab] = useState("overview");
  const { role } = useContext(authContext);

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            backgroundColor: "#1e293b",
            color: "white",
          },
        }}
      >
        <Box sx={{ textAlign: "center", p: 2 }}>
          <img
            src={brandLogo}
            alt="Brand_Logo"
            style={{ width: 36, height: 36 }}
          />
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

          {(role === "billingOfficer" || role === "admin") && (
            <ListItemButton
              component={Link}
              to="/dashboard/add-bill"
              selected={tab === "addBill"}
              onClick={() => setTab("addBill")}
            >
              <ListItemIcon>
                <ReceiptIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Add Bill" />
            </ListItemButton>
          )}

          {(role === "accountant" || role === "admin") && (
            <ListItemButton
              component={Link}
              to="/dashboard/unpaid-bills"
              selected={tab === "unpaidBills"}
              onClick={() => setTab("unpaidBills")}
            >
              <ListItemIcon>
                <ReceiptIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Unpaid Bills" />
            </ListItemButton>
          )}

          {role === "admin" && (
            <>
              <ListItemButton
                component={Link}
                to="/dashboard/manage-bills"
                selected={tab === "manageBills"}
                onClick={() => setTab("manageBills")}
              >
                <ListItemIcon>
                  <ReceiptIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Manage Bills" />
              </ListItemButton>

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

          <ListItemButton
            component={Link}
            to="/dashboard/settings"
            selected={tab === "settings"}
            onClick={() => setTab("settings")}
          >
            <ListItemIcon>
              <SettingsIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
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

export default TestCode;
