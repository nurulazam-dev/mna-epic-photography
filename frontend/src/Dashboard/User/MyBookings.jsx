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

const MyBookings = () => {
  const {
    data: bookings,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/booking/my-bookings`);

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
                <TableCell align="center">Expertise</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Payment</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Booked on</TableCell>
                <TableCell align="center">Program</TableCell>
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
                  <TableCell align="center">{booking?.expertise}</TableCell>
                  <TableCell align="center">{booking?.phone}</TableCell>
                  <TableCell align="center">
                    {booking?.isPaid ? (
                      <Typography color="green">Paid</Typography>
                    ) : (
                      <Typography color="red">Unpaid</Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">${booking?.servicePrice}</TableCell>
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
