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
  Button,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { formatDate } from "../../utils/formatDate";
import { GppBad, VerifiedUser } from "@mui/icons-material";
import { BASE_URL } from "../../../config";
import { useState } from "react";
import UpdateBookingModal from "./UpdateModal/UpdateBookingModal";
import Error from "../../components/Shared/Error";
import useBookings from "../../hooks/useFetchData";

const ManageBookings = () => {
  const {
    data: bookings,
    loading,
    error,
  } = useBookings(`${BASE_URL}/bookings`);

  console.log("bookings: ", bookings);

  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
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
        Manage Bookings
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f3f3f3" }}>
              <TableCell align="center">Client</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Photogs</TableCell>
              <TableCell align="center">Payment</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Booked on</TableCell>
              <TableCell align="center">Program</TableCell>
            </TableRow>
          </TableHead>

          {!loading && !error && (
            <TableBody>
              {bookings?.map((booking) => (
                <TableRow key={booking?._id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar src={booking?.photo} alt={booking?.name} />
                      <Box>
                        <Typography fontWeight="bold" display="flex">
                          {booking?.user?.name}
                          {booking?.user?.isVerified === true ? (
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
                          {booking?.user?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align="center">{booking?.user?.phone}</TableCell>

                  <TableCell align="center">
                    {booking?.isPaid ? (
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

                  <TableCell align="center">{booking?.status}</TableCell>
                  <TableCell align="center">${booking?.servicePrice}</TableCell>

                  <TableCell align="center">
                    {formatDate(booking?.createdAt)}
                  </TableCell>
                  <TableCell align="center">
                    {formatDate(booking?.programDate)}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "2px" }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleOpenModal(booking)}
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

      {bookings?.length === 0 && (
        <Typography
          variant="h6"
          color="error"
          sx={{ textAlign: "center", mt: 2, animation: "pulse 1s infinite" }}
        >
          No bookings available.
        </Typography>
      )}

      {/* Update booking Modal */}
      {selectedBooking && (
        <UpdateBookingModal
          booking={selectedBooking}
          onClose={handleCloseModal}
        />
      )}
    </Box>
  );
};

export default ManageBookings;
