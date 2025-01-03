import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import imageupload from './imageupload';

const BlogForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);



  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mainImageUrl: '',
    sections: [{ subheading: '', content: '', images:'', mainPoints: [''] }],
    referenceLinks: [{ name: '', link: '' }],
    productLinks: [{ name: '', link: '' }],
    keywords: [''],
    author: '',
  });

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

  const checkTokenExpiry = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
  };
  async function onimgchange(e, ind) {
    const img = e.target.files[0];
    if (!img) return; // Ensure an image is selected

    try {
        const imgdata = await imageupload(img);
        const presurl = imgdata.url;
        console.log("img url ",presurl);

        // Update the specific section's image URL
        const newSections = [...formData.sections];
        newSections[ind].images = presurl; // Set the image URL at the specified index

        setFormData((prevState) => ({
            ...prevState,
            sections: newSections,
        }));
        console.log("form data is",formData);
    } catch (error) {
        console.error("Image upload failed", error);
        // Handle any error if needed
    }
}
async function onmainchange(e){
  const mainimg = e.target.files[0];
  if (!mainimg) return;
  try{
    const mainimgdata=await imageupload(mainimg);
    const mainurl=mainimgdata.url;
    setFormData((prev)=>{
      return{
        ...prev,
        mainImageUrl:mainurl
      }
    })
  }
  catch(error){
    console.log("main image error",error.message)
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state


    const token = localStorage.getItem('admin-token');

    if (!token || checkTokenExpiry(token)) {
      alert('Your session has expired. Please log in again.');
      localStorage.removeItem('admin-token');
      navigate('/admin/login');
      setLoading(false); // Reset loading state
      return;
    }

    try {
      const response = await fetch('https://css-backend-wvn4.onrender.com/api/adminBlog/create', {
        method: 'POST',
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
        alert('Blog created successfully');
        setFormData({
          title: '',
          content: '',
          mainImageUrl: '',
          sections: [{ subheading: '', content: '', image: '', mainPoints: [''] }],
          referenceLinks: [{ name: '', link: '' }],
          productLinks: [{ name: '', link: '' }],
          keywords: [''],
          author: '',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit blog');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-4 bg-gray-100 rounded-lg pb-14 md:pb-4">
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

      {/* Main Content */}
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

      {/* Main Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-800">Main Image URL</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          name="mainImageUrl"
          // value={formData.mainImageUrl}
          onChange={onmainchange}
          className="block w-full px-3 py-2 mt-1 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Sections */}
      {formData.sections.map((section, index) => (
        <div key={index} className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">Section {index + 1}</label>
          <input
            type="text"
            value={section.subheading}
            onChange={(e) => handleSectionChange(e, index, 'subheading')}
            className="block w-full px-3 py-2 mt-1 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Subheading"
            required
          />
          <textarea
            value={section.content}
            onChange={(e) => handleSectionChange(e, index, 'content')}
            className="block w-full px-3 py-2 mt-1 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
            rows="3"
            placeholder="Content for this section"
            required
          />
          <input
            type="file"
            // value={section.image}
            accept="image/png, image/jpeg"
            onChange={(e)=>{onimgchange(e,index)}}
            className="block w-full px-3 py-2 mt-1 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Image URL for this section"
          />

          {/* Main Points */}
          <label className="block text-sm font-medium text-gray-800">Main Points</label>
          {section.mainPoints.map((point, pointIndex) => (
            <div key={pointIndex} className="flex items-center space-x-2">
              <input
                type="text"
                value={point}
                onChange={(e) => handleMainPointsChange(e, index, pointIndex)}
                className="block w-full px-3 py-2 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder={`Main Point ${pointIndex + 1}`}
              />
              <button type="button" onClick={() => handleRemoveMainPoint(index, pointIndex)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddMainPoint(index)} className="text-blue-500">Add Main Point</button>
        </div>
      ))}
      <div className=' flex justify-between'>

      <button type="button" onClick={handleAddSection} className="text-blue-800 font-semibold italic">Add Section</button>
      <button type="button" onClick={() => handleRemoveSection(index)} className="text-red-800 font-semibold italic">Remove Section</button>
      </div>

      {/* Reference Links */}
      <h3 className="text-lg font-medium text-gray-800">Reference Links</h3>
      {formData.referenceLinks.map((link, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            value={link.name}
            onChange={(e) => handleReferenceLinkChange(e, index, 'name')}
            className="block w-full px-3 py-2 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Name"
          />
          <input
            type="url"
            value={link.link}
            onChange={(e) => handleReferenceLinkChange(e, index, 'link')}
            className="block w-full px-3 py-2 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Link "
          />
          <button type="button" onClick={() => handleRemoveReferenceLink(index)} className="text-red-500">Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddReferenceLink} className="text-blue-500">Add Reference Link</button>

      {/* Product Links */}
      <h3 className="text-lg font-medium text-gray-800">Product Links</h3>
      {formData.productLinks.map((link, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            value={link.name}
            onChange={(e) => handleProductLinkChange(e, index, 'name')}
            className="block w-full px-3 py-2 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder=" Name"
          />
          <input
            type="url"
            value={link.link}
            onChange={(e) => handleProductLinkChange(e, index, 'link')}
            className="block w-full px-3 py-2 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Link"
          />
          <button type="button" onClick={() => handleRemoveProductLink(index)} className="text-red-500">Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddProductLink} className="text-blue-500">Add Product Link</button>

      {/* Keywords */}
      <h3 className="text-lg font-medium text-gray-800">Keywords</h3>
      {formData.keywords.map((keyword, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            value={keyword}
            onChange={(e) => handleArrayChange(e, index, 'keywords')}
            className="block w-full px-3 py-2 rounded-md border-gray-400 border-2 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder={`Keyword ${index + 1}`}
          />
          <button type="button" onClick={() => handleRemoveField('keywords', index)} className="text-red-500">Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => handleAddField('keywords')} className="text-blue-500">Add Keyword</button>

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
      <button
        type="submit"
        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default BlogForm;
