import { useLocation } from "react-router-dom";
import Footer from "../components/Shared/Footer";
import Header from "../components/Shared/Header";
import Routers from "../Routes/Routers";

const Layout = () => {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/dashboard");

  return (
    <>
      <Header />
      <main>
        <Routers />
      </main>
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
