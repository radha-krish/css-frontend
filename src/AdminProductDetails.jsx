import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const navigate = useNavigate(); // Hook for navigation

  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const checkTokenExpiry = (token) => {
    // toast.error(token)

    try {
      const currentTime = Date.now() / 1000; // Convert to seconds
      // toast.error(currentTime)
      const decodedToken = jwtDecode(token);
      
      // toast.success(decodedToken)
      // toast.error(token)
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true; // If token can't be decoded, treat it as expired
    }
  };

  const handleDelete = async () => {
    // toast.error("hi")
    const token = localStorage.getItem('admin-token'); // Retrieve the token
      // toast.success(token)
    // Check if the token has expired
    if (!token || checkTokenExpiry(token)) {
      toast.error('Session expired. Please log in again.');
      localStorage.removeItem('admin-token'); // Remove the token
      setTimeout(()=>{
        navigate('/admin/login'); // Redirect to login if token is missing or expired

      },1000)
      return;
    }

    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`https://css-backend-wvn4.onrender.com/api/admin/product/${id}?type=${encodeURIComponent(type)}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`, // Add Authorization header with token
            'Content-Type': 'application/json',
          },
        });
        const result = await res.json();
        if (!result.error) {
          toast.success('Product deleted successfully');
          setTimeout(()=>{
            navigate('/admin/products'); // Redirect to login if token is missing or expired
    
          },2000)
        }
        else{
          toast.error('Error deleting product');}
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Error deleting product');
      }
    }
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
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <ToastContainer />
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Image Carousel Section */}
        <div className="lg:w-1/3 mb-8 lg:mb-0 relative">
          <div className="overflow-hidden rounded-lg shadow-lg h-64">
            {imageUrls && imageUrls.length > 0 ? (
              <img
                src={imageUrls[currentIndex]}
                alt={`Product Image ${currentIndex + 1}`}
                className="w-full h-full object-cover"
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
              {compatibility && <div><strong className="text-gray-800">Compatibility:</strong> {compatibility}</div>}
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
              
          {/* Affiliate Link */}
          {afiliateLink && (
            <div className="mb-4 flex gap-10 ">
              {/* <h2 className="text-xl font-semibold text-gray-800">Affiliate Link</h2> */}
              <a href={afiliateLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Buy Now
              </a>
            </div>
          )}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Pros and Cons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Pros</h3>
                <div>
                  {pros && pros.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {pros.map((pro, index) => (
                        <li key={index} className="text-gray-700">{pro}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No pros listed.</p>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Cons</h3>
                <div>
                  {cons && cons.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {cons.map((con, index) => (
                        <li key={index} className="text-gray-700">{con}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No cons listed.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
           
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetails;
