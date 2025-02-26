import Footer from "../components/Shared/Footer";
// import Header from "../components/Shared/Header";
import TestCode from "../components/Shared/TestCode";
import Routers from "../Routes/Routers";

const Layout = () => {
  return (
    <>
      {/* <Header /> */}
      <TestCode />
      <main>
        <Routers />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
