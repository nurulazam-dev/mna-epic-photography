/* eslint-disable react/prop-types */
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
  // Container,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { formatDate } from "../../utils/formatDate";
import { GppBad, VerifiedUser } from "@mui/icons-material";

const ManageUsers = ({ users }) => {
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
        Manage Users
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f3f3f3" }}>
              <TableCell align="center">Client</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Update Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users?.map((item) => (
              <TableRow key={item?._id} hover>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={item?.user?.photo} alt={item?.user?.name} />
                    <Box>
                      <Typography fontWeight="bold" display="flex">
                        {item?.user?.name}
                        {item?.user?.isVerified === true ? (
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
                        {item?.user?.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell align="center">{item?.user?.phone}</TableCell>

                <TableCell align="center">
                  {item?.isVerified ? (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="green"
                    >
                      <CheckCircleIcon sx={{ mr: 1 }} /> Verified
                    </Box>
                  ) : (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="red"
                    >
                      <CancelIcon sx={{ mr: 1 }} /> Not Verified
                    </Box>
                  )}
                </TableCell>

                <TableCell align="center">{item?.status}</TableCell>

                <TableCell align="center">
                  {formatDate(item?.createdAt)}
                </TableCell>
                <TableCell align="center">
                  {formatDate(item?.programDate)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
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
    </Box>
  );
};

export default ManageUsers;
