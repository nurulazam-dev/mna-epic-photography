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
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { GppBad, VerifiedUser } from "@mui/icons-material";
import { BASE_URL } from "../../../config";
import usePhotogs from "../../hooks/useFetchData";
import Error from "../../components/Shared/Error";
import { useState } from "react";
import UpdatePhotogModal from "./UpdateModal/UpdatePhotogModal";
import { getShortEmail } from "../../utils/getShortEmail";
import PaginationComponent from "../../components/Shared/PaginationComponent";
import { MenuItem } from "material-ui";
import Loading from "../../components/Shared/Loading";

const ManagePhotographers = () => {
  const {
    data: photogs,
    loading,
    error,
  } = usePhotogs(`${BASE_URL}/photographers`);

  const [selectedPhotog, setSelectedPhotog] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [filterExpertise, setFilterExpertise] = useState("all");
  const [filterRStatus, setFilterRStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredPhotogs = photogs?.filter((photog) => {
    const matchesSearch = [photog?.name, photog?.email, photog?.phone].some(
      (field) => field?.toLowerCase().includes(searchText.toLowerCase())
    );

    const matchesExpertise =
      filterExpertise === "all" || photog?.expertise === filterExpertise;

    const matchesRStutus =
      filterRStatus === "all" ||
      (filterRStatus === "pending" && photog?.isApproved) ||
      (filterRStatus === "approved" && !photog?.isApproved);

    return matchesSearch && matchesExpertise && matchesRStutus;
  });

  const paginatedPhotogs = filteredPhotogs?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderPhotogInfo = (photog) => (
    <Box display="flex" alignItems="center" gap={2}>
      <Avatar src={photog?.photo} alt={photog?.name} />
      <Box>
        <Typography fontWeight="bold" display="flex" alignItems="center">
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
        <Typography variant="caption" color="textSecondary">
          {getShortEmail(photog?.email)}
        </Typography>
      </Box>
    </Box>
  );

  const renderPhotogActions = (photog) => (
    <Button
      variant="contained"
      color="success"
      size="small"
      onClick={() => setSelectedPhotog(photog)}
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
        }}
      >
        Manage Photographers ({photogs?.length || 0})
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
          onChange={(e) => setSearchText(e.target.value)}
        />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Expertise</InputLabel>
          <Select
            value={filterExpertise}
            label="Expertise"
            onChange={(e) => setFilterExpertise(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Wedding">Wedding</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
            <MenuItem value="Portrait">Portrait</MenuItem>
            <MenuItem value="Fashion">Fashion</MenuItem>
            <MenuItem value="Product">Product</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Reg. Status</InputLabel>
          <Select
            value={filterRStatus}
            label="Reg. Status"
            onChange={(e) => setFilterRStatus(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
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
              {filteredPhotogs?.length}
            </span>
          </Typography>
        </Box>
      </Box>

      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}
      {!loading && !error && (
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

            <TableBody>
              {paginatedPhotogs?.map((photog) => (
                <TableRow key={photog?._id} hover>
                  <TableCell sx={{ padding: "2px 10px" }}>
                    {renderPhotogInfo(photog)}
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
                    {renderPhotogActions(photog)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* ============================
             Card view for small screens
          ============================== */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          gap: 2,
          mt: 2,
        }}
      >
        {paginatedPhotogs?.map((photog) => (
          <Paper key={photog?._id} elevation={3} sx={{ p: 2 }}>
            {renderPhotogInfo(photog)}
            <Typography>
              <strong>Expertise:</strong> {photog?.expertise?.toUpperCase()}
            </Typography>
            <Typography>
              <strong>Status:</strong>{" "}
              {photog?.isApproved === "approved" ? "Approved" : "Pending"}
            </Typography>
            <Typography>
              <strong>Phone:</strong> {photog?.phone}
            </Typography>
            <Typography>
              <strong>Experience:</strong> {photog?.experience} years
            </Typography>
            <Typography>
              <strong>Service Price:</strong> $ {photog?.servicePrice}
            </Typography>
            <Box mt={1}>{renderPhotogActions(photog)}</Box>
          </Paper>
        ))}
      </Box>

      {filteredPhotogs?.length === 0 && (
        <Typography
          variant="body1"
          color="error"
          sx={{
            textAlign: "center",
            mt: 1,
            animation: "pulse 1s infinite",
          }}
        >
          No photographers available.
        </Typography>
      )}

      {/* ===========================
                    Pagination
          =========================== */}
      {photogs?.length > itemsPerPage && (
        <PaginationComponent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={photogs?.length || 0}
          itemsPerPage={itemsPerPage}
        />
      )}

      {/* ==============================
            Update photographer Modal
      ================================= */}
      {selectedPhotog && (
        <UpdatePhotogModal
          photographer={selectedPhotog}
          onClose={() => setSelectedPhotog(null)}
        />
      )}
    </Box>
  );
};

export default ManagePhotographers;
