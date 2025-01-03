import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate, useParams } from 'react-router-dom';

const ProductEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the product ID from the URL
  const [formData, setFormData] = useState({
    category: '',
    subcategory:"",
    name: '',
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

  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);

  const fetchProductDetails = async (productId) => {
    try {
      const res = await fetch(`https://css-backend-wvn4.onrender.com/api/admin/product/${productId}`);
      const data = await res.json();
      if (!data.error) {
        setFormData({
            ...data.product // Ensure adminRating is parsed as a float
          });
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const checkTokenExpiry = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin-token');
    if (!token || checkTokenExpiry(token)) {
      alert('Your session expired. Please log in again.');
      localStorage.removeItem('admin-token');
      navigate('/admin/login');
      return;
    }

    const { category,  subcategory,name, description, price, company, adminRating, affiliateLink, adminReview } = formData;

    // Basic validation
    if (!category || !subcategory || !name || !description || !price || !company || !adminRating || !affiliateLink || !adminReview) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    if (adminRating < 1 || adminRating > 5) {
      alert('Admin rating must be between 1 and 5.');
      return;
    }

    try {
      const url = `https://css-backend-wvn4.onrender.com/api/admin/product/${id}`;
      const filteredData = {
        ...formData,
        category: formData.category.replace(/\s+/g, ''),
        pros: formData.pros.filter(pro => pro.trim() !== ''),
        cons: formData.cons.filter(con => con.trim() !== ''),
        keywords: formData.keywords.filter(keyword => keyword.trim() !== ''),
        imageUrls: formData.imageUrls.filter(url => url.trim() !== ''),
      };

      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(filteredData),
      });

      const response = await res.json();
      alert(response.message);

      if (!response.error) {
        navigate('/admin/products'); // Redirect after successful edit
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update product data.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-10 p-4 max-w-4xl mx-auto bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold">Edit Product</h2>
      <div>
        <label className="block mb-2" htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-2" htmlFor="category"> Sub Category</label>
        <input
          type="text"
          name="subcategory"
          value={formData.subcategory? formData.subcategory: ""}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2" htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2" htmlFor="description">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2" htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          min="1"
          step="0.1"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2" htmlFor="company">Company</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2" htmlFor="adminRating">Admin Rating (1-5)</label>
        <input
          type="number"
          name="adminRating"
          value={formData.adminRating}
          onChange={handleChange}
          min="1"
          max="5"
          step="0.5"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2" htmlFor="adminReview">Admin Review</label>
        <textarea
          name="adminReview"
          value={formData.adminReview}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-2" htmlFor="affiliateLink">Affiliate Link</label>
        <input
          type="url"
          name="affiliateLink"
          value={formData.affiliateLink}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      {/* Pros and Cons */}
      <div>
        <label className="block mb-2">Pros</label>
        {formData.pros.map((pro, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={pro}
              onChange={(e) => handleArrayChange(e, index, 'pros')}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(index, 'pros')}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem('pros')}
          className="text-blue-500"
        >
          Add Pro
        </button>
      </div>

      <div>
        <label className="block mb-2">Cons</label>
        {formData.cons.map((con, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={con}
              onChange={(e) => handleArrayChange(e, index, 'cons')}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(index, 'cons')}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem('cons')}
          className="text-blue-500"
        >
          Add Con
        </button>
      </div>

      {/* Keywords */}
      <div>
        <label className="block mb-2">Keywords</label>
        {formData.keywords.map((keyword, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={keyword}
              onChange={(e) => handleArrayChange(e, index, 'keywords')}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(index, 'keywords')}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem('keywords')}
          className="text-blue-500"
        >
          Add Keyword
        </button>
      </div>

      {/* Image URLs */}
      <div>
        <label className="block mb-2">Image URLs</label>
        {formData.imageUrls.map((imageUrl, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => handleArrayChange(e, index, 'imageUrls')}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(index, 'imageUrls')}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem('imageUrls')}
          className="text-blue-500"
        >
          Add Image URL
        </button>
      </div>

      {/* Features */}
      <div>
        <label className="block mb-2">Features</label>
        {formData.features.map((feature, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              placeholder="Feature Name"
              value={feature.featureName}
              onChange={(e) => handleFeatureChange(index, 'featureName', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Feature Value"
              value={feature.featureValue}
              onChange={(e) => handleFeatureChange(index, 'featureValue', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveFeature(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddFeature}
          className="text-blue-500"
        >
          Add Feature
        </button>
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded"
      >
        Update Product
      </button>
    </form>
  );
};

export default ProductEdit;
