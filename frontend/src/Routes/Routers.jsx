import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Photographers from "../Pages/Photographers/Photographers";
import PhotographerDetails from "../Pages/Photographers/PhotographerDetails";
import CheckoutSuccess from "../Pages/CheckoutSuccess";
import ProtectedRoutes from "./ProtectedRoutes";
import UserAccount from "../Dashboard/User/UserAccount";
import Services from "../Pages/Services";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import AdminDashboard from "../Dashboard/Admin/AdminDashboard";
import TestCode from "../components/Shared/TestCode";
import PhotogDashboard from "../Dashboard/Photographer/PhotogDashboard";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/test" element={<TestCode />} />
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
        path="/admin/profile/me"
        element={
          <ProtectedRoutes allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/photographers/profile/me"
        element={
          <ProtectedRoutes allowedRoles={["photographer"]}>
            <PhotogDashboard />
          </ProtectedRoutes>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
