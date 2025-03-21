import GallerySection from "../components/Home/GallerySection";
import Hero from "../components/Home/Hero";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Services from "./Services";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <GallerySection />
      <AboutUs />
      <ContactUs />
    </>
  );
};

export default Home;
