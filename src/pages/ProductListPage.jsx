import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineShareAlt } from 'react-icons/ai'; // Import the share icon
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Nabbar';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer'
import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, WhatsappIcon } from 'react-share';
// StarRating Component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {Array(fullStars).fill().map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-500 text-xl">★</span>
      ))}
      {halfStar && <span className="text-yellow-500 text-xl">☆</span>}
      {Array(emptyStars).fill().map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300 text-xl">★</span>
      ))}
    </div>
  );
};

// ProductLists Component
const ProductLists = ({navbar}) => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [limit, setLimit] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [subCategory, setSubCategory] = useState('');


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/products?latest=true&sortBy=${sortBy}&limit=${limit}&category=${category}&subcategory=${subCategory}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const res = await response.json();
        setProducts(res.products);
        // toast.success('Products fetched successfully!');
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products. Please try again later.');
      }
    };

    fetchProducts();
  }, [sortBy, limit, category,subCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/admin/products/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const res = await response.json();
        setCategories(res.categories); // Assuming the backend returns { categories: [] }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to fetch categories. Please try again later.');
      }
    };

    fetchCategories();
  }, [])


  const truncateDescription = (description, length) => {
    if (description.length > length) {
      return description.substring(0, length) + '...';
    }
    return description;
  };

  const applyFilter = () => {
    setShowModal(false);
    toast.info('Filters applied.');
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSubCategory(''); // Reset subcategory when category changes
};
  const removeFilters = () => {
    setSortBy('');
    setLimit('');
    setCategory('');
    setShowModal(false);
    toast.info('Filters removed.');
  };

  const handleShare = (product) => {
    const shareUrl = `${window.location.origin}/product/${product._id}`;
  
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this product: ${product.name} \n\n ${product.description} `,
        url: shareUrl
      })
      .then(() => {
        toast.info('Product shared successfully!');
      })
      .catch((error) => {
        console.error('Error sharing product:', error);
        toast.error('Failed to share the product.');
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(shareUrl).then(() => {
        toast.info('Product link copied to clipboard!');
      });
    }
  };
  

  return (
    <div>
       <Helmet>
        <title>Product Listings -Css</title>
        <meta name="keywords" content="CCTV blogs, surveillance blogs, security systems, security technology , cctvcameras" />

        <meta name="description" content="Browse our wide range of products, including cameras, systems, and accessories. Filter by category, price, and rating to find the perfect product for your needs." />
        <meta property="og:title" content="Product Listings - Cyber Security Survillance" />
        <meta property="og:description" content="Browse our wide range of products, including cameras, systems, and accessories. Filter by category, price, and rating to find the perfect product for your needs." />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Product Listings - Cyber Security Survillance" />
        <meta name="twitter:description" content="Browse our wide range of products, including cameras, systems, and accessories. Filter by category, price, and rating to find the perfect product for your needs." />
      </Helmet>
   {navbar && <Navbar/> } 
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Product Listing</h1>

     


      <div className=' bg-slate-300 inline-block  rounded-lg items-end fixed top-20 right-5 z-10  '>
      <button 
        className="bg-orange-500 text-slate-100 px-4 py-2 rounded font-semibold italic text-xl hover:bg-gray-700 transition  "
        onClick={() => setShowModal(true)}
        >
        Apply  Filter
      </button>
        </div>
  

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg relative z-10 w-full max-w-md mx-auto">
            <h2 className="text-lg font-bold mb-4">Apply Filters</h2>

            <div className="mb-4">
              <label className="block mb-2">Sort By:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 border rounded w-full">
                <option value="">Select</option>
                <option value="lowprice">Price: Low to High</option>
                <option value="highprice">Price: High to Low</option>
                <option value="highadminRating">Rating: High to Low</option>
                <option value="lowadminRating">Rating: Low to High</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Limit:</label>
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="p-2 border rounded w-full"
                min="1"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Category:</label>
              <select value={category} onChange={handleCategoryChange} className="p-2 border rounded w-full">
                <option value="">All Categories</option>
                {Object.keys(categories).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Sub Category:</label>
              <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="p-2 border rounded w-full">
                <option value="">All Sub Categories</option>
                {category && categories[category] && categories[category].map((subcat) => (
                  <option key={subcat} value={subcat}>{subcat}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                onClick={removeFilters}
              >
                Remove Filters
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={applyFilter}
              >
                Apply Filter
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-y-20 gap-x-5 mt-6">
        {products.map((product) => (
          <div key={product._id} className="bg-gray-100 shadow-md rounded-lg overflow-hidden  transform hover:scale-105 transition-transform duration-300 ease-in-out ">
            <Link to={`/product/${product._id}`}>
            <img src={product.imageUrls[0]} alt={product.name} className="h-48 w-full object-contain mix-blend-multiply" />
            </Link>

            <div className="p-4">
              <h2 className="text-lg font-bold"> {truncateDescription(product.name, 16)}</h2>
              <p className="text-gray-700">
                {truncateDescription(product.description, 20)}
              </p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-green-600 font-semibold">₹{product.price}</p>
                <StarRating rating={product.adminRating} />
              </div>
              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/product/${product._id}`}
                  className="block text-center bg-gray-800 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleShare(product)}
                  className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
                  aria-label="Share"
                >
                  <AiOutlineShareAlt className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ProductLists;
