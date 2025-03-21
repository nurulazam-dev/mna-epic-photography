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
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { GppBad, VerifiedUser } from "@mui/icons-material";

const MyBookings = () => {
  const {
    data: bookings,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/booking/my-bookings`);

  const getShortEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    const [domainName, domainExt] = domain.split(".");

    const shortDomain =
      domainName.length > 2 ? `${domainName.slice(0, 2)}...` : domainName;

    return `${name}@${shortDomain}.${domainExt}`;
  };

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
                <TableCell align="center">Booked</TableCell>
                <TableCell align="center">Program</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings?.map((booking) => (
                <TableRow key={booking._id} hover>
                  <TableCell>
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
                  <TableCell align="center">{booking?.status}</TableCell>
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
