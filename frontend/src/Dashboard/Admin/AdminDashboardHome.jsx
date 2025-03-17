import { useState, useEffect } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CameraIcon from "@mui/icons-material/Camera";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import chartsData from "../../assets/data/chartData";

const AdminDashboardHome = () => {
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalPhotographers: 0,
    totalBookings: 0,
    bookingsPerMonth: [],
    userRoles: [],
  });

  useEffect(() => {
    setSummary(chartsData);
  }, []);

  const COLORS = ["#1565C0", "#2E7D32", "#F57C00"];

  return (
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              padding: 3,
              textAlign: "center",
              backgroundColor: "#E3F2FD",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <PeopleIcon sx={{ fontSize: 80, color: "#1565C0" }} />
            <Box>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4" fontWeight="bold">
                {summary?.totalUsers}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              padding: 3,
              textAlign: "center",
              backgroundColor: "#E8F5E9",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <CameraIcon sx={{ fontSize: 80, color: "#2E7D32" }} />
            <Box>
              <Typography variant="h6">Total Photogs</Typography>
              <Typography variant="h4" fontWeight="bold">
                {summary?.totalPhotographers}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper
            sx={{
              padding: 3,
              textAlign: "center",
              backgroundColor: "#FFF3E0",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <EventAvailableIcon sx={{ fontSize: 80, color: "#F57C00" }} />
            <Box>
              <Typography variant="h6">Total Bookings</Typography>
              <Typography variant="h4" fontWeight="bold">
                {summary?.totalBookings}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 1 }}>
            <Typography variant="h6" textAlign="center" marginBottom={2}>
              Bookings Per Month
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={summary?.bookingsPerMonth}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#1565C0" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 1 }}>
            <Typography variant="h6" textAlign="center">
              User Roles Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={265}>
              <PieChart>
                <Pie
                  data={summary?.userRoles}
                  dataKey="count"
                  nameKey="role"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {summary?.userRoles?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboardHome;
