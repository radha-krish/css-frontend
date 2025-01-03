import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineShareAlt } from 'react-icons/ai'; // Import the share icon

import Comparision from '../components/Comparision'
import Navbar from '../components/Nabbar';
import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, WhatsappIcon } from 'react-share';
import { Helmet } from 'react-helmet';
const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');

  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const handleShare = (product) => {
    const shareUrl = `${window.location.origin}/product/${product._id}`;
  
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this product: ${product.name} \n\n ${product.description} `,
        url: shareUrl
      })
      .then(() => {
        toast.info('Product shared successfully!');
      })
      .catch((error) => {
        console.error('Error sharing product:', error);
        toast.error('Failed to share the product.');
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(shareUrl).then(() => {
        toast.info('Product link copied to clipboard!');
      });
    }
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://css-backend-wvn4.onrender.com/api/admin/product/${id}?type=${encodeURIComponent(type)}`);
        const result = await response.json();
        setProduct(result.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id, type]);

  const handlePrev = () => {
    if (product && product.imageUrls.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? product.imageUrls.length - 1 : prevIndex - 1));
    }
  };

  const handleNext = () => {
    if (product && product.imageUrls.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex === product.imageUrls.length - 1 ? 0 : prevIndex + 1));
    }
  };

  const handleImageClick = () => {
    setIsPopupOpen(true); // Open the image in a popup modal
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup modal
  };

  if (!product) return <p className="text-center text-gray-600">Loading...</p>;

  const {
    category,
    subcategory,
    keywords=[],
    company,
    affiliateLink,
    pros,
    cons,
    adminRating,
    adminReview,
    name,
    description,
    price,
    imageUrls,
    features
  } = product;


  return (
    <div>
      <Helmet>
        <title>{name} - {company}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join("")} /> {/* SEO keywords */}
        <meta name="keywords" content={subcategory} /> {/* SEO keywords */}
        <meta name="keywords" content={category} /> {/* SEO keywords */}


        <meta property="og:title" content={`${name} - ${company}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrls && imageUrls[0]} />
        <meta property="og:url" content={`${window.location.href}`} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${name} - ${company}`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrls && imageUrls[0]} />

        {/* Structured data for category and subcategory */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: name,
            description: description,
            category: category,
            subCategory: subcategory || "", // Include subCategory if available
            brand: company,
            offers: {
              "@type": "Offer",
              priceCurrency: "USD", // You can adjust this based on your currency
              price: price,
              itemCondition: "https://schema.org/NewCondition",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: company,
              },
            },
            image: imageUrls,
          })}
        </script>
      </Helmet>
<Navbar/>
   
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <ToastContainer />
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Image Carousel Section */}
        <div className="lg:w-1/3 mb-8 lg:mb-0 relative">
          <div className="overflow-hidden rounded-lg shadow-lg h-64">
            {imageUrls && imageUrls.length > 0 ? (
              <img
                id={`product-image-${currentIndex}`}
                src={imageUrls[currentIndex]}
                alt={`Product Image ${currentIndex + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                onMouseEnter={handleImageClick}
              />
            ) : (
              <img
                src="https://via.placeholder.com/400x300"
                alt="Placeholder"
                className="w-full h-full object-cover"
              />
            )}
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
          </div>
        </div>
        {/* Details Section */}
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{name}</h1>
          <h2 className="text-2xl font-bold mb-4 text-gray-600">{company}</h2>

          <p className="text-gray-700 mb-4">{description}</p>
          {/* Admin Rating and Review */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Admin Rating: {adminRating}/5</h2>
            <p className="text-gray-700 italic">{adminReview}</p>
          </div>
          <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features && features.length > 0 ? (
            features.map((feature) => (
              <div key={feature._id}>
               {feature.featureName && (
  <div>
    <strong className="text-gray-800">{feature.featureName}:</strong> {feature.featureValue}
  </div>
)}

              </div>
            ))
          ) : (
            <p className="text-gray-600">No features listed.</p>
          )}
        </div>
      </div>
          {/* Pros and Cons */}
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Pros & Cons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Pros</h3>
                <ul className="list-disc pl-6 text-gray-700">
                  {pros.map((pro, index) => (
                    <li key={index}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Cons</h3>
                {cons.filter(con => con.trim() !== "").length > 0 && (
  <ul className="list-disc pl-6 text-gray-700">
    {cons
      .filter(con => con.trim() !== "")
      .map((con, index) => (
        <li key={index}>{con}</li>
      ))}
  </ul>
)}
              </div>
            </div>
          </div>
          {/* Affiliate Link */}
          {affiliateLink && (
            <div className="mb-4">
              <a href={affiliateLink} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-700">
                Buy on Affiliate Store
              </a>
            </div>
          )}
           <button
                  onClick={() => handleShare(product)}
                  className="bg-green-600 p-2 flex rounded-md text-xl text-white hover:bg-gray-300 transition"
                  aria-label="Share"
                > Share 
                  <AiOutlineShareAlt className="w-6 h-6 text-gray-100" />
                </button>

     
        </div>
      </div>
     

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="relative w-[90%] h-[85%]">
            <img
              src={imageUrls[currentIndex]}
             
              alt={`Product Image ${currentIndex + 1}`}
              className="w-full h-full m-auto  object-contain rounded-lg shadow-lg  "
            />
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-white text-2xl bg-red-600 p-2 rounded-full"
            >
              &times;
            </button>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-gray-800 p-2 rounded-full"
            >
              &lt;
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-gray-800 p-2 rounded-full"
            >
              &gt;
            </button>
          </div>
        </div>
      )}
      <Comparision productId={id} category={category}/>
    </div>
    </div>
  );
};

export default ProductDetails;
