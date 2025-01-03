import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Nabbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';


const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from API
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/adminBlog/blogs/');
        const result = await response.json();
        if (result.error) {
          // Handle error case
          console.error(result.message);
        } else {
          setBlogs(result.data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>

      <Helmet>
          {/* Dynamic Title for the Blog List Page */}
          <title>Latest Blogs - CCTV and Surveillance Blog</title>
        <meta name="description" content="Read the latest blogs about CCTV, surveillance systems, and security technologies." />
        <meta name="keywords" content="CCTV blogs, surveillance blogs, security systems, security technology" />

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content="Latest Blogs - CCTV and Surveillance Blog" />
        <meta property="og:description" content="Stay updated with the latest trends and news on security systems and CCTV technology." />
        {/* <meta property="og:image" content="/path-to-your-default-image.jpg" /> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

   <Navbar/>
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <div key={blog._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
           <Link to={`/blog/${blog._id}`}>
            <img 
              src={blog.mainImageUrl} 
              alt={blog.title} 
              className="w-full h-48  object-contain mix-blend-multiply" 
              />
              </Link>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.content.substring(0, 100)}...</p>
              <Link 
                to={`/blog/${blog._id}`} 
                className="text-blue-500 hover:underline"
              >
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default BlogList;
