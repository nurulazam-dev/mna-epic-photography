import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../../../config";
import Loading from "../../Shared/Loading";
import { Box, Typography, Button, TextField, Rating } from "@mui/material";

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!rating || !reviewText)
      return toast.error("Rating & Review are required");

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/photographers/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, reviewText }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      setRating(0);
      setReviewText("");
      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmitReview}
      sx={{
        maxWidth: 500,
        mx: "auto",
        p: 3,
        bgcolor: "white",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      {/* Rating Section */}
      <Typography
        variant="h6"
        sx={{
          fontSize: {
            xs: "1rem",
            sm: "1.25rem",
            md: "2rem",
          },
          mb: 1,
        }}
      >
        How would you rate the photographer?
      </Typography>
      <Rating
        name="rating"
        value={rating}
        precision={1}
        onChange={(_, newValue) => setRating(newValue)}
        sx={{ mb: 1 }}
      />

      {/* Feedback Input */}
      <Typography
        variant="h6"
        sx={{
          fontSize: {
            xs: "1rem",
            sm: "1.25rem",
            md: "2rem",
          },
          mb: 1,
        }}
      >
        Share your feedback or suggestions.
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder="Write your feedback..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        variant="outlined"
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        disabled={loading}
      >
        {loading ? <Loading /> : "Submit Feedback"}
      </Button>
    </Box>
  );
};

export default FeedbackForm;
