import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Comparision from '../components/Comparision'
import Navbar from '../components/Nabbar';
import { Helmet } from 'react-helmet';
const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');

  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

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
    company,
    resolution,
    connectivity,
    storage,
    opticalZoom,
    nightVisionRange,
    formFactor,
    audio,
    fieldOfView,
    photoSensorTechnology,
    waterResistance,
    operatingSystem,
    mountingType,
    videoCaptureResolution,
    colour,
    afiliateLink,
    numberOfItems,
    includedComponents,
    numberOfChannels,
    remoteAccess,
    recordingModes,
    compressionFormats,
    integration,
    audioSupport,
    alarmInputsOutputs,
    playbackFeatures,
    length,
    material,
    compatibility,
    shielding,
    weightCapacity,
    installationEase,
    numberOfCameras,
    storageCapacity,
    accessoriesIncluded,
    installationType,
    cameraTypes,
    customizationOptions,
    installationInstructions,
    pros,
    cons,
    adminRating,
    adminReview,
    name,
    description,
    imageUrls
  } = product;

  return (
    <div>
       <Helmet>
        <title>{name} - {company}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${name} - ${company}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrls && imageUrls[0]} />
        <meta property="og:url" content={`https://css-backend-wvn4.onrender.com/product/${id}?type=${encodeURIComponent(type)}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${name} - ${company}`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrls && imageUrls[0]} />
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
                onClick={handleImageClick}
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
              {resolution && <div><strong className="text-gray-800">Resolution:</strong> {resolution}</div>}
              {connectivity && <div><strong className="text-gray-800">Connectivity:</strong> {connectivity}</div>}
              {storage && <div><strong className="text-gray-800">Storage:</strong> {storage}</div>}
              {opticalZoom && <div><strong className="text-gray-800">Optical Zoom:</strong> {opticalZoom}</div>}
              {nightVisionRange && <div><strong className="text-gray-800">Night Vision Range:</strong> {nightVisionRange}</div>}
              {formFactor && <div><strong className="text-gray-800">Form Factor:</strong> {formFactor}</div>}
              {audio && <div><strong className="text-gray-800">Audio:</strong> {audio}</div>}
              {fieldOfView && <div><strong className="text-gray-800">Field of View:</strong> {fieldOfView}</div>}
              {photoSensorTechnology && <div><strong className="text-gray-800">Photo Sensor Technology:</strong> {photoSensorTechnology}</div>}
              {waterResistance && <div><strong className="text-gray-800">Water Resistance:</strong> {waterResistance}</div>}
              {operatingSystem && <div><strong className="text-gray-800">Operating System:</strong> {operatingSystem}</div>}
              {mountingType && <div><strong className="text-gray-800">Mounting Type:</strong> {mountingType}</div>}
              {videoCaptureResolution && <div><strong className="text-gray-800">Video Capture Resolution:</strong> {videoCaptureResolution}</div>}
              {colour && <div><strong className="text-gray-800">Colour:</strong> {colour}</div>}
              {numberOfItems && <div><strong className="text-gray-800">Number of Items:</strong> {numberOfItems}</div>}
              {includedComponents && <div><strong className="text-gray-800">Included Components:</strong> {includedComponents.join(', ')}</div>}
              {numberOfChannels && <div><strong className="text-gray-800">Number of Channels:</strong> {numberOfChannels}</div>}
              {remoteAccess && <div><strong className="text-gray-800">Remote Access:</strong> {remoteAccess}</div>}
              {recordingModes && <div><strong className="text-gray-800">Recording Modes:</strong> {recordingModes}</div>}
              {compressionFormats && <div><strong className="text-gray-800">Compression Formats:</strong> {compressionFormats}</div>}
              {integration && <div><strong className="text-gray-800">Integration:</strong> {integration}</div>}
              {audioSupport && <div><strong className="text-gray-800">Audio Support:</strong> {audioSupport ? 'Yes' : 'No'}</div>}
              {alarmInputsOutputs && <div><strong className="text-gray-800">Alarm Inputs/Outputs:</strong> {alarmInputsOutputs}</div>}
              {playbackFeatures && <div><strong className="text-gray-800">Playback Features:</strong> {playbackFeatures}</div>}
              {length && <div><strong className="text-gray-800">Length:</strong> {length}</div>}
              {material && <div><strong className="text-gray-800">Material:</strong> {material}</div>}
              {shielding && <div><strong className="text-gray-800">Shielding:</strong> {shielding}</div>}
              {weightCapacity && <div><strong className="text-gray-800">Weight Capacity:</strong> {weightCapacity}</div>}
              {installationEase && <div><strong className="text-gray-800">Installation Ease:</strong> {installationEase}</div>}
              {numberOfCameras && <div><strong className="text-gray-800">Number of Cameras:</strong> {numberOfCameras}</div>}
              {storageCapacity && <div><strong className="text-gray-800">Storage Capacity:</strong> {storageCapacity}</div>}
              {accessoriesIncluded && <div><strong className="text-gray-800">Accessories Included:</strong> {accessoriesIncluded.join(', ')}</div>}
              {installationType && <div><strong className="text-gray-800">Installation Type:</strong> {installationType}</div>}
              {cameraTypes && <div><strong className="text-gray-800">Camera Types:</strong> {cameraTypes.join(', ')}</div>}
              {customizationOptions && <div><strong className="text-gray-800">Customization Options:</strong> {customizationOptions.join(', ')}</div>}
              {installationInstructions && <div><strong className="text-gray-800">Installation Instructions:</strong> {installationInstructions}</div>}
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
          {afiliateLink && (
            <div className="mb-4">
              <a href={afiliateLink} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-700">
                Buy on Affiliate Store
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="relative max-w-4xl max-h-4xl">
            <img
              src={imageUrls[currentIndex]}
              alt={`Product Image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-cover rounded-lg shadow-lg"
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
      <Comparision productId={id} category={type}/>
    </div>
    </div>
  );
};

export default ProductDetails;
