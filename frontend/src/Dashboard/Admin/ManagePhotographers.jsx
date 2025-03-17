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
  CircularProgress,
  Button,
} from "@mui/material";
import { GppBad, VerifiedUser } from "@mui/icons-material";
import { BASE_URL } from "../../../config";
import usePhotogs from "../../hooks/useFetchData";
import Error from "../../components/Shared/Error";
import { useState } from "react";
import UpdatePhotogModal from "./UpdateModal/UpdatePhotogModal";

const ManagePhotographers = () => {
  const {
    data: photogs,
    loading,
    error,
  } = usePhotogs(`${BASE_URL}/photographers`);

  const [selectedPhotog, setSelectedPhotog] = useState(null);

  const handleOpenModal = (photographer) => {
    setSelectedPhotog(photographer);
  };

  const handleCloseModal = () => {
    setSelectedPhotog(null);
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
        Manage Photographers ({photogs?.length})
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f3f3f3" }}>
              <TableCell align="center">Photographer</TableCell>
              <TableCell align="center">Expertise</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Experience</TableCell>
              <TableCell align="center">Reg.Status</TableCell>
              <TableCell align="center">S.Price</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          {!loading && !error && (
            <TableBody>
              {photogs?.map((photog) => (
                <TableRow key={photog?._id} hover>
                  <TableCell sx={{ padding: "2px 10px" }}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar src={photog?.photo} alt={photog?.name} />
                      <Box>
                        <Typography
                          fontWeight="bold"
                          display="flex"
                          alignItems="center"
                        >
                          {photog?.name}
                          {photog?.isApproved == "approved" ? (
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
                        <Typography variant="body2" color="textSecondary">
                          {photog?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align="center">{photog?.expertise}</TableCell>
                  <TableCell align="center">{photog?.phone}</TableCell>
                  <TableCell align="center">
                    {photog?.experience} years
                  </TableCell>
                  <TableCell align="center">
                    {photog?.isApproved == "approved" ? (
                      <Typography variant="body2" sx={{ color: "green" }}>
                        Approved
                      </Typography>
                    ) : (
                      <Typography variant="body2" sx={{ color: "red" }}>
                        Pending
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">$ {photog?.servicePrice}</TableCell>

                  <TableCell align="center" sx={{ padding: "2px" }}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleOpenModal(photog)}
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

      {photogs?.length === 0 && (
        <Typography
          variant="h6"
          color="error"
          sx={{ textAlign: "center", mt: 2, animation: "pulse 1s infinite" }}
        >
          No photogs available.
        </Typography>
      )}

      {/* Update photographer Modal */}
      {selectedPhotog && (
        <UpdatePhotogModal
          photographer={selectedPhotog}
          onClose={handleCloseModal}
        />
      )}
    </Box>
  );
};

export default ManagePhotographers;
