import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductEdit from './components/ProductEdit';
import AdminNavbar from './components/AdminNavbar';

const AdminProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const navigate = useNavigate(); // Hook for navigation

  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditVisible, setIsEditVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsEditVisible((prev) => !prev);
  };


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://css-backend-wvn4.onrender.com/api/admin/product/${id}`);
        const result = await response.json();
        setProduct(result.product);
        console.log(result)
      } catch (error) {

        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id, type]);

  const handlePrev = () => {
    if (product && product.imageUrls.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? product.imageUrls.length - 1 : prevIndex - 1));
    }
  };

  const handleNext = () => {
    if (product && product.imageUrls.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex === product.imageUrls.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const checkTokenExpiry = (token) => {
    // toast.error(token)

    try {
      const currentTime = Date.now() / 1000; // Convert to seconds
      // toast.error(currentTime)
      const decodedToken = jwtDecode(token);
      
      // toast.success(decodedToken)
      // toast.error(token)
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true; // If token can't be decoded, treat it as expired
    }
  };

  const handleDelete = async () => {
    // toast.error("hi")
    const token = localStorage.getItem('admin-token'); // Retrieve the token
      // toast.success(token)
    // Check if the token has expired
    if (!token || checkTokenExpiry(token)) {
      toast.error('Session expired. Please log in again.');
      localStorage.removeItem('admin-token'); // Remove the token
      setTimeout(()=>{
        navigate('/admin/login'); // Redirect to login if token is missing or expired

      },1000)
      return;
    }

    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`https://css-backend-wvn4.onrender.com/api/admin/product/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`, // Add Authorization header with token
            'Content-Type': 'application/json',
          },
        });
        const result = await res.json();
        if (!result.error) {
          toast.success('Product deleted successfully');
          setTimeout(()=>{
            navigate('/admin/products'); // Redirect to login if token is missing or expired
    
          },2000)
        }
        else{
          toast.error('Error deleting product');}
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Error deleting product');
      }
    }
  };

  if (!product) return <p className="text-center text-gray-600">Loading...</p>;

  const {
    company,
    affiliateLink,
    pros,
    cons,
    adminRating,
    adminReview,
    name,
    description,
    price,
    imageUrls,
    features
  } = product;

  return (
    <div>
      <AdminNavbar/>

    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <ToastContainer />
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Image Carousel Section */}
        <div className="lg:w-1/3 mb-8 lg:mb-0 relative">
          <div className="overflow-hidden rounded-lg shadow-lg h-64">
            {imageUrls && imageUrls.length > 0 ? (
              <img
                src={imageUrls[currentIndex]}
                alt={`Product Image ${currentIndex + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="https://via.placeholder.com/400x300"
                alt="Placeholder"
                className="w-full h-full object-cover"
              />
            )}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
            >
              &lt;
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
            >
              &gt;
            </button>
          </div>
        </div>
        {/* Details Section */}
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{name}</h1>
          <h2 className="text-2xl font-bold mb-4 text-gray-600">{company}</h2>

          
          <p className="text-gray-700 mb-4">{description}</p>
          {/* Admin Rating and Review */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Admin Rating: {adminRating}/5</h2>
            <p className="text-gray-700 italic">{adminReview}</p>
          </div>
          {/* price */}
          <div className="mb-4 flex gap-1">
            <h2 className="text-xl font-semibold text-gray-800">Price: </h2>
            <h2 className="text-blue-950 font-semibold italic text-xl">{price}</h2>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl  mb-2 text-gray-800">Features</h2>
              
          {/* Affiliate Link */}
          {affiliateLink && (
            <div className="mb-4 flex gap-10 ">
              {/* <h2 className="text-xl font-semibold text-gray-800">Affiliate Link</h2> */}
              <a href={affiliateLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Buy Now
              </a>
            </div>
          )}
          </div>
          {/* features */}
          <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features && features.length > 0 ? (
            features.map((feature) => (
              <div key={feature._id}>
                <strong className="text-gray-800">{feature.featureName}:</strong> {feature.featureValue}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No features listed.</p>
          )}
        </div>
      </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Pros and Cons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Pros</h3>
                <div>
                  {pros && pros.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {pros.map((pro, index) => (
                        <li key={index} className="text-gray-700">{pro}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No pros listed.</p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Cons</h3>
                <div>
                  {cons && cons.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {cons.map((con, index) => (
                        <li key={index} className="text-gray-700">{con}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No cons listed.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
           
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={toggleFormVisibility}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      {isEditVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50  ">
          <div className="bg-gray-100 rounded-lg p-8 w-full max-w-4xl mx-auto shadow-lg relative max-h-full">
            <button
              onClick={toggleFormVisibility}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <div className="max-h-screen overflow-y-auto p-4 mb-4">
              <ProductEdit />
            </div>
          </div>
        </div>
      )}

    </div>
    </div>
  );
};

export default AdminProductDetails;
