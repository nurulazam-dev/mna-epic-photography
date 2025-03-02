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

const Bookings = ({ bookings }) => {
  console.log(bookings);

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          backgroundColor: "green",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
          py: 2,
          fontFamily: "serif",
        }}
      >
        Bookings
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f3f3f3" }}>
              <TableCell align="center">Client</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Verified</TableCell>
              <TableCell align="center">Payment</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Booked on</TableCell>
              <TableCell align="center">Program</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {bookings?.map((item) => (
              <TableRow key={item?._id} hover>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={item?.user?.photo} alt={item?.user?.name} />
                    <Box>
                      <Typography fontWeight="bold">
                        {item?.user?.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item?.user?.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell align="center">{item?.user?.phone}</TableCell>

                <TableCell align="center">
                  {item?.isPaid ? (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="green"
                    >
                      <CheckCircleIcon sx={{ mr: 1 }} /> Paid
                    </Box>
                  ) : (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="red"
                    >
                      <CancelIcon sx={{ mr: 1 }} /> Unpaid
                    </Box>
                  )}
                </TableCell>
                <TableCell align="center">
                  {item?.isPaid ? (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="green"
                    >
                      <CheckCircleIcon sx={{ mr: 1 }} /> Paid
                    </Box>
                  ) : (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="red"
                    >
                      <CancelIcon sx={{ mr: 1 }} /> Unpaid
                    </Box>
                  )}
                </TableCell>

                <TableCell align="center">{item?.status}</TableCell>
                <TableCell align="center">${item?.servicePrice}</TableCell>

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

      {bookings?.length === 0 && (
        <Typography
          variant="h6"
          color="error"
          sx={{ textAlign: "center", mt: 2, animation: "pulse 1s infinite" }}
        >
          No bookings available.
        </Typography>
      )}
    </Box>
  );
};

export default Bookings;
