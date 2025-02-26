import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Photographers from "../Pages/Photographers/Photographers";
import PhotographerDetails from "../Pages/Photographers/PhotographerDetails";
import CheckoutSuccess from "../Pages/CheckoutSuccess";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "../Dashboard/Photographer/Dashboard";
import UserAccount from "../Dashboard/User/UserAccount";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<TestCode />} /> */}
      <Route path="/register" element={<Register />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route path="/photographers" element={<Photographers />} />
      <Route path="/photographers/:id" element={<PhotographerDetails />} />

      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoutes allowedRoles={["client"]}>
            <UserAccount />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/photographers/profile/me"
        element={
          <ProtectedRoutes allowedRoles={["photographer"]}>
            <Dashboard />
          </ProtectedRoutes>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
