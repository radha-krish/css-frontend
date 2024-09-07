import React, { useState, useEffect } from 'react';
import './style.css'; // Import custom CSS for scrollbar styling if necessary

const BlogCard = ({ image, title, description, link }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-72 flex-shrink-0">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2 truncate">{title}</h3>
      <p className="text-gray-700 mb-4 truncate">{description}</p>
      <a href={link} className="text-blue-500 hover:underline">
        Read More
      </a>
    </div>
  </div>
);

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://css-backend-wvn4.onrender.com/api/adminBlog/blogs/?limit=8');
        const data = await response.json();

        if (data.error) {
          throw new Error(data.message);
        }

        setBlogPosts(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Blogs</h2>
      
      {/* Horizontal Scroll for all devices */}
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {blogPosts.map((post) => (
          <BlogCard
            key={post._id}
            image={post.imageUrls[0]} // Assuming you want to use the first image
            title={post.title}
            description={post.content.substring(0, 100) + '...'} // Shortened description
            link={`/blog/${post._id}`} // Adjust link as needed
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
