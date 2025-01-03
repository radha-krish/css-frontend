import React, { useState, useEffect } from 'react';
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

  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://css-backend-wvn4.onrender.com/api/admin/products/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.categories); // Assuming response contains a 'categories' array
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Home - Cyber Survillance Services</title>
        <meta name="description" content="Discover top-notch cybersecurity surveillance solutions and CCTV camera installations. Explore our latest products, blogs, and services tailored for your security needs." />
        <meta name="keywords" content="cybersecurity, Cyber Survillance Services, vijayawada, css, surveillance, CCTV cameras, security solutions, home security" />
        <meta name="robots" content="index, follow, Cyber Survillance Services" />
      </Helmet>
      
      <Navbar />
      <div>
        <Carousel images={productImages} />
      </div>
      <Blogs  title={'Latest Blogs'}/>

        {/* Dynamically render Products for each category, including empty ones */}
        {Object.keys(categories).map((category) => (
        <div key={category}>
          {/* Pass the products in this category to the Products component */}
          <Products category={category} products={categories[category]} />
        </div>
      ))}

      <Footer />
    </div>
  );
};

export default Home;
