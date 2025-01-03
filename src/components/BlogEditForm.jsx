import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import imageupload from './imageupload';

const EditBlogForm = () => {
  const { id } = useParams(); // Blog ID from the URL params
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mainImageUrl: '',
    sections: [{ subheading: '', content: '', images: '', mainPoints: [''] }],
    referenceLinks: [{ name: '', link: '' }],
    productLinks: [{ name: '', link: '' }],
    keywords: [''],
    author: '',
  });

  // Fetch existing blog data when the component mounts
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const token = localStorage.getItem('admin-token');
        const response = await fetch(`http://localhost:3000/api/adminBlog/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const blogData = await response.json();
        setFormData(blogData.data); // Populate form with existing blog data
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSectionChange = (e, index, field) => {
    const newSections = [...formData.sections];
    newSections[index][field] = e.target.value;
    setFormData({ ...formData, sections: newSections });
  };

  const handleMainPointsChange = (e, sectionIndex, pointIndex) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].mainPoints[pointIndex] = e.target.value;
    setFormData({ ...formData, sections: newSections });
  };

  const handleAddMainPoint = (sectionIndex) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].mainPoints.push('');
    setFormData({ ...formData, sections: newSections });
  };

  const handleRemoveMainPoint = (sectionIndex, pointIndex) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].mainPoints.splice(pointIndex, 1);
    setFormData({ ...formData, sections: newSections });
  };

  const handleAddSection = () => {
    setFormData((prevState) => ({
      ...prevState,
      sections: [...prevState.sections, { subheading: '', content: '', images: '', mainPoints: [''] }],
    }));
  };

  const handleRemoveSection = (index) => {
    const newSections = [...formData.sections];
    newSections.splice(index, 1);
    setFormData({ ...formData, sections: newSections });
  };

  const handleReferenceLinkChange = (e, index, field) => {
    const newLinks = [...formData.referenceLinks];
    newLinks[index][field] = e.target.value;
    setFormData({ ...formData, referenceLinks: newLinks });
  };

  const handleAddReferenceLink = () => {
    setFormData((prevState) => ({
      ...prevState,
      referenceLinks: [...prevState.referenceLinks, { name: '', link: '' }],
    }));
  };

  const handleRemoveReferenceLink = (index) => {
    const newLinks = [...formData.referenceLinks];
    newLinks.splice(index, 1);
    setFormData({ ...formData, referenceLinks: newLinks });
  };

  const handleProductLinkChange = (e, index, field) => {
    const newLinks = [...formData.productLinks];
    newLinks[index][field] = e.target.value;
    setFormData({ ...formData, productLinks: newLinks });
  };

  const handleAddProductLink = () => {
    setFormData((prevState) => ({
      ...prevState,
      productLinks: [...prevState.productLinks, { name: '', link: '' }],
    }));
  };

  const handleRemoveProductLink = (index) => {
    const newLinks = [...formData.productLinks];
    newLinks.splice(index, 1);
    setFormData({ ...formData, productLinks: newLinks });
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleAddField = (field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: [...prevState[field], ''],
    }));
  };

  const handleRemoveField = (field, index) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const onimgchange = async (e, ind) => {
    const img = e.target.files[0];
    if (!img) return; // Ensure an image is selected

    try {
      const imgdata = await imageupload(img);
      const presurl = imgdata.url;

      // Update the specific section's image URL
      const newSections = [...formData.sections];
      newSections[ind].images = presurl;

      setFormData({ ...formData, sections: newSections });
    } catch (error) {
      console.error('Image upload failed', error);
    }
  };

  const onmainchange = async (e) => {
    const mainimg = e.target.files[0];
    if (!mainimg) return;
    try {
      const mainimgdata = await imageupload(mainimg);
      const mainurl = mainimgdata.url;
      setFormData((prev) => ({
        ...prev,
        mainImageUrl: mainurl,
      }));
    } catch (error) {
      console.error('Main image upload failed', error.message);
    }
  };

  const checkTokenExpiry = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('admin-token');

    if (!token || checkTokenExpiry(token)) {
      alert('Your session has expired. Please log in again.');
      localStorage.removeItem('admin-token');
      navigate('/admin/login');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/adminBlog/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.error) {
        alert(result.message);
      } else {
        alert('Blog updated successfully');
        navigate(`/admin/blog/${id}`); // Navigate to blog details page
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-4 bg-gray-100 rounded-lg">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-800">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
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
          className="block w-full px-3 py-2 mt-1 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
          rows="4"
          required
        />
      </div>

      {/* Main Image */}
      <div>
        <label className="block text-sm font-medium text-gray-800">Main Image URL</label>
        <input
          type="file"
          name="mainImageUrl"
          onChange={onmainchange}
          className="block w-full px-3 py-2 mt-1 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {/* Sections */}
      <div>
        <label className="block text-sm font-medium text-gray-800">Sections</label>
        {formData.sections.map((section, index) => (
          <div key={index} className="space-y-2 border-2 p-3 my-3">
            <input
              type="text"
              name={`subheading-${index}`}
              value={section.subheading}
              onChange={(e) => handleSectionChange(e, index, 'subheading')}
              placeholder="Subheading"
              className="block w-full px-3 py-2 mt-1 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            <textarea
              name={`content-${index}`}
              value={section.content}
              onChange={(e) => handleSectionChange(e, index, 'content')}
              placeholder="Section content"
              rows="3"
              className="block w-full px-3 py-2 mt-1 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            <label className="block text-sm font-medium text-gray-800">Section Image</label>
            <input
              type="file"
              name={`sectionImage-${index}`}
              onChange={(e) => onimgchange(e, index)}
              className="block w-full px-3 py-2 mt-1 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
            />

            {/* Main Points */}
            <div>
              <label className="block text-sm font-medium text-gray-800">Main Points</label>
              {section.mainPoints.map((point, pointIndex) => (
                <div key={pointIndex} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    name={`mainPoint-${index}-${pointIndex}`}
                    value={point}
                    onChange={(e) => handleMainPointsChange(e, index, pointIndex)}
                    className="block w-full px-3 py-2 mt-1 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                  {section.mainPoints.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMainPoint(index, pointIndex)}
                      className="text-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => handleAddMainPoint(index)} className="text-blue-600">
                Add Main Point
              </button>
            </div>

            {formData.sections.length > 1 && (
              <button type="button" onClick={() => handleRemoveSection(index)} className="text-red-600">
                Remove Section
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddSection} className="text-blue-600">
          Add Section
        </button>
      </div>

      {/* Reference Links */}
      <div>
        <label className="block text-sm font-medium text-gray-800">Reference Links</label>
        {formData.referenceLinks.map((link, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              name={`refLinkName-${index}`}
              value={link.name}
              onChange={(e) => handleReferenceLinkChange(e, index, 'name')}
              placeholder="Link Name"
              className="block w-full px-3 py-2 mt-1 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            <input
              type="url"
              name={`refLinkUrl-${index}`}
              value={link.link}
              onChange={(e) => handleReferenceLinkChange(e, index, 'link')}
              placeholder="Link URL"
              className="block w-full px-3 py-2 mt-1 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {formData.referenceLinks.length > 1 && (
              <button type="button" onClick={() => handleRemoveReferenceLink(index)} className="text-red-600">
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddReferenceLink} className="text-blue-600">
          Add Reference Link
        </button>
      </div>

      {/* Product Links */}
      <div>
        <label className="block text-sm font-medium text-gray-800">Product Links</label>
        {formData.productLinks.map((link, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              name={`productLinkName-${index}`}
              value={link.name}
              onChange={(e) => handleProductLinkChange(e, index, 'name')}
              placeholder="Product Name"
              className="block w-full px-3 py-2 mt-1 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            <input
              type="url"
              name={`productLinkUrl-${index}`}
              value={link.link}
              onChange={(e) => handleProductLinkChange(e, index, 'link')}
              placeholder="Product URL"
              className="block w-full px-3 py-2 mt-1 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {formData.productLinks.length > 1 && (
              <button type="button" onClick={() => handleRemoveProductLink(index)} className="text-red-600">
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddProductLink} className="text-blue-600">
          Add Product Link
        </button>
      </div>

      {/* Keywords */}
      <div>
        <label className="block text-sm font-medium text-gray-800">Keywords</label>
        {formData.keywords.map((keyword, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <input
              type="text"
              name={`keyword-${index}`}
              value={keyword}
              onChange={(e) => handleArrayChange(e, index, 'keywords')}
              placeholder="Keyword"
              className="block w-full px-3 py-2 mt-1 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
            {formData.keywords.length > 1 && (
              <button type="button" onClick={() => handleRemoveField('keywords', index)} className="text-red-600">
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => handleAddField('keywords')} className="text-blue-600">
          Add Keyword
        </button>
      </div>

      {/* Author */}
      <div>
        <label className="block text-sm font-medium text-gray-800">Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="block w-full px-3 py-2 mt-1 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Blog'}
        </button>
      </div>
    </form>
  );
};

export default EditBlogForm;
