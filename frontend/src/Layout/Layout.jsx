import { useLocation } from "react-router-dom";
import Footer from "../components/Shared/Footer";
import Header from "../components/Shared/Header";
import Routers from "../Routes/Routers";

const Layout = () => {
  const location = useLocation();

  const hideFooter = ["/dashboard", "/login", "/register"].some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <Header />
      <main style={{ paddingTop: 60 }}>
        <Routers />
      </main>
      {!hideFooter && <Footer />}
    </>
  );
};

export default Layout;
