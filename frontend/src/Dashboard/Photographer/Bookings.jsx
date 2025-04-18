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
import { getShortEmail } from "../../utils/getShortEmail";
import PaginationComponent from "../../components/Shared/PaginationComponent";
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = bookings?.slice(
    startIndex,
    startIndex + itemsPerPage
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

      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <TableContainer component={Paper}>
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
              {paginatedBookings?.map((item) => (
                <TableRow key={item?._id} hover>
                  <TableCell sx={{ padding: "2px 10px" }}>
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
                          {getShortEmail(item?.user?.email)}
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
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          item?.status === "pending"
                            ? "orange"
                            : item?.status === "approved"
                            ? "green"
                            : item?.status === "completed"
                            ? "blue"
                            : "black",
                      }}
                    >
                      {item?.status?.charAt(0).toUpperCase() +
                        item?.status?.slice(1)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">$ {item?.servicePrice}</TableCell>

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
      )}
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
    </Box>
  );
};

export default Bookings;
