import React, { useState } from 'react';
import { FaVideo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';  // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import react-toastify CSS
import AdminNavbar from "../components/AdminNavbar";
import ProductForm from "../components/Admin_Input";
import AdminBlogForm from '../components/AdminBlogForm';

const Admin = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isBlogVisible, setIsBlogVisible] = useState(false);
  const navigate = useNavigate();

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  const toggleBlogVisibility = () => {
    setIsBlogVisible((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    toast.info("You have been logged out.");  // Show toast message
    navigate("/admin/login");  // Redirect to login page
  };

  return (
    <div>
      <AdminNavbar />

      <div className='flex flex-col items-center justify-center h-72 border-1 rounded-md shadow-lg p-4'>
        <h1 className='text-xl text-gray-800 mb-4'>Hello Admin</h1>
        <div className="text-gray-700 text-xl font-bold mb-4">
          <FaVideo size={100} color="black" />
        </div>
        <h1 className='mb-4'>Have a Nice day</h1>

        <div className="flex space-x-4">
          <button
            onClick={toggleFormVisibility}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full sm:w-auto"
          >
            {isFormVisible ? 'Hide Product Form' : 'Add Product'}
          </button>
          <button
            onClick={toggleBlogVisibility}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 w-full sm:w-auto"
          >
            Add Blog
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ToastContainer to show toast messages */}
      <ToastContainer />

      {/* Product Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50  ">
          <div className="bg-gray-100 rounded-lg p-8 w-full max-w-4xl mx-auto shadow-lg relative max-h-full">
            <button
              onClick={toggleFormVisibility}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <div className="max-h-screen overflow-y-auto p-4 mb-4">
              <ProductForm />
            </div>
          </div>
        </div>
      )}

      {/* Blog Modal */}
      {isBlogVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50  ">
          <div className="bg-gray-100 rounded-lg p-8 w-full max-w-4xl mx-auto shadow-lg relative max-h-full">
            <button
              onClick={toggleBlogVisibility}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <div className="max-h-screen overflow-y-auto p-4 mb-4">
              <AdminBlogForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
