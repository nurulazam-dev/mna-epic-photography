/* eslint-disable react/prop-types */
import { Modal, Box, Typography, Button, Grid } from "@mui/material";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../../../config";
import { Delete } from "@mui/icons-material";

const DeleteUserModal = ({ user, onClose }) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/${user?._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
          textAlign: "center",
        }}
      >
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={onClose}
          sx={{
            position: "absolute",
            borderRadius: 1,
            right: "2%",
            top: "2%",
          }}
        >
          ✕
        </Button>

        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "red" }}
          gutterBottom
        >
          Delete User
        </Typography>

        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete <strong>{user?.name}</strong>?
        </Typography>

        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              startIcon={<Delete />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default DeleteUserModal;
