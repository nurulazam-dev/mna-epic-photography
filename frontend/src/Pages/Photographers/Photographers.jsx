import { useEffect, useState } from "react";
import Error from "../../components/Shared/Error";
import { BASE_URL } from "../../../config";
import useFetchData from "../../hooks/useFetchData";
import PhotographerCard from "../../components/Photographers/PhotographerCard";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import Loading from "../../components/Shared/Loading";

const Photographers = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  const handleSearch = () => {
    setQuery(query.trim());
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeOut);
  }, [query]);

  const {
    data: photographers,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/photographers?query=${debounceQuery}`);

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ mt: 3, fontWeight: 700 }}>
        Search a Photographer
      </Typography>

      <Container maxWidth="sm" sx={{ mt: 2, display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Photographer's name or expertise"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ px: 3 }}
        >
          Search
        </Button>
      </Container>

      <Box sx={{ my: 4 }}>
        {loading && <Loading />}
        {error && <Error />}
        {!loading && !error && (
          <Grid container spacing={3}>
            {photographers.map((photographer) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={photographer?._id}>
                <PhotographerCard photographer={photographer} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Photographers;
