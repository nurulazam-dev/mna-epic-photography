import Footer from "../components/Shared/Footer";
import Header from "../components/Shared/Header";
import Routers from "../Routes/Routers";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
