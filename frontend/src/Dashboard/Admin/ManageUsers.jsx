import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
  Box,
  CircularProgress,
  Button,
  DialogActions,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { formatDate } from "../../utils/formatDate";
import { GppBad, VerifiedUser } from "@mui/icons-material";
import { BASE_URL } from "../../../config";
import useUsers from "../../hooks/useFetchData";
import Error from "../../components/Shared/Error";
import { toast } from "react-toastify";
import { useState } from "react";

const ManageUsers = () => {
  const { data: users, loading, error } = useUsers(`${BASE_URL}/users`);

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
  });

  const handleOpen = (user) => {
    setSelectedUser(user);
    setUpdatedUser({
      name: user?.name || "",
      role: user?.role || "",
      phone: user?.phone || "",
      email: user?.email || "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/users/${selectedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }

      toast.success(message);
      handleClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box>
      {loading && !error && (
        <CircularProgress sx={{ display: "block", mx: "auto" }} />
      )}

      {error && !loading && <Error errMessage={error} />}

      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          backgroundColor: "#2E7D32",
          color: "white",
          py: 1,
          fontFamily: "serif",
          borderRadius: 1,
        }}
      >
        Manage Users
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f3f3f3" }}>
              <TableCell align="center">Client</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Registered</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          {!loading && !error && (
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user?._id} hover>
                  <TableCell sx={{ padding: "2px 10px" }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar src={user?.photo} alt={user?.name} />
                      <Box>
                        <Typography
                          fontWeight="bold"
                          display="flex"
                          alignItems="center"
                        >
                          {user?.name}
                          {user?.isVerified ? (
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              color="green"
                              height={16}
                              width={16}
                              sx={{ marginLeft: "3px" }}
                            >
                              <VerifiedUser fontSize="10px" />
                              {/* <CheckCircleIcon fontSize="10px" /> */}
                            </Box>
                          ) : (
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              color="red"
                              height={16}
                              width={16}
                              sx={{ marginLeft: "3px" }}
                            >
                              <GppBad fontSize="10px" />
                              {/* <CancelIcon fontSize="10px" /> */}
                            </Box>
                          )}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {user?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align="center">{user?.role}</TableCell>
                  <TableCell align="center">{user?.phone}</TableCell>
                  <TableCell align="center">
                    {formatDate(user?.createdAt)}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "2px" }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleOpen(user)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {users?.length === 0 && (
        <Typography
          variant="h6"
          color="error"
          sx={{ textAlign: "center", mt: 2, animation: "pulse 1s infinite" }}
        >
          No users available.
        </Typography>
      )}

      {/* Update User Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={updatedUser.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Role"
            name="role"
            fullWidth
            value={updatedUser.role}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Phone"
            name="phone"
            fullWidth
            value={updatedUser.phone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={updatedUser.email}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageUsers;
