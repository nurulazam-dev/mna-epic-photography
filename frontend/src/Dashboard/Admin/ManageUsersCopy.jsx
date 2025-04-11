import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { VerifiedUser, GppBad } from "@mui/icons-material";
import { formatDate } from "../../utils/formatDate";
import { BASE_URL } from "../../../config";
import useUsers from "../../hooks/useFetchData";
import Error from "../../components/Shared/Error";
import { useState } from "react";
import UpdateUserModal from "./UpdateModal/UpdateUserModal";
import DeleteUserModal from "./UpdateModal/DeleteUserModel";
import { getShortEmail } from "../../utils/getShortEmail";
import PaginationComponent from "../../components/Shared/PaginationComponent";
import Loading from "../../components/Shared/Loading";

const ManageUsers = () => {
  const { data: users, loading, error } = useUsers(`${BASE_URL}/users`);

  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterVerification, setFilterVerification] = useState("all");
  const [filterGender, setFilterGender] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      user.phone?.toLowerCase().includes(searchText.toLowerCase());

    const matchesRole = filterRole === "all" || user.role === filterRole;

    const matchesVerification =
      filterVerification === "all" ||
      (filterVerification === "verified" && user.isVerified) ||
      (filterVerification === "notVerified" && !user.isVerified);

    const matchesGender =
      filterGender === "all" || user.gender?.toLowerCase() === filterGender;

    return matchesSearch && matchesRole && matchesVerification && matchesGender;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
        Manage Users ({users?.length || 0})
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        my={2}
      >
        <TextField
          label="Search (Name, Email, Phone)"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ flex: 1 }}
        />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={filterRole}
            label="Role"
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Verification</InputLabel>
          <Select
            value={filterVerification}
            label="Verification"
            onChange={(e) => setFilterVerification(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="verified">Verified</MenuItem>
            <MenuItem value="notVerified">Not Verified</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Gender</InputLabel>
          <Select
            value={filterGender}
            label="Gender"
            onChange={(e) => setFilterGender(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <Box
          size="small"
          sx={{
            minWidth: 120,
            textAlign: "center",
            border: 1,
            borderRadius: 1,
            borderColor: "red",
          }}
        >
          <Typography
            sx={{
              color: "red",
              fontSize: "13px",
              py: 1,
            }}
          >
            Search Result :{" "}
            <span
              style={{
                color: "green",
                fontWeight: "bold",
              }}
            >
              {filteredUsers?.length}
            </span>
          </Typography>
        </Box>
      </Box>

      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {/*  {!loading && !error && (
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
  
              <TableBody>
                {paginatedUsers?.map((user) => (
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
                            {getShortEmail(user?.email)}
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
            </Table>
          </TableContainer>
        )} */}

      {!loading && !error && (
        <>
          {/* Table view for medium to large screens */}
          <TableContainer
            component={Paper}
            sx={{ display: { xs: "none", md: "block" } }}
          >
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

              <TableBody>
                {paginatedUsers?.map((user) => (
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
                              <VerifiedUser
                                sx={{ fontSize: 16, color: "green", ml: 0.5 }}
                              />
                            ) : (
                              <GppBad
                                sx={{ fontSize: 16, color: "red", ml: 0.5 }}
                              />
                            )}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {getShortEmail(user?.email)}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{ textTransform: "capitalize" }}
                    >
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
                        sx={{ mr: 1 }}
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
            </Table>
          </TableContainer>

          {/* Card view for small screens */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "column",
              gap: 2,
              mt: 2,
            }}
          >
            {/* {paginatedUsers?.map((user) => ( */}
            {filteredUsers?.map((user) => (
              <Paper key={user?._id} elevation={3} sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <Avatar src={user?.photo} alt={user?.name} />
                  <Box>
                    <Typography
                      fontWeight="bold"
                      display="flex"
                      alignItems="center"
                    >
                      {user?.name}
                      {user?.isVerified ? (
                        <VerifiedUser
                          sx={{ fontSize: 16, color: "green", ml: 0.5 }}
                        />
                      ) : (
                        <GppBad sx={{ fontSize: 16, color: "red", ml: 0.5 }} />
                      )}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {getShortEmail(user?.email)}
                    </Typography>
                  </Box>
                </Box>
                <Typography>
                  <strong>Role:</strong> {user?.role.toUpperCase()}
                </Typography>
                <Typography>
                  <strong>Status:</strong>{" "}
                  {user?.isVerified ? "Verified" : "Not Verify"}
                </Typography>
                <Typography>
                  <strong>Phone:</strong> {user?.phone}
                </Typography>
                <Typography>
                  <strong>Gender:</strong> {user?.gender}
                </Typography>
                <Typography>
                  <strong>Registered:</strong> {formatDate(user?.createdAt)}
                </Typography>

                <Box mt={1}>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ mr: 1 }}
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
                </Box>
              </Paper>
            ))}
          </Box>
        </>
      )}

      {/* {users?.length > itemsPerPage && (
          <PaginationComponent
            totalItems={users?.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )} */}

      {filteredUsers?.length === 0 && (
        <Typography
          variant="body1"
          color="error"
          sx={{ textAlign: "center", mt: 1, animation: "pulse 1s infinite" }}
        >
          No users available.
        </Typography>
      )}

      <Box my={1} display="flex" justifyContent="center">
        <PaginationComponent
          currentPage={currentPage}
          totalItems={filteredUsers?.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Box>

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
