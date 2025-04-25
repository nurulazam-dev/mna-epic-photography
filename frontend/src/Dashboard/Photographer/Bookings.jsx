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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { formatDate } from "../../utils/formatDate";
import { GppBad, VerifiedUser } from "@mui/icons-material";
import { getShortEmail } from "../../utils/getShortEmail";
import { useState } from "react";
import { BASE_URL } from "../../../config";
import Loading from "../../components/Shared/Loading";
import useGetProfile from "../../hooks/useFetchData";
import Error from "../../components/Shared/Error";

const Bookings = () => {
  const {
    data: photogData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/photographers/profile/me`);

  const bookings = photogData?.bookings || [];

  const [searchText, setSearchText] = useState("");
  const [filterPaymentStatus, setFilterPaymentStatus] = useState("all");
  const [filterBStatus, setFilterBStatus] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const filteredBookings = bookings?.filter((booking) => {
    const matchesSearch = [
      booking?.user?.name,
      booking?.user?.email,
      booking?.user?.phone,
    ].some((field) => field?.toLowerCase().includes(searchText.toLowerCase()));

    const matchesPaymentStatus =
      filterPaymentStatus === "all"
        ? true
        : filterPaymentStatus === "true"
        ? booking?.isPaid === true
        : booking?.isPaid === false;

    const matchesBStutus =
      filterBStatus === "all" || booking?.status === filterBStatus;

    return matchesSearch && matchesPaymentStatus && matchesBStutus;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredBookings?.length / itemsPerPage);
  const paginatedBookings = filteredBookings?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const renderClientInfo = (booking) => (
    <Box display="flex" alignItems="center" gap={1}>
      <Avatar src={booking?.user?.photo} alt={booking?.user?.name} />
      <Box>
        <Typography variant="body2" fontWeight="bold" display="flex">
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

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          backgroundColor: "green",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
          py: 1,
          fontFamily: "serif",
          fontSize: {
            xs: "1.2rem",
            sm: "1.5rem",
            md: "2.1rem",
          },
        }}
      >
        Bookings ({bookings?.length})
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
          <InputLabel>Booking Status</InputLabel>
          <Select
            value={filterBStatus}
            label="Booking Status"
            onChange={(e) => {
              setFilterBStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Payment Status</InputLabel>
          <Select
            value={filterPaymentStatus}
            label="Payment Status"
            onChange={(e) => {
              setFilterPaymentStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="false">Unpaid</MenuItem>
            <MenuItem value="true">Paid</MenuItem>
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
              {filteredBookings?.length}
            </span>
          </Typography>
        </Box>
      </Box>

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
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Payment</TableCell>
                <TableCell align="center">B.Status</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Booked on</TableCell>
                <TableCell align="center">Program</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedBookings?.map((booking) => (
                <TableRow key={booking?._id} hover>
                  <TableCell sx={{ padding: "2px 10px" }}>
                    {renderClientInfo(booking)}
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
                    $ {booking?.servicePrice}
                  </TableCell>

                  <TableCell align="center">
                    {formatDate(booking?.createdAt)}
                  </TableCell>
                  <TableCell align="center">
                    {formatDate(booking?.programDate)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* ===============================
           Card View for Small Screens
      =================================== */}
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
            <Box
              marginY={1}
              boxShadow={1}
              p={1}
              display="flex"
              justifyContent="center"
            >
              {renderClientInfo(booking)}
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
          </Paper>
        ))}
      </Box>

      {/* ===========
          pagination
      ============= */}
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

      {paginatedBookings?.length === 0 && (
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
