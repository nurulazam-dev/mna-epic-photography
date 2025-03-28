import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config.js";
import { authContext } from "../context/AuthContext.jsx";
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import logo from "../assets/images/logo.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: result.data, token: result.token, role: result.role },
      });

      setLoading(false);
      toast.success(result.message);
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: { xs: "50vh", md: "70vh", lg: "80vh" }, px: 2 }}
    >
      <Grid item xs={11} sm={8} md={4}>
        <Paper elevation={6} sx={{ p: 4, pt: 0, textAlign: "center" }}>
          <Avatar
            sx={{
              width: 80,
              height: 60,
              margin: "auto",
            }}
            src={logo}
            alt="MNA Epic Photography"
          />
          <Typography
            variant="h5"
            fontWeight={600}
            color="primary"
            gutterBottom
          >
            Please Login
          </Typography>
          <form onSubmit={submitHandler}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              startIcon={
                loading ? <CircularProgress size={20} /> : <LoginIcon />
              }
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don&apos;t have an account?{" "}
            <Link to="/register">Please Register</Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
