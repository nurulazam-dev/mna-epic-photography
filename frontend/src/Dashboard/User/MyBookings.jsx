import { BASE_URL } from "../../../config";
import Error from "../../components/Shared/Error";
import useFetchData from "../../hooks/useFetchData";
import { formatDate } from "../../utils/formatDate";
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
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const MyBookings = () => {
  const {
    data: bookings,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/booking/my-bookings`);

  console.log(bookings);

  return (
    <Box mt={2}>
      <Typography
        variant="h4"
        align="center"
        fontFamily="serif"
        fontWeight="bold"
        color="black"
        mb={2}
      >
        My Bookings
      </Typography>

      {loading && !error && (
        <Box mt={10} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
      {error && !loading && <Error errMessage={error} />}
      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
                <TableCell align="center">Photographer</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Expertise</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Payment</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Booked on</TableCell>
                {/* <TableCell align="center">Program</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings?.map((booking) => (
                <TableRow key={booking._id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={booking?.photo}
                        alt={booking?.name}
                        sx={{ width: 40, height: 40, mr: 1 }}
                      />
                      <Box>
                        <Typography fontWeight="bold">
                          {booking?.name}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {booking?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="body2">
                      {booking?.phone}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{booking?.expertise}</TableCell>
                  {/* <TableCell align="center">{booking?.status}</TableCell> */}
                  <TableCell align="center">{booking?.isApproved}</TableCell>
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
                    <Typography color="textSecondary" variant="body2">
                      {formatDate(booking?.createdAt)}
                    </Typography>
                    {/* <Typography color="textSecondary" variant="body2">
                      {formatDate(booking?.programDate)}
                    </Typography> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
