import BusinessIcon from "@mui/icons-material/Business";
import VisibilityIcon from "@mui/icons-material/Visibility";
import img1 from "../images/eventPhotos/2.png";
import img2 from "../images/eventPhotos/5.png";
import img3 from "../images/eventPhotos/4.png";
import img4 from "../images/eventPhotos/6.png";
import img5 from "../images/eventPhotos/3.png";
import img6 from "../images/eventPhotos/7.png";

export const servicesData = [
  {
    title: "Wedding Photography",
    description:
      "Capture the most beautiful moments of your special day with our expert photographers.",
    image: img5,
  },
  {
    title: "Event Photography",
    description:
      "We cover corporate and personal events with high-quality photography.",
    image: img1,
  },
  {
    title: "Portrait Photography",
    description:
      "Professional portrait sessions tailored to your personality and style.",
    image: img3,
  },
  {
    title: "Product Photography",
    description: "High-quality product photos that make your brand stand out.",
    image: img2,
  },
  {
    title: "Fashion Photography",
    description:
      "Showcase the latest fashion trends with stunning photography.",
    image: img4,
  },
  {
    title: "Nature Photography",
    description:
      "Capture the beauty of nature with our professional photographers.",
    image: img6,
  },
];

export const galleryImagesData = [
  { src: img1, span: { xs: 12, sm: 6 }, rows: 2 },
  { src: img2, span: { xs: 6, sm: 3 }, rows: 1 },
  { src: img3, span: { xs: 6, sm: 3 }, rows: 1 },
  { src: img4, span: { xs: 12, sm: 6 }, rows: 1 },
  { src: img5, span: { xs: 4, sm: 4 }, rows: 1 },
  { src: img6, span: { xs: 4, sm: 4 }, rows: 1 },
  { src: img1, span: { xs: 4, sm: 4 }, rows: 1 },
];

export const heroImages = [img1, img2, img3, img4, img5, img6];

export const teamData = [
  {
    name: "M N Azam",
    role: "Founder & Lead Photographer",
    img: "https://source.unsplash.com/150x150/?man,portrait",
  },
  {
    name: "Jane Smith",
    role: "Creative Director",
    img: "https://source.unsplash.com/150x150/?woman,portrait",
  },
  {
    name: "David Brown",
    role: "Senior Editor",
    img: "https://source.unsplash.com/150x150/?editor,photography",
  },
];

export const missionVisionData = [
  {
    title: "Our Mission",
    text: "To create stunning visual stories that connect with people and bring emotions to life through photography.",
    icon: <BusinessIcon fontSize="large" color="primary" />,
  },
  {
    title: "Our Vision",
    text: "To be the most trusted photography brand, transforming moments into timeless art for generations.",
    icon: <VisibilityIcon fontSize="large" color="secondary" />,
  },
];
