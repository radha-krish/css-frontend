import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Products = ({ category, subcategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://css-backend-wvn4.onrender.com/api/admin/products?limit=10&sortBy=adminRating&type=${category}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const res = await response.json();
        setProducts(res.products);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products. Please try again later.');
      }
    };

    fetchProducts();
  }, [category]);

  const truncateDescription = (description, length) => {
    if (description.length > length) {
      return description.substring(0, length) + '...';
    }
    return description;
  };

  return (
    <div className="whitespace-nowrap scrollbar-hide">
      <ToastContainer />
      {products.length > 0 && (
        <div>
          <h2 className="text-xl font-bold p-4 text-gray-600">{subcategory}</h2>
          <div className="flex space-x-4 p-4 overflow-x-auto scrollbar-hide">
            {products.map((product) => (
              <div key={product._id} className="bg-white transform hover:scale-105 transition-transform duration-300 ease-in-out shadow-md rounded-lg w-64 flex-shrink-0">
                <img src={product.imageUrls[0]} alt={product.name} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{truncateDescription(product.name, 16)}</h3>
                  <p className="text-gray-700">{truncateDescription(product.description, 20)}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-green-600 font-semibold">₹{product.price}</p>
                    <StarRating rating={product.adminRating} />
                  </div>
                  <Link
                    to={`/product/${product._id}?type=${product.subcategory}`}
                    className="block mt-4 text-center bg-gray-800 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
