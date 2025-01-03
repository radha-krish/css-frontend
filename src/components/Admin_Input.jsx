import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: '',
    name: '',
    subcategory:"",
    description: '',
    price: '',
    company: '',
    adminRating: '',
    adminReview: '',
    affiliateLink: '',
    pros: ['', '', '', '', ''],
    cons: ['', '', '', '', ''],
    keywords: [''],
    imageUrls: [''],
    features: [{ featureName: '', featureValue: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleAddItem = (field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: [...prevState[field], ''],
    }));
  };

  const handleRemoveItem = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleAddFeature = () => {
    setFormData((prevState) => ({
      ...prevState,
      features: [...prevState.features, { featureName: '', featureValue: '' }],
    }));
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleFeatureChange = (index, field, value) => {
    const newFeatures = formData.features.map((feature, i) =>
      i === index ? { ...feature, [field]: value } : feature
    );
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      // Validation
  const { category, subcategory, name, description, price, company, adminRating, affiliateLink, adminReview } = formData;
  if (!category || !subcategory ||!name || !description || !price || !company || !adminRating || !affiliateLink || !adminReview) {
    alert('Please fill out all mandatory fields.');
    return;
  }
  
  if (adminRating < 1 || adminRating > 5) {
    alert('Admin rating must be between 1 and 5.');
    return;
  }

    try {
      const token = localStorage.getItem('admin-token');
      if (!token || checkTokenExpiry(token)) {
        alert('Your session expired. Please log in again.');
        localStorage.removeItem('admin-token');
        navigate('/admin/login');
        return;
      }
      const filteredData = {
        ...formData,
        category: formData.category.replace(/\s+/g, ''),
        subcategory: formData.subcategory.replace(/\s+/g, ''),
        pros: formData.pros.filter(pro => pro.trim() !== ''),
        cons: formData.cons.filter(con => con.trim() !== ''),
        keywords: formData.keywords.filter(keyword => keyword.trim() !== ''),
        imageUrls: formData.imageUrls.filter(url => url.trim() !== ''),
      };
      const res = await fetch('http://localhost:3000/api/admin/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ token}`,
        },
        body: JSON.stringify(filteredData),
      });

      const response = await res.json();
      alert(response.message);

      if (!response.error) {
        setFormData({
          category: '',
          name: '',
          subcategory:"",
          description: '',
          price: '',
          company: '',
          adminRating: '',
          adminReview: '',
          affiliateLink: '',
          pros: ['', '', '', '', ''],
          cons: ['', '', '', '', ''],
          keywords: [''],
          imageUrls: [''],
          features: [{ featureName: '', featureValue: '' }],
        });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add product');
    }
  };

  const checkTokenExpiry = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-10 p-4 max-w-4xl mx-auto bg-gray-100 rounded-lg ">
      {/* Category, Name, Price, Description, Company */}
      {["name",'category',  "subcategory",'price', 'description', 'company', 'adminRating', 'adminReview', 'affiliateLink'].map((field, index) => (
        <div className="space-y-1" key={index}>
          <label className="block text-sm font-medium text-gray-800">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          {field === 'description' ? (
            <textarea
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="block w-full py-3 px-4 mt-1 rounded-md border-gray-400 border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
              rows="4"
              required
            />
          ) : (
            <input
              type={
                field === 'affiliateLink' ? 'url' : // Check if the field is affiliateLink
                field === 'price' || field === 'adminRating' ? 'number' : 'text' // Default
                }
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="block w-full py-3 px-4 mt-1  bg-gray-100 rounded-md border-gray-400 border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
              required={field !== 'adminReview' && field !== 'affiliateLink'}
            />
          )}
        </div>
      ))}

      {/* Pros and Cons in a row for md and above */}
      <div className="md:flex md:gap-4">
        {/* Pros */}
        <div className="space-y-1 flex-1">
          <label className="block text-sm font-medium text-gray-800">Pros</label>
          {formData.pros.map((pro, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Pro ${index + 1}`}
              value={pro}
              onChange={(e) => handleArrayChange(e, index, 'pros')}
              className="block w-full py-3 px-4 mt-1 rounded-md border-gray-400 border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
            />
          ))}
        </div>

        {/* Cons */}
        <div className="space-y-1 flex-1">
          <label className="block text-sm font-medium text-gray-800">Cons</label>
          {formData.cons.map((con, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Con ${index + 1}`}
              value={con}
              onChange={(e) => handleArrayChange(e, index, 'cons')}
              className="block w-full py-3 px-4 mt-1 rounded-md border-gray-400 border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
            />
          ))}
        </div>
      </div>

      {/* Keywords with Add/Remove */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-800">Keywords</label>
        {formData.keywords.map((keyword, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type="text"
              value={keyword}
              onChange={(e) => handleArrayChange(e, index, 'keywords')}
              placeholder={`Keyword ${index + 1}`}
              className="block w-full py-3 px-4 mt-1 rounded-md border-gray-400 border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
            />
            <button type="button" onClick={() => handleRemoveItem(index, 'keywords')} className="text-red-500 hover:text-red-700">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddItem('keywords')} className="text-blue-500 hover:text-blue-700">Add Keyword</button>
      </div>

      {/* Image URLs with Add/Remove */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-800">Image URLs</label>
        {formData.imageUrls.map((url, index) => (
          <div key={index} className="flex items-center gap-3">
            <input
              type='text'
              value={url}
              onChange={(e) => handleArrayChange(e, index, 'imageUrls')}
              placeholder={`Image URL ${index + 1}`}
              className="block w-full py-3 px-4 mt-1 rounded-md border-gray-400 border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
            />
            <button type="button" onClick={() => handleRemoveItem(index, 'imageUrls')} className="text-red-500 hover:text-red-700">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddItem('imageUrls')} className="text-blue-500 hover:text-blue-700">Add Image URL</button>
      </div>

      {/* Custom Features */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-800">Features</label>
        {formData.features.map((feature, index) => (
          <div key={index} className="flex gap-3">
            <input
              type="text"
              placeholder="Name"
              value={feature.featureName}
              onChange={(e) => handleFeatureChange(index, 'featureName', e.target.value)}
              className="block w-full py-3 px-4 mt-1 rounded-md border-gray-400 border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
            />
            <input
              type="text"
              placeholder=" Value"
              value={feature.featureValue}
              onChange={(e) => handleFeatureChange(index, 'featureValue', e.target.value)}
              className="block w-full py-3 px-4 mt-1 rounded-md border-gray-400 border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-800"
            />
            <button type="button" onClick={() => handleRemoveFeature(index)} className="text-red-500 hover:text-red-700">Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddFeature} className="text-blue-500 hover:text-blue-700">Add Feature</button>
      </div>

      <button type="submit" className=" p-3 bg-blue-100 text-gray-800 rounded-md hover:bg-blue-200">Submit</button>
    </form>
  );
};

export default ProductForm;
