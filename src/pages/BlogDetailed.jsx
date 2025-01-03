import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Nabbar';
import Blogs from '../components/Blogs';
import Footer from '../components/Footer';
import 'react-toastify/dist/ReactToastify.css';

const BlogDetailed = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/adminBlog/blog/${id}`);
        const result = await response.json();
        setBlog(result.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        toast.error('Failed to load blog data');
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <p className="text-center text-gray-600">Not Found</p>;

  const {
    title,
    author,
    mainImage,
    content,
    keywords = [],
    sections = [],
    referenceLinks = [],
    productLinks = []
  } = blog;

  // Share function
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this blog: ${title}`,
          url: `http://localhost:3000/blog/${id}`,
        });
        toast.success('Blog shared successfully!');
      } catch (error) {
        console.error('Error sharing the blog:', error);
        toast.error('Failed to share the blog');
      }
    } else {
      toast.warn('Sharing is not supported in this browser.');
    }
  };

  return (
    <div>
     <Helmet>
        <title>{title} - Cyber Surveillance Service</title>
        <meta name="description" content={content.substring(0, 150)} />
        <meta name="keywords" content={keywords.join(', ')} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={content.substring(0, 150)} />
        <meta property="og:image" content={mainImage} />
        <meta property="og:url" content={`http://localhost:3000/blog/${id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={content.substring(0, 150)} />
        <meta name="twitter:image" content={mainImage} />

        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `http://localhost:3000/blog/${id}`
            },
            "headline": title,
            "description": content.substring(0, 150), // Short description or summary
            "image": mainImage, // Main image URL
            "author": {
              "@type": "Person",
              "name": author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Cyber Surveillance Service",
          
            },
            "articleSection": sections.map(section => section.subheading).filter(Boolean), // Blog section subheadings
            "keywords": keywords.join(', '),
            "articleBody": content
          })}
        </script>
      </Helmet>
      
      <Navbar />
      <div className="container p-4 md:p-8 lg:p-12 mx-auto">
        <ToastContainer />

        {/* Share Button */}
      

        {/* Details Section */}
        <div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{title}</h1>
          <h2 className="text-xl font-bold mb-4 text-gray-600">By {author}</h2>
       
          <p className="mb-4 text-gray-700">{content}</p>

          <div className="mb-4">
            {sections.length > 0 && sections.map((section, index) => (
              <div key={index} className="mb-4">
                {section.subheading && (
                  <h3 className="text-lg font-semibold text-gray-800">{section.subheading}</h3>
                )}
                {section.images && (
                  <img
                    src={section.images}
                    alt={`Section Image ${index + 1}`} 
                    className=" w-full h-4/5 md:w-100 md:h-96 object-contain mix-blend-multiply mb-2"
                  /> 
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

          <div className="mb-4">
          <button 
            onClick={handleShare} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Share this blog
          </button>
        </div>
        </div>
      </div>
      <Blogs id={id} title={'Related Blogs'} keywords={keywords} />
      <Footer />
    </div>
  );
};

export default BlogDetailed;
