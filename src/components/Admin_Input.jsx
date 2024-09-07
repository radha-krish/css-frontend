import React, { useState } from 'react';

import {jwtDecode} from 'jwt-decode';
 // Install this with npm install jwt-decode
import { useNavigate } from 'react-router-dom'; // A

// Categories and subcategories
const categories = [
  'Indoor Cameras',
  'Outdoor Cameras',
  'NVR/DVR Systems',
  'Camera Accessories',
  'Security Kits'
];

const subcategories = {
  'Indoor Cameras': ['DomeCameras', 'BulletCameras'],
  'Outdoor Cameras': ['WeatherproofCameras', 'PTZCameras'],
  'NVR/DVR Systems': ['NVRSystems', 'DVRSystems'],
  'Camera Accessories': ['MountsBrackets', 'CablesConnectors'],
  'Security Kits': ['CompleteSurveillanceKits', 'DIYKits']
};

const ProductForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    name: '',
    description: '',
    price: '',
    company: '',
    adminRating: '',
    adminReview: '',
    afiliateLink:'',
    pros: ['', '', '', '', ''],
    cons: ['', '', '', '', ''],
    keywords:[''],
    imageUrls: [''],// Initialize with one empty string for the first URL
    resolution: '',
    connectivity: '',
    storage: '',
    opticalZoom: '',
    nightVisionRange: '',
    formFactor: '',
    audio: '',
    fieldOfView: '',
    photoSensorTechnology: '',
    waterResistance: '',
    operatingSystem: '',
    mountingType: '',
    videoCaptureResolution: '',
    colour: '',
    numberOfItems: '',
    includedComponents: '',
    numberOfChannels: '',
    remoteAccess: '',
    recordingModes: '',
    compressionFormats: '',
    integration: '',
    audioSupport: '',
    alarmInputsOutputs: '',
    material: '',
    adjustability: '',
    compatibility: '',
    weightCapacity: '',
    installationEase: '',
    length: '',
    shielding: '',
    numberOfCameras: '',
    storageCapacity: '',
    accessoriesIncluded: '',
    installationType: '',
    cameraTypes: '',
    customizationOptions: '',
    installationInstructions: ''
    
  });

  const [categoryFeatures, setCategoryFeatures] = useState({});
  const [showFeatures, setShowFeatures] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Handle category change
    if (name === 'category') {
      setFormData(prevState => ({
        ...prevState,
        subcategory: '' // Reset subcategory when category changes
      }));

      // Update category features
      switch (value) {
        case 'Indoor Cameras':
          setCategoryFeatures({
            DomeCameras: ['resolution', 'connectivity', 'storage', 'opticalZoom', 'nightVisionRange', 'formFactor', 'audio', 'fieldOfView', 'photoSensorTechnology', 'waterResistance', 'operatingSystem', 'mountingType', 'videoCaptureResolution', 'colour', 'numberOfItems', 'includedComponents'],
            BulletCameras: ['resolution', 'connectivity', 'storage', 'opticalZoom', 'nightVisionRange', 'formFactor', 'audio', 'fieldOfView', 'photoSensorTechnology', 'waterResistance', 'operatingSystem', 'mountingType', 'videoCaptureResolution', 'colour', 'numberOfItems', 'includedComponents']
          });
          break;
        case 'Outdoor Cameras':
          setCategoryFeatures({
            WeatherproofCameras: ['resolution', 'connectivity', 'storage', 'opticalZoom', 'nightVisionRange', 'formFactor', 'audio', 'fieldOfView', 'photoSensorTechnology', 'waterResistance', 'operatingSystem', 'mountingType', 'videoCaptureResolution', 'colour', 'numberOfItems', 'includedComponents'],
            PTZCameras: ['resolution', 'connectivity', 'storage', 'opticalZoom', 'nightVisionRange', 'formFactor', 'audio', 'fieldOfView', 'photoSensorTechnology', 'waterResistance', 'operatingSystem', 'mountingType', 'videoCaptureResolution', 'colour', 'numberOfItems', 'includedComponents']
          });
          break;
        case 'NVR/DVR Systems':
          setCategoryFeatures({
            NVRSystems: ['resolution', 'numberOfChannels', 'storage', 'remoteAccess', 'recordingModes', 'compressionFormats', 'integration', 'audioSupport', 'alarmInputsOutputs'],
            DVRSystems: ['resolution', 'numberOfChannels', 'storage', 'recordingModes', 'playbackFeatures', 'compressionFormats', 'remoteAccess', 'integration', 'audioSupport']
          });
          break;
        case 'Camera Accessories':
          setCategoryFeatures({
            MountsBrackets: ['material', 'adjustability', 'compatibility', 'weightCapacity', 'installationEase'],
            CablesConnectors: ['type', 'length', 'material', 'compatibility', 'shielding']
          });
          break;
        case 'Security Kits':
          setCategoryFeatures({
            CompleteSurveillanceKits: ['numberOfCameras', 'storageCapacity', 'accessoriesIncluded', 'installationType', 'cameraTypes'],
            DIYKits: ['numberOfCameras', 'accessoriesIncluded', 'customizationOptions', 'installationInstructions']
          });
          break;
        default:
          setCategoryFeatures({});
      }
      setShowFeatures([]); // Clear features when category changes
    }

    // Handle subcategory change
    if (name === 'subcategory') {
      setShowFeatures(categoryFeatures[value] || []);
    }
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData({ ...formData, [field]: newArray });
  };
  const handleAddUrl = () => {
    setFormData(prevState => ({
      ...prevState,
      imageUrls: [...prevState.imageUrls, ''] // Add a new empty string for a new input field
    }));
  };

  const handleAddKeyword = () => {
    setFormData(prevState => ({
      ...prevState,
      keywords: [...prevState.keywords, ''] // Add a new empty string for a new input field
    }));
  };
  const handleRemoveUrl = (index) => {
    const newArray = [...formData.imageUrls];
    newArray.splice(index, 1); // Remove the URL at the given index
    setFormData({ ...formData, imageUrls: newArray });
  };
  const handleRemoveKeyword = (index) => {
    const newArray = [...formData.keywords];
    newArray.splice(index, 1); // Remove the URL at the given index
    setFormData({ ...formData, keywords: newArray });
  };

  const validateUrl = (url) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // Protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // Domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
      '(\\#[-a-z\\d_]*)?$' + // Fragment locator
      '\\.(jpg|jpeg|png|gif)$', // Image file extensions
      'i' // Case-insensitive flag
    );
    return !!urlPattern.test(url);
  };
  
  
  const checkTokenExpiry = (token) => {
    try {
      const decodedToken = jwtDecode(token); 
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true; // If token can't be decoded, treat it as expired
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     // Validate image URLs
    //  const isValid = formData.imageUrls.every(url => validateUrl(url));
    //  if (!isValid) {
    //    alert('Please enter valid URLs for all images.');
    //    return;
    //  }

    // Transform formData based on subcategory
    const transformedData = {
      ...formData,
      // Adjust the transformation according to the subcategory
      type: formData.subcategory, 
    };

    console.log(transformedData);
    try {
      const token = localStorage.getItem('admin-token');
      
      // Check if the token has expired
      if (!token || checkTokenExpiry(token)) {
        alert('Your Session expired. Please log in again.');
        localStorage.removeItem('admin-token'); // Remove the token
        navigate('/admin/login'); // Redirect to login
        return;
      }
      const res = await fetch('https://css-backend-wvn4.onrender.com/api/admin/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(transformedData),
      });
      const response= await res.json();

console.log(response)
      if (response.error) {
        alert(response.message)

        // throw new Error('Network response was not ok');
      }
      else{
        alert(response.message)

      }

      // Handle response here, such as clearing the form or displaying a success message
      setFormData({
        category: '',
        subcategory: '',
        name: '',
        description: '',
        price: '',
        company: '',
        adminRating: '',
        adminReview: '',
        afiliateLink:'',
        pros: ['', '', '', '', ''],
        cons: ['', '', '', '', ''],
        keywords:[''],
    imageUrls: [''],// Initialize with one empty string for the first URL

        resolution: '',
        connectivity: '',
        storage: '',
        opticalZoom: '',
        nightVisionRange: '',
        formFactor: '',
        audio: '',
        fieldOfView: '',
        photoSensorTechnology: '',
        waterResistance: '',
        operatingSystem: '',
        mountingType: '',
        videoCaptureResolution: '',
        colour: '',
        numberOfItems: '',
        includedComponents: '',
        numberOfChannels: '',
        remoteAccess: '',
        recordingModes: '',
        compressionFormats: '',
        integration: '',
        audioSupport: '',
        alarmInputsOutputs: '',
        material: '',
        adjustability: '',
        compatibility: '',
        weightCapacity: '',
        installationEase: '',
        length: '',
        shielding: '',
        numberOfCameras: '',
        storageCapacity: '',
        accessoriesIncluded: '',
        installationType: '',
        cameraTypes: '',
        customizationOptions: '',
        installationInstructions: ''
      });
    } 
    catch (error) {
      console.error('Error:', error);
      alert('Failed to add product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-10 p-4 max-w-4xl mx-auto bg-gray-200 rounded-lg shadow-md">
      {/* Category */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-800">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="block w-full py-3 px-4 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
          required
        >
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Subcategory */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-800">Subcategory</label>
        <select
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          className="block w-full py-3 px-4 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
          required
        >
          <option value="">Select a subcategory</option>
          {subcategories[formData.category]?.map(subcategory => (
            <option key={subcategory} value={subcategory}>{subcategory}</option>
          ))}
        </select>
      </div>

      {/* Name */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-800">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full py-3 px-4 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
          required
        />
      </div>

      {/* Company */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-800">Company</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="block w-full py-3 px-4 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
        />
      </div>

      {/* Price */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-800">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="block w-full py-3 px-4 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
          required
        />
      </div>

      {/* adminRating */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-800">Admin Rating</label>
        <input
          type="number"
          name="adminRating"
          value={formData.adminRating}
          onChange={handleChange}
          className="block w-full py-3 px-4 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
          required
        />
      </div>
      {/* AfiliateLink */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-800">Afiliate Link</label>
        <input
          type="text"
          name="afiliateLink"
          value={formData.afiliateLink}
          onChange={handleChange}
          className="block w-full py-3 px-4 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
          required
        />
      </div>
      {/* Description */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-800">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="block w-full py-3 px-4 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
          rows="4"
        />
      </div>

      {/* Admin Review */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-800">Admin Review</label>
        <textarea
          name="adminReview"
          value={formData.adminReview}
          onChange={handleChange}
          className="block w-full py-3 px-4 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
          rows="4"
        />
      </div>

      {/* Dynamic Feature Fields */}
      {showFeatures.length > 0 && (
        <div className="space-y-6">
          {showFeatures.map((feature) => (
            <div key={feature} className="space-y-1">
              <label className="block text-sm font-medium text-gray-800 capitalize">{feature.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="text"
                name={feature}
                value={formData[feature] || ''}
                onChange={handleChange}
                className="block w-full py-3 px-4 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
              />
            </div>
          ))}
        </div>
      )}

      {/* Pros and Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-800">Pros</label>
          {formData.pros.map((pros, index) => (
            <input
              key={index}
              type="text"
              value={pros}
              onChange={(e) => handleArrayChange(e, index, 'pros')}
              className="block w-full py-3 px-4 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
              placeholder={`Pros #${index + 1}`}
            />
          ))}
        </div>

        {/* Cons */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-800">Cons</label>
          {formData.cons.map((cons, index) => (
            <input
              key={index}
              type="text"
              value={cons}
              onChange={(e) => handleArrayChange(e, index, 'cons')}
              className="block w-full py-3 px-4 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
              placeholder={`Cons #${index + 1}`}
            />
          ))}
        </div>
      </div>
 {/* Keywords URLs */}
 <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-800">Keywords</label>
        {formData.keywords.map((url, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={url}
              onChange={(e) => handleArrayChange(e, index, 'keywords')}
              className="block w-full py-3 px-4 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
              placeholder={`#keyword${index + 1}`}
            />
            {formData.keywords.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveKeyword(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddKeyword}
          className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm"
        >
          Add another keyword
        </button>
      </div>


      {/* Image URLs */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-800">Image URLs</label>
        {formData.imageUrls.map((url, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={url}
              onChange={(e) => handleArrayChange(e, index, 'imageUrls')}
              className="block w-full py-3 px-4 mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
              placeholder={`Image URL #${index + 1}`}
            />
            {formData.imageUrls.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveUrl(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddUrl}
          className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm"
        >
          Add another URL
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
