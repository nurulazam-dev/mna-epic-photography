import { BASE_URL } from "../../../config";
import Error from "../../components/Shared/Error";
import useFetchData from "../../hooks/useFetchData";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { GppBad, VerifiedUser } from "@mui/icons-material";
import { getShortEmail } from "../../utils/getShortEmail";
import { useState } from "react";
import PaginationComponent from "../../components/Shared/PaginationComponent";
import Loading from "../../components/Shared/Loading";

const MyBookings = () => {
  const {
    data: bookings,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/booking/my-bookings`);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = bookings?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Box mt={1}>
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
        My Bookings ({bookings?.length})
      </Typography>

      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
                <TableCell align="center">Photographer</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Expertise</TableCell>
                <TableCell align="center">B.Status</TableCell>
                <TableCell align="center">Payment</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Booked</TableCell>
                <TableCell align="center">Program</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedBookings?.map((booking) => (
                <TableRow key={booking._id} hover>
                  <TableCell sx={{ padding: "2px 10px" }}>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={booking?.photographer?.photo}
                        alt={booking?.photographer?.name}
                        sx={{ width: 40, height: 40, mr: 1 }}
                      />
                      <Box>
                        <Typography
                          variant="body2"
                          display="flex"
                          alignItems="center"
                        >
                          {booking?.photographer?.name}
                          {booking?.photographer?.isApproved == "approved" ? (
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
                        <Typography variant="caption" color="textSecondary">
                          {getShortEmail(booking?.photographer?.email)}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="body2">
                      {booking?.photographer?.phone}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {booking?.photographer?.expertise}
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
                  <TableCell align="center">${booking?.servicePrice}</TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      {booking?.createdAt
                        ? new Date(booking.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            }
                          )
                        : "???"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      {booking?.programDate
                        ? new Date(booking.programDate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            }
                          )
                        : "???"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {bookings?.length > itemsPerPage && (
        <PaginationComponent
          totalItems={bookings?.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}

      {!loading && !error && bookings.length === 0 && (
        <Typography
          mt={5}
          align="center"
          color="red"
          variant="h6"
          sx={{ animation: "pulse 1s infinite" }}
        >
          You did not book any photographer.
        </Typography>
      )}
    </Box>
  );
};

export default MyBookings;
