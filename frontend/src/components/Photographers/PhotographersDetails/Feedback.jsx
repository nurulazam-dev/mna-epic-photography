/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Typography, Button, Avatar, Stack, Rating } from "@mui/material";
import { formatDate } from "../../../utils/formatDate";
import FeedbackForm from "./FeedbackForm";

const Feedback = ({ reviews, totalRating }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <Box sx={{ mb: 7 }}>
      <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mb: 3 }}>
        All reviews ({totalRating})
      </Typography>

      {reviews?.map((review, index) => (
        <Stack
          key={index}
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={review?.user?.photo} alt={review?.user?.name} />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
                {review?.user?.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {formatDate(review?.createdAt)}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1.5 }}>
                {review?.reviewText}
              </Typography>
            </Box>
          </Stack>

          {/* Star Rating */}
          <Rating value={review?.rating} precision={1} readOnly />
        </Stack>
      ))}

      {/* Give Feedback Button */}
      {!showFeedbackForm ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowFeedbackForm(true)}
        >
          Give Feedback
        </Button>
      ) : (
        <FeedbackForm />
      )}
    </Box>
  );
};

export default Feedback;
