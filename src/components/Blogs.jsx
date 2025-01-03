import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // Import custom CSS for scrollbar styling if necessary

const BlogCard = ({ image, title, description, id }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden w-72 flex-shrink-0">
    <Link to={`/blog/${id}`}>
      <img src={image} alt={title} className="w-full h-48 object-cover" />
    </Link>
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2 truncate">{title}</h3>
      <p className="text-gray-700 mb-4 truncate">{description}</p>
      <Link to={`/blog/${id}`} className="text-blue-500 hover:underline">
        Read More
      </Link>
    </div>
  </div>
);

const Blogs = ({ keywords, id, title }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Construct the URL with optional parameters
        let apiUrl = 'http://localhost:3000/api/adminBlog/blogs?limit=8';
        if (keywords && keywords.length > 0) {
          apiUrl += `&keywords=${encodeURIComponent(keywords.join(','))}`; // Join the keywords array
        }
        if (id) {
          apiUrl += `&id=${encodeURIComponent(id)}`;
        }

        const response = await fetch(apiUrl);
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
  }, [keywords, id]); // Added `id` as a dependency to refetch if it changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>

      {blogPosts.length > 0 ? (
        // Horizontal Scroll for all devices
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
          {blogPosts.map((post) => (
            <BlogCard
              key={post._id}
              image={post.mainImageUrl} // Assuming you want to use the main image
              title={post.title}
              description={post.content.substring(0, 100) + '...'} // Shortened description
              id={post._id} // Pass the blog id for routing
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 text-xl">
          No related blogs
        </div>
      )}
    </div>
  );
};

export default Blogs;
