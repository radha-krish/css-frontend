import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/AdminNavbar';
import BlogEditForm from '../components/BlogEditForm';


const BlogDetailed = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [isEditVisible, setIsEditVisible] = useState(false);


  const toggleFormVisibility = () => {
    setIsEditVisible((prev) => !prev);
  };


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`https://css-backend-wvn4.onrender.com/api/adminBlog/blog/${id}`);
        const result = await response.json();
        setBlog(result.data);
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
    const token = localStorage.getItem('admin-token');

    if (!token || checkTokenExpiry(token)) {
      toast.error('Session expired. Please log in again.');
      localStorage.removeItem('admin-token');
      setTimeout(() => {
        navigate('/admin/login');
      }, 3000);
      return;
    }

    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const res = await fetch(`https://css-backend-wvn4.onrender.com/api/adminBlog/blog/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const result = await res.json();
        if (!result.error) {
          toast.success('Blog deleted successfully');
          setTimeout(() => {
            navigate('/admin/blogs');
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
    author,
    mainImage,
    content,
    sections = [],
    referenceLinks = [],
    productLinks = []
  } = blog;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 md:p-8 lg:p-12">
        <ToastContainer />

        {/* Details Section */}
        <div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{title}</h1>
          <h2 className="text-xl font-bold mb-4 text-gray-600">By {author}</h2>
          {mainImage && (
            <img
              src={mainImage}
              alt="Main"
              className="w-full h-48 md:h-64 object-contain mix-blend-multiply mb-4"
            />
          )}
          <p className="mb-4 text-gray-700">{content}</p>

          <div className="mb-4">
            {sections.length > 0 && sections.map((section, index) => (
              <div key={index} className="mb-4">
                {section.images && (
                  <img
                    src={section.images}
                    alt={`Section Image ${index + 1}`}
                    className="w-96 h-48 md:h-2/5  object-contain mix-blend-multiply mb-2"
                  />
                )}
                {section.subheading && (
                  <h3 className="text-lg font-semibold text-gray-800">{section.subheading}</h3>
                )}
                {section.content && (
                  <p className="text-gray-700">{section.content}</p>
                )}
                {section.mainPoints.length > 0 && (
                  <ul className="list-disc pl-5">
                    {section.mainPoints.map((point, idx) => (
                      point && <li key={idx} className="text-gray-600">{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {sections.length === 0 && <p>No sections available.</p>}
          </div>

          {referenceLinks.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Reference Links</h2>
              <ul className="list-disc pl-5">
                {referenceLinks.map((link, index) => (
                  <li key={index} className="text-blue-600 underline">
                    <a href={link.link} target="_blank" rel="noopener noreferrer">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {referenceLinks.length === 0 && <p>No reference links available.</p>}

          {productLinks.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Product Links</h2>
              <ul className="list-disc pl-5">
                {productLinks.map((link, index) => (
                  <li key={index} className="text-blue-600 underline">
                    <a href={link.link} target="_blank" rel="noopener noreferrer">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {productLinks.length === 0 && <p>No product links available.</p>}

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
              <BlogEditForm />
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default BlogDetailed;
