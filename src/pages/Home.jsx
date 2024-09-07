import React from 'react';
import Helmet from 'react-helmet'; // Make sure to install react-helmet
import Navbar from '../components/Nabbar'; // Ensure correct import path
import Carousel from '../components/Carousel';
import Blogs from '../components/Blogs';
import Products from '../components/Products';
import Footer from '../components/Footer';

const Home = () => {
  const productImages = [
    'https://m.media-amazon.com/images/I/51E5TaxRvxL._SX679_.jpg',
    'https://m.media-amazon.com/images/I/81scd4YkTRL._SX679_.jpg',
    'https://m.media-amazon.com/images/I/51PXfg1-lPL._SX679_.jpg',
    'https://m.media-amazon.com/images/I/81scd4YkTRL._SX679_.jpg',
  ];

  return (
    <div>
      <Helmet>
        <title>Home - Cyber Survillance Services</title>
        <meta name="description" content="Discover top-notch cybersecurity surveillance solutions and CCTV camera installations. Explore our latest products, blogs, and services tailored for your security needs." />
        <meta name="keywords" content="cybersecurity, Cyber Survillance Services, vijayawada, css,surveillance, CCTV cameras, security solutions, home security" />
        <meta name="robots" content="index, follow ,Cyber Survillance Services" />
      
      </Helmet>
      <Navbar />
      <div>
        <Carousel images={productImages} />
      </div>
      <Blogs />
      <Products category="DomeCameras" subcategory="Dome Cameras" />
      <Products category="BulletCameras" subcategory="Bullet Cameras" />
      <Products category="WeatherproofCameras" subcategory="Weatherproof Cameras" />
      <Products category="PTZCameras" subcategory="PTZ Cameras" />
      <Products category="NVRSystems" subcategory="NVR Systems" />
      <Products category="DVRSystems" subcategory="DVR Systems" />
      <Products category="MountsBrackets" subcategory="Mounts and Brackets" />
      <Products category="CablesConnectors" subcategory="Cables and Connectors" />
      <Products category="CompleteSurveillanceKits" subcategory="Complete Surveillance Kits" />
      <Products category="DIYKits" subcategory="DIY Kits" />
      <Footer />
    </div>
  );
};

export default Home;
