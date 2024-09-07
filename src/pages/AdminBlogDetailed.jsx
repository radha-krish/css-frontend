import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogDetailed = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`https://css-backend-wvn4.onrender.com/api/adminBlog/blogs/${id}`);
        const result = await response.json();
        setBlog(result.data);
        if (result.data && result.data.imageUrls && result.data.imageUrls.length > 0) {
          setCurrentIndex(0); // Set initial index for carousel
        }
        console.log(result.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Failed to load blog data');
      }
    };

    fetchBlog();
  }, [id]);

  const checkTokenExpiry = (token) => {
    try {
      const currentTime = Date.now() / 1000; // Convert to seconds
      const decodedToken = jwtDecode(token);
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true; // If token can't be decoded, treat it as expired
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('admin-token'); // Retrieve the token

    if (!token || checkTokenExpiry(token)) {
      toast.error('Session expired. Please log in again.');
      localStorage.removeItem('admin-token'); // Remove the token
      setTimeout(() => {
        navigate('/admin/login'); // Redirect to login if token is missing or expired
      }, 3000);
      return;
    }

    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const res = await fetch(`https://css-backend-wvn4.onrender.com/api/adminBlog/blogs/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`, // Add Authorization header with token
            'Content-Type': 'application/json',
          },
        });
        const result = await res.json();
        if (!result.error) {
          toast.success('Blog deleted successfully');
          setTimeout(() => {
            navigate('/admin/blogs'); // Redirect to blog list after deletion
          }, 2000);
        } else {
          toast.error('Error deleting blog');
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        toast.error('Error deleting blog');
      }
    }
  };

  if (!blog) return <p className="text-center text-gray-600">Loading...</p>;

  const {
    title,
    content,
    author,
    imageUrls = [], // Default to an empty array
    referenceLinks = [], // Default to an empty array
    productLinks = [], // Default to an empty array
    subheadings = [], // Default to an empty array
    contents = [], // Default to an empty array
  } = blog;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <ToastContainer />
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Image Carousel Section */}
        <div className="lg:w-1/3 mb-8 lg:mb-0 relative">
          <div className="overflow-hidden rounded-lg shadow-lg h-64 relative">
            {imageUrls.length > 0 ? (
              <>
                <img
                  src={imageUrls[currentIndex]}
                  alt={`Blog Image ${currentIndex}`}
                  className="w-full h-full object-cover"
                />
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
              </>
            ) : (
              <img
                src="https://via.placeholder.com/400x300"
                alt="Placeholder"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        {/* Details Section */}
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{title}</h1>
          <h2 className="text-xl font-bold mb-4 text-gray-600">By {author}</h2>
          <div className="mb-4">
            {subheadings.length > 0 && contents.length > 0 ? (
              subheadings.map((subheading, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{subheading}</h3>
                  <p className="text-gray-700">{contents[index]}</p>
                </div>
              ))
            ) : (
              <p>No subheadings or content available.</p>
            )}
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Reference Links</h2>
            {referenceLinks.length > 0 ? (
              <ul className="list-disc pl-5">
                {referenceLinks.map((link, index) => (
                  <li key={index} className="text-blue-600 underline">
                    <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reference links available.</p>
            )}
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Product Links</h2>
            {productLinks.length > 0 ? (
              <ul className="list-disc pl-5">
                {productLinks.map((link, index) => (
                  <li key={index} className="text-blue-600 underline">
                    <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No product links available.</p>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailed;
