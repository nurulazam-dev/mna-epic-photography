/* eslint-disable react/prop-types */
import { Box, TextField } from "@mui/material";

const PriceRangeSlider = ({ servicePriceRange, setServicePriceRange }) => {
  const handleInputChange = (index, value) => {
    const newRange = [...servicePriceRange];
    newRange[index] = value === "" ? "" : Number(value);
    setServicePriceRange(newRange);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      size="small"
      maxWidth={{ xs: "full", md: 220 }}
    >
      <Box display="flex" gap={2}>
        <TextField
          label="Min Price"
          type="number"
          value={servicePriceRange[0]}
          onChange={(e) => handleInputChange(0, e.target.value)}
          size="small"
          fullWidth
        />
        <TextField
          label="Max Price"
          type="number"
          value={servicePriceRange[1]}
          onChange={(e) => handleInputChange(1, e.target.value)}
          size="small"
          fullWidth
        />
      </Box>
    </Box>
  );
};

export default PriceRangeSlider;
