import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineShareAlt } from 'react-icons/ai'; // Import the share icon
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Nabbar'; // Correct the import path for Navbar

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

// SearchPage Component
const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation(); // Access the location object to get query parameters

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('keyword'); // Get the keyword from the query string
    setSearchQuery(keyword || ''); // Set the search query or default to an empty string

    if (keyword) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(`https://css-backend-wvn4.onrender.com/api/admin/products/search?keyword=${encodeURIComponent(keyword)}`);
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
    }
  }, [location.search]); // Depend on location.search to fetch new data when the query changes

  const truncateDescription = (description, length) => {
    if (description.length > length) {
      return description.substring(0, length) + '...';
    }
    return description;
  };

  const handleShare = (product) => {
    const shareUrl = `${window.location.origin}/product/${product._id}?type=${product.subcategory}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.info('Product link copied to clipboard!');
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <ToastContainer />
        <h1 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h1>

        {products.length === 0 ? (
          <p className="text-gray-600">No results found for "{searchQuery}".</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src={product.imageUrls[0]} alt={product.name} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{truncateDescription(product.name, 16)}</h2>
                  <p className="text-gray-700">{truncateDescription(product.description, 20)}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-green-600 font-semibold">${product.price}</p>
                    <StarRating rating={product.adminRating} />
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <Link
                      to={`/product/${product._id}?type=${product.subcategory}`}
                      className="block text-center bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
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
        )}
      </div>
    </div>
  );
};

export default SearchPage;
