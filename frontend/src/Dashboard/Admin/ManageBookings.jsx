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
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { GppBad, VerifiedUser } from "@mui/icons-material";
import { BASE_URL } from "../../../config";
import { useState } from "react";
import UpdateBookingModal from "./UpdateModal/UpdateBookingModal";
import Error from "../../components/Shared/Error";
import useBookings from "../../hooks/useFetchData";
import { formatDate } from "../../utils/formatDate";
import { getShortEmail } from "../../utils/getShortEmail";
import PaginationComponent from "../../components/Shared/PaginationComponent";
import Loading from "../../components/Shared/Loading";

const ManageBookings = () => {
  const {
    data: bookings,
    loading,
    error,
  } = useBookings(`${BASE_URL}/bookings`);

  const [selectedBooking, setSelectedBooking] = useState(null);
  /* const [searchText, setSearchText] = useState("");
  const [filterPayment, setFilterPayment] = useState("all");
  const [filterBStatus, setFilterBStatus] = useState("all"); */

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = bookings?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getPhotogLastName = (fullName) => {
    const nameParts = fullName.trim().split(" ");
    return nameParts.length > 1 ? nameParts[nameParts.length - 1] : fullName;
  };

  const renderClientInfo = (booking) => (
    <Box display="flex" alignItems="center" gap={1}>
      <Avatar src={booking?.user?.photo} alt={booking?.user?.name} />
      <Box>
        <Typography variant="body2" display="flex">
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
        <Typography
          variant="caption"
          color="textSecondary"
          component="div"
          sx={{ textOverflow: "ellipsis" }}
        >
          {getShortEmail(booking?.user?.email)}
        </Typography>
      </Box>
    </Box>
  );

  const renderPhotogInfo = (booking) => (
    <Box display="flex" alignItems="center" gap={1}>
      <Avatar
        src={booking?.photographer?.photo}
        alt={booking?.photographer?.name}
      />
      <Box>
        <Typography variant="body2" display="flex">
          {getPhotogLastName(booking?.photographer?.name)}
          {booking?.photographer?.isApproved === "approved" ? (
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
        <Typography variant="caption" color="textSecondary">
          {getShortEmail(booking?.photographer?.email)}
        </Typography>
      </Box>
    </Box>
  );

  const renderBookingAction = (booking) => (
    <Button
      variant="contained"
      color="success"
      size="small"
      onClick={() => setSelectedBooking(booking)}
    >
      Update
    </Button>
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
        Manage Bookings ({bookings?.length})
      </Typography>

      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <TableContainer
          component={Paper}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f3f3f3" }}>
                <TableCell align="center">Client</TableCell>
                <TableCell align="center">Photogs</TableCell>
                <TableCell align="center">B.Status</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Payment</TableCell>
                <TableCell align="center">Booked</TableCell>
                <TableCell align="center">Program</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedBookings?.map((booking) => (
                <TableRow key={booking?._id} hover>
                  <TableCell sx={{ padding: "2px 10px" }}>
                    {renderClientInfo(booking)}
                  </TableCell>

                  <TableCell sx={{ padding: "2px 10px" }}>
                    {renderPhotogInfo(booking)}
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          booking?.status === "pending"
                            ? "orange"
                            : booking?.status === "approved"
                            ? "green"
                            : booking?.status === "completed"
                            ? "blue"
                            : "black",
                      }}
                    >
                      {booking?.status?.charAt(0).toUpperCase() +
                        booking?.status?.slice(1)}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">${booking?.servicePrice}</TableCell>
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

                  <TableCell align="center">
                    <Typography variant="body2">
                      {booking?.createdAt
                        ? formatDate(booking.createdAt)
                        : "???"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      {booking?.programDate
                        ? formatDate(booking.programDate)
                        : "???"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "2px" }}>
                    {renderBookingAction(booking)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Card View for Small Screens */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          gap: 2,
          mt: 2,
        }}
      >
        {paginatedBookings?.map((booking) => (
          <Paper key={booking?._id} elevation={3} sx={{ p: 2 }}>
            <Box marginY={1} boxShadow={1} p={1}>
              {renderClientInfo(booking)}
            </Box>
            <Box marginY={1} boxShadow={1} p={1}>
              {renderPhotogInfo(booking)}
            </Box>
            <Typography display="flex">
              <strong>B.Status:</strong>
              <Typography
                sx={{
                  pl: 1,
                  color:
                    booking?.status === "pending"
                      ? "orange"
                      : booking?.status === "approved"
                      ? "green"
                      : booking?.status === "completed"
                      ? "blue"
                      : "black",
                }}
              >
                {booking?.status?.charAt(0).toUpperCase() +
                  booking?.status?.slice(1)}
              </Typography>
            </Typography>
            <Typography>
              <strong>Price:</strong> ${booking?.servicePrice}
            </Typography>
            <Typography display="flex" alignItems="center">
              <strong>Payment:</strong>{" "}
              {booking?.isPaid ? (
                <Box
                  paddingLeft={1}
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
            </Typography>
            <Typography>
              <strong>Booked:</strong>{" "}
              {booking?.createdAt ? formatDate(booking.createdAt) : "???"}
            </Typography>
            <Typography>
              <strong>Program:</strong>{" "}
              {booking?.programDate ? formatDate(booking.programDate) : "???"}
            </Typography>
            <Box mt={1}>{renderBookingAction(booking)}</Box>
          </Paper>
        ))}
      </Box>

      {bookings?.length > itemsPerPage && (
        <PaginationComponent
          totalItems={bookings?.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}

      {bookings?.length === 0 && (
        <Typography
          variant="h6"
          color="error"
          sx={{ textAlign: "center", mt: 2, animation: "pulse 1s infinite" }}
        >
          No bookings available.
        </Typography>
      )}

      {/* =======================
          Update booking Modal
      ======================= */}
      {selectedBooking && (
        <UpdateBookingModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </Box>
  );
};

export default ManageBookings;
