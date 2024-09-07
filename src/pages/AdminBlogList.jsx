import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from API
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://css-backend-wvn4.onrender.com/api/adminBlog/blogs/');
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
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <div key={blog._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img 
              src={blog.imageUrls[0]} 
              alt={blog.title} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4">{blog.content.substring(0, 100)}...</p>
              <Link 
                to={`/admin/blog/${blog._id}`} 
                className="text-blue-500 hover:underline"
              >
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
