import GallerySection from "../components/Home/GallerySection";
import TestCode from "../components/Shared/TestCode";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Services from "./Services";

const Home = () => {
  return (
    <>
      <TestCode />
      <Services />
      <GallerySection />
      <AboutUs />
      <ContactUs />
    </>
  );
};

export default Home;
