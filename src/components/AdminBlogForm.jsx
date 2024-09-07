import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Install this with npm install jwt-decode

const BlogForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    subheadings: [''],
    contents: [''],
    imageUrls: [''],
    referenceLinks: [''],
    productLinks: [''],
    author: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleAddField = (field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: [...prevState[field], '']
    }));
  };

  const handleRemoveField = (field, index) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
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
    for (let i = 0; i < formData.subheadings.length; i++) {
        if (formData.subheadings[i].trim() !== '' && formData.contents[i].trim() === '') {
          alert(`Content for subheading ${i + 1} is missing.`);
          return; // Stop the form submission if validation fails
        }
      }
    
    const token = localStorage.getItem('admin-token');

    if (!token || checkTokenExpiry(token)) {
      alert('Your session has expired. Please log in again.');
      localStorage.removeItem('admin-token');
      navigate('/admin/login');
      return;
    }

    try {
      const response = await fetch('https://css-backend-wvn4.onrender.com/api/adminBlog/blogs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.error) {
        alert(result.message);
      } else {
        alert('Blog created successfully');
        setFormData({
          title: '',
          content: '',
          subheadings: [''],
          contents: [''],
          imageUrls: [''],
          referenceLinks: [''],
          productLinks: [''],
          author: ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit blog');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-4 bg-gray-100 shadow-md rounded-lg">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-800">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-800">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          rows="4"
          required
        />
      </div>

      {/* Subheadings and Contents */}
      {formData.subheadings.map((subheading, index) => (
        <div key={index} className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">Subheading {index + 1}</label>
          <input
            type="text"
            value={subheading}
            onChange={(e) => handleArrayChange(e, index, 'subheadings')}
            className="block w-full px-3 py-2 mt-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <textarea
            value={formData.contents[index]}
            onChange={(e) => handleArrayChange(e, index, 'contents')}
            className="block w-full px-3 py-2 mt-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            rows="3"
            placeholder="Content for this subheading"
          />
          <button
            type="button"
            onClick={() => handleRemoveField('subheadings', index)}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => handleAddField('subheadings')} className="text-blue-600 hover:text-blue-800">
        Add Subheading
      </button>

      {/* Image URLs */}
      {formData.imageUrls.map((imageUrl, index) => (
        <div key={index}>
          <label className="block text-sm font-medium text-gray-800">Image URL {index + 1}</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => handleArrayChange(e, index, 'imageUrls')}
            className="block w-full px-3 py-2 mt-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={() => handleRemoveField('imageUrls', index)}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => handleAddField('imageUrls')} className="text-blue-600 hover:text-blue-800">
        Add Image URL
      </button>

      {/* Reference Links */}
      {formData.referenceLinks.map((referenceLink, index) => (
        <div key={index}>
          <label className="block text-sm font-medium text-gray-800">Reference Link {index + 1}</label>
          <input
            type="text"
            value={referenceLink}
            onChange={(e) => handleArrayChange(e, index, 'referenceLinks')}
            className="block w-full px-3 py-2 mt-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={() => handleRemoveField('referenceLinks', index)}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => handleAddField('referenceLinks')} className="text-blue-600 hover:text-blue-800">
        Add Reference Link
      </button>

      {/* Product Links */}
      {formData.productLinks.map((productLink, index) => (
        <div key={index}>
          <label className="block text-sm font-medium text-gray-800">Product Link {index + 1}</label>
          <input
            type="text"
            value={productLink}
            onChange={(e) => handleArrayChange(e, index, 'productLinks')}
            className="block w-full px-3 py-2 mt-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={() => handleRemoveField('productLinks', index)}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => handleAddField('productLinks')} className="text-blue-600 hover:text-blue-800">
        Add Product Link
      </button>

      {/* Author */}
      <div>
        <label className="block text-sm font-medium text-gray-800">Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default BlogForm;
