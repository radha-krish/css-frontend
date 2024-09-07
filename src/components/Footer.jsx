import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8 mt-40 pt-40">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:justify-between">
        {/* About Section */}
        <div className="mb-6 md:mb-0 md:w-96">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-gray-400">
            We are dedicated to providing the best security solutions for your home and business. 
            Our products are of the highest quality and reliability.
          </p>
        </div>

        {/* Links Section */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
          <ul>
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/products" className="hover:underline">Products</Link></li>
            <li><Link to="/blogs" className="hover:underline">Blogs</Link></li>
            <li><Link to="/contactus" className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-400">Cyber Survillance Services</p>
          <p className="text-gray-400">Azith Singh Nagar</p>
          {/* <p className="text-gray-400">Email: info@securitycompany.com</p> */}
          <p className="text-gray-400">Phone: 8686489041</p>
        </div>

        {/* Social Media Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer"><FaFacebookF size={24} /></a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} /></a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer"><FaInstagram size={24} /></a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer"><FaLinkedinIn size={24} /></a>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-gray-700 py-4 text-center mt-20">
      <p className="text-gray-300">&copy;  Security Company. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
