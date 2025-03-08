/* eslint-disable react/prop-types */
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const AdminDrawer = ({ setSelectedPage }) => {
  return (
    <Drawer variant="permanent" sx={{ width: 240 }}>
      <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
        Admin Panel
      </Typography>
      <List>
        <ListItem button onClick={() => setSelectedPage("Dashboard")}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => setSelectedPage("Users")}>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button onClick={() => setSelectedPage("Settings")}>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminDrawer;
