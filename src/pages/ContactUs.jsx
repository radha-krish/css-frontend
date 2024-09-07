import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../components/Nabbar'; //
import { toast } from 'react-toastify'; //
import Footer from '../components/Footer';
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Replace with your actual endpoint
      const response = await fetch('https://css-backend-wvn4.onrender.com/api/user/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Your message has been sent!');
        setFormData({ name: '', email: '', phone: '' });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="bg-gray-100 text-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-700">We provide comprehensive CCTV product reviews and installation services. Get in touch with us for any inquiries or support.</p>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Contact Form */}
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                  />
                  {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone Number"
                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
                  />
                  {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                </div>

                <button
                  type="submit"
                  className={`w-full p-3 rounded-md bg-gray-600 text-white ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-500'}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="md:w-1/2">
              <h2 className="text-xl font-semibold mb-4">Our Location</h2>
              <div className="relative w-full h-64 rounded-md overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3458.7375931886887!2d80.64122!3d16.54325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35d8a4d7e9e0c3%3A0x8a849c6bff56962d!2sCybersecurity%20Company!5e0!3m2!1sen!2sus!4v1631109030912!5m2!1sen!2sus"
                  style={{ border: 0 }}
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
                <div className="absolute top-0 left-0 p-4 text-white bg-gray-900 bg-opacity-75 rounded-br-md">
                  <FaMapMarkerAlt size={24} />
                  <p className="mt-1">Cyber Survillance Services, Azith Singh Nagar,Vijayawada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ContactUs;
