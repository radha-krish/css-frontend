import React, { useState } from 'react';
import { FaVideo } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  function CCTVIcon() {
    return <FaVideo size={40} color="white" />;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product/search?keyword=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between md:pr-[2rem]">
        {/* Logo and Name */}
        <div className="flex items-center">
          <div className="text-white text-xl font-bold">
            {CCTVIcon()}
          </div>
          <div className="text-white ml-2 text-xl">CSS</div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-grow ml-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-96 px-3 py-1 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <button
            type="submit"
            className="bg-gray-600 text-white px-4 py-1 rounded-r-md hover:bg-gray-700"
          >
            Search
          </button>
        </form>

        {/* Menu button for small screens */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Navigation options for medium and larger screens */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/products" className="text-white hover:text-gray-300">
            Products
          </Link>
          <Link to="/blogs" className="text-white hover:text-gray-300">
           Blogs
          </Link>
          <Link to="/contactus" className="text-white hover:text-gray-300">
           Contact Us
          </Link>
        </div>
      </div>

      {/* Side Drawer for small screens */}
      <div
        className={`fixed inset-0 z-50 bg-gray-900 bg-opacity-50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      >
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-gray-800 transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-8 space-y-4">
            <Link to="/" className="block text-white py-2 pl-4">
              Home
            </Link>
            <Link to="/products" className="block text-white py-2 pl-4">
              Products
            </Link>
            <Link to="/blogs" className="block text-white py-2 pl-4">
              Blogs
            </Link>
            <Link to="/contactus" className="block text-white py-2 pl-4">
           Contact Us
          </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
