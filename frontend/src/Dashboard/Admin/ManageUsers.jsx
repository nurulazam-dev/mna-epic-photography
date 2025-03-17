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
} from "@mui/material";
import { formatDate } from "../../utils/formatDate";
import { GppBad, VerifiedUser } from "@mui/icons-material";
import { BASE_URL } from "../../../config";
import useUsers from "../../hooks/useFetchData";
import Error from "../../components/Shared/Error";
import { useState } from "react";
import UpdateUserModal from "./UpdateModal/UpdateUserModal";
import DeleteUserModal from "./UpdateModal/DeleteUserModel";

const ManageUsers = () => {
  const { data: users, loading, error } = useUsers(`${BASE_URL}/users`);

  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const handleOpenUpdateModal = (user) => {
    setSelectedUser(user);
  };

  const handleCloseUpdateModal = () => {
    setSelectedUser(null);
  };

  const handleOpenDeleteModal = (user) => {
    setDeleteUser(user);
  };

  const handleCloseDeleteModal = () => {
    setDeleteUser(null);
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
        Manage Users ({users?.length})
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f3f3f3" }}>
              <TableCell align="center">Client</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">V. Status</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Gender</TableCell>
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
                            </Box>
                          )}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {user?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align="center" sx={{ textTransform: "uppercase" }}>
                    {user?.role}
                  </TableCell>
                  <TableCell align="center">
                    {user?.isVerified ? "Verified" : "Not Verify"}
                  </TableCell>
                  <TableCell align="center">{user?.phone}</TableCell>
                  <TableCell align="center">{user?.gender}</TableCell>
                  <TableCell align="center">
                    {formatDate(user?.createdAt)}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "6px" }}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{ marginRight: "6px" }}
                      onClick={() => handleOpenUpdateModal(user)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleOpenDeleteModal(user)}
                    >
                      Delete
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
      {selectedUser && (
        <UpdateUserModal user={selectedUser} onClose={handleCloseUpdateModal} />
      )}

      {/* Delete User Modal */}
      {deleteUser && (
        <DeleteUserModal user={deleteUser} onClose={handleCloseDeleteModal} />
      )}
    </Box>
  );
};

export default ManageUsers;
