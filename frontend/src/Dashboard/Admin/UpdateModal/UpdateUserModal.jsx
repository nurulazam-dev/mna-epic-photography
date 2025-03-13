/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../../config";

const UpdateUserModal = ({ user, onClose }) => {
  const [updatedUser, setUpdatedUser] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  });

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
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
      onClose();
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal open={!!user} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Update User
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Avatar
            src={user.photo}
            alt={user.name}
            sx={{ width: 56, height: 56 }}
          />
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={updatedUser.name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            value={updatedUser.email}
            onChange={handleChange}
            disabled
          />
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            value={updatedUser.phone}
            onChange={handleChange}
          />
          <TextField
            label="Role"
            name="role"
            fullWidth
            value={updatedUser.role}
            onChange={handleChange}
          />
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateUserModal;
