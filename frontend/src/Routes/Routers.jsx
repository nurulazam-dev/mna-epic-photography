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
import RequireAuth from "./RequireAuth";
import Dashboard from "../Pages/Dashboard";
import Overview from "../Dashboard/Overview";
import MyBookings from "../Dashboard/User/MyBookings";
import UserProfile from "../Dashboard/User/UserProfile";
import AdminProfile from "../Dashboard/Admin/AdminProfile";
import PhotographerProfile from "../Dashboard/Photographer/PhotographerProfile";
import ManageUsers from "../Dashboard/Admin/ManageUsers";
import ManagePhotographers from "../Dashboard/Admin/ManagePhotographers";
import ManageBookings from "../Dashboard/Admin/ManageBookings";
import Bookings from "../Dashboard/Photographer/Bookings";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import UserOverview from "../Dashboard/User/UserOverview";
import PhotogOverview from "../Dashboard/Photographer/PhotogOverview";
import AdminOverview from "../Dashboard/Admin/AdminOverview";

const Routers = () => {
  const { role } = useContext(authContext);

  const getDashboardComponent = () => {
    if (role === "client") return <UserOverview />;
    if (role === "photographer") return <PhotogOverview />;
    if (role === "admin") return <AdminOverview />;
    return <Home />;
  };

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
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      >
        {/* <Route index element={<Overview />} /> */}
        <Route index element={getDashboardComponent()} />

        <Route
          path="users/profile/me"
          element={
            <ProtectedRoutes allowedRoles={["client"]}>
              <UserAccount />
            </ProtectedRoutes>
          }
        />
        <Route
          path="my-bookings"
          element={
            <ProtectedRoutes allowedRoles={["client"]}>
              <MyBookings />
            </ProtectedRoutes>
          }
        />
        <Route
          path="manage-users"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <ManageUsers />
            </ProtectedRoutes>
          }
        />
        <Route
          path="manage-photogs"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <ManagePhotographers />
            </ProtectedRoutes>
          }
        />
        <Route
          path="manage-bookings"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <ManageBookings />
            </ProtectedRoutes>
          }
        />
        <Route
          path="user-profile"
          element={
            <ProtectedRoutes allowedRoles={["client"]}>
              <UserProfile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="admin/profile/me"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="admin-profile"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <AdminProfile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="photog-profile"
          element={
            <ProtectedRoutes allowedRoles={["photographer"]}>
              <PhotographerProfile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="bookings"
          element={
            <ProtectedRoutes allowedRoles={["photographer"]}>
              <Bookings />
            </ProtectedRoutes>
          }
        />
        <Route
          path="photographers/profile/me"
          element={
            <ProtectedRoutes allowedRoles={["photographer"]}>
              <PhotogDashboard />
            </ProtectedRoutes>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
