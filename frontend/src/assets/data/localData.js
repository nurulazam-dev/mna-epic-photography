import img1 from "../images/eventPhotos/2.png";
import img2 from "../images/eventPhotos/5.png";
import img3 from "../images/eventPhotos/4.png";
import img4 from "../images/eventPhotos/6.png";
import img5 from "../images/eventPhotos/3.png";
import img6 from "../images/eventPhotos/7.png";
import founderImg from "../images/photographers/3.png";
import directorImg from "../images/photographers/5.png";
import editorImg from "../images/photographers/1.png";

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
    img: founderImg,
  },
  {
    name: "Jane Smith",
    role: "Creative Director",
    img: directorImg,
  },
  {
    name: "David Brown",
    role: "Senior Editor",
    img: editorImg,
  },
];
