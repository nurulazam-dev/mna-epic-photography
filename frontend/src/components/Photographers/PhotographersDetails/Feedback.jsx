/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Typography, Button, Avatar, Stack, Rating } from "@mui/material";
import { formatDate } from "../../../utils/formatDate";
import FeedbackForm from "./FeedbackForm";

const Feedback = ({ reviews, totalRating }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <Box sx={{ mb: 7 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        color="primary"
        sx={{
          fontSize: {
            xs: "1.25rem",
            sm: "1.75rem",
            md: "2.15rem",
          },
          mb: 3,
        }}
      >
        All reviews ({totalRating})
      </Typography>

      {reviews?.map((review, index) => (
        <Stack
          key={index}
          sx={{
            mb: 2,
            border: 1,
            borderColor: "secondary.main",
            p: 1,
            borderRadius: 1,
          }}
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Avatar src={review?.user?.photo} alt={review?.user?.name} />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">
              {review?.user?.name}
            </Typography>
            <Rating value={review?.rating} precision={1} readOnly />
            <Typography variant="body2">{review?.reviewText}</Typography>
            <Typography variant="body2" color="textSecondary">
              {formatDate(review?.createdAt)}
            </Typography>
          </Box>
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
