/* eslint-disable react/prop-types */
import { Box, Pagination } from "@mui/material";

const PaginationComponent = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => onPageChange(value)}
        color="primary"
        shape="rounded"
        variant="outlined"
        size="medium"
      />
    </Box>
  );
};

export default PaginationComponent;
