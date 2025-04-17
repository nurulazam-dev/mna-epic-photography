/* eslint-disable react/prop-types */
import { Box, Slider, Typography } from "@mui/material";

const PriceRangeSlider = ({ servicePriceRange, setServicePriceRange }) => {
  const handleChange = (event, newValue) => {
    setServicePriceRange(newValue);
  };

  return (
    <Box display="flex" alignItems="center" gap={2} width="100%" maxWidth={260}>
      <Typography>${servicePriceRange[0]}</Typography>
      <Slider
        value={servicePriceRange}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
        sx={{ flexGrow: 1 }}
      />
      <Typography>${servicePriceRange[1]}</Typography>
    </Box>
  );
};

export default PriceRangeSlider;
