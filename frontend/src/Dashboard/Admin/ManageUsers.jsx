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
  Pagination,
} from "@mui/material";
import { VerifiedUser, GppBad } from "@mui/icons-material";
import { useState } from "react";

import useUsers from "../../hooks/useFetchData";
import { formatDate } from "../../utils/formatDate";
import { getShortEmail } from "../../utils/getShortEmail";
import { BASE_URL } from "../../../config";

import Loading from "../../components/Shared/Loading";
import Error from "../../components/Shared/Error";
import UpdateUserModal from "./UpdateModal/UpdateUserModal";
import DeleteUserModal from "./UpdateModal/DeleteUserModel";

const ManageUsers = () => {
  const { data: users, loading, error } = useUsers(`${BASE_URL}/users`);

  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterVerification, setFilterVerification] = useState("all");
  const [filterGender, setFilterGender] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users?.filter((user) => {
    const matchesSearch = [user.name, user.email, user.phone].some((field) =>
      field?.toLowerCase().includes(searchText.toLowerCase())
    );

    const matchesRole = filterRole === "all" || user.role === filterRole;

    const matchesVerification =
      filterVerification === "all" ||
      (filterVerification === "verified" && user.isVerified) ||
      (filterVerification === "notVerified" && !user.isVerified);
    const matchesGender =
      filterGender === "all" || user.gender?.toLowerCase() === filterGender;

    return matchesSearch && matchesRole && matchesVerification && matchesGender;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredUsers?.length / itemsPerPage);
  const paginatedUsers = filteredUsers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const renderUserInfo = (user) => (
    <>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar src={user?.photo} alt={user?.name} />
        <Box>
          <Typography fontWeight="bold" display="flex" alignItems="center">
            {user?.name}
            {user?.isVerified ? (
              <VerifiedUser sx={{ fontSize: 16, color: "green", ml: 0.5 }} />
            ) : (
              <GppBad sx={{ fontSize: 16, color: "red", ml: 0.5 }} />
            )}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {getShortEmail(user?.email)}
          </Typography>
        </Box>
      </Box>
    </>
  );

  const renderUserActions = (user) => (
    <>
      <Button
        variant="contained"
        color="success"
        size="small"
        sx={{ mr: 1 }}
        onClick={() => setSelectedUser(user)}
      >
        Update
      </Button>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={() => setDeleteUser(user)}
      >
        Delete
      </Button>
    </>
  );

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
          fontSize: {
            xs: "1.2rem",
            sm: "1.5rem",
            md: "2.1rem",
          },
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
          sx={{ flex: 1 }}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
        />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={filterRole}
            label="Role"
            onChange={(e) => {
              setFilterRole(e.target.value);
              setCurrentPage(1);
            }}
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
            onChange={(e) => {
              setFilterVerification(e.target.value);
              setCurrentPage(1);
            }}
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
            onChange={(e) => {
              setFilterGender(e.target.value);
              setCurrentPage(1);
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        <Box
          sx={{
            border: 1,
            borderRadius: 1,
            borderColor: "red",
            px: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "red", fontSize: "13px" }}>
            Search Result:{" "}
            <span style={{ color: "green", fontWeight: "bold" }}>
              {filteredUsers?.length}
            </span>
          </Typography>
        </Box>
      </Box>

      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {/* =========================
          Table view for Desktop
      =========================== */}
      {!loading && !error && (
        <>
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
                  <TableRow key={user._id} hover>
                    <TableCell sx={{ padding: "2px 10px" }}>
                      {renderUserInfo(user)}
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
                      {renderUserActions(user)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ============================
             Card view for small screens
          ============================== */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "column",
              gap: 2,
              mt: 2,
            }}
          >
            {paginatedUsers?.map((user) => (
              <Paper key={user?._id} elevation={3} sx={{ p: 2 }}>
                {renderUserInfo(user)}
                <Typography>
                  <strong>Role:</strong> {user?.role?.toUpperCase()}
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
                <Box mt={1}>{renderUserActions(user)}</Box>
              </Paper>
            ))}
          </Box>

          {paginatedUsers?.length === 0 && (
            <Typography
              variant="body1"
              color="error"
              sx={{
                textAlign: "center",
                mt: 1,
                animation: "pulse 1s infinite",
              }}
            >
              No user available.
            </Typography>
          )}

          {/* ===============
               pagination
          ================ */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                variant="outlined"
                size="medium"
              />
            </Box>
          )}
        </>
      )}

      {/* Modals */}
      {selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      {deleteUser && (
        <DeleteUserModal
          user={deleteUser}
          onClose={() => setDeleteUser(null)}
        />
      )}
    </Box>
  );
};

export default ManageUsers;
