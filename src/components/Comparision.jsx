import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Comparison = ({ productId, category }) => {
  const [productToCompare, setProductToCompare] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const sortBy = 'rating'; // Sorting parameter
  const limit = 5; // Total number of products to fetch

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://css-backend-wvn4.onrender.com/api/admin/product/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProductToCompare(data.product);
      } catch (error) {
        setError(error.message);
        toast.error(`Failed to fetch product: ${error.message}`);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://css-backend-wvn4.onrender.com/api/admin/products?latest=true&sortBy=${sortBy}&limit=${limit}&category=${encodeURIComponent(category)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error.message);
        toast.error(`Failed to fetch products: ${error.message}`);
      }
    };

    fetchProduct();
    fetchProducts();
  }, [productId, category, sortBy, limit]);

  const otherProducts = products.filter(product => product._id !== productId);
  
  const uniqueFeatures = new Set();
  otherProducts.forEach(product => {
    product.features.forEach(feature => {
      uniqueFeatures.add(feature.featureName);
    });
  });

  return (
    <div className="comparison-container p-4">
      {error && <p className="text-red-500">{error}</p>}
      {productToCompare && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Comparison for {productToCompare.name}</h2>
          <div className="overflow-x-auto scrollbar-hide ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                  {/* Include the current product in the headers */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{productToCompare.name}</th>
                  {otherProducts.map(product => (
                    <th key={product._id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Image row */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Image</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/product/${productToCompare._id}`}>
                      <img
                        src={productToCompare.imageUrls[0] || 'https://via.placeholder.com/150'}
                        alt={productToCompare.name}
                        className="w-32 object-cover rounded"
                      />
                    </Link>
                  </td>
                  {otherProducts.map(product => (
                    <td key={product._id} className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/product/${product._id}`}>
                        <img
                          src={product.imageUrls[0] || 'https://via.placeholder.com/150'}
                          alt={product.name}
                          className="w-32 object-cover rounded"
                        />
                      </Link>
                    </td>
                  ))}
                </tr>
                
                {/* Price row */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Price</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{productToCompare.price}</td>
                  {otherProducts.map(product => (
                    <td key={product._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{product.price}
                    </td>
                  ))}
                </tr>
                
                {/* Rating row */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rating</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{productToCompare.adminRating}</td>
                  {otherProducts.map(product => (
                    <td key={product._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.adminRating}
                    </td>
                  ))}
                </tr>

                {/* Dynamic Features */}
                {[...uniqueFeatures].map((featureName) => (
                  <tr key={featureName}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{featureName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {productToCompare.features.find(f => f.featureName === featureName)?.featureValue || 'N/A'}
                    </td>
                    {otherProducts.map(product => {
                      const feature = product.features.find(f => f.featureName === featureName);
                      return (
                        <td key={product._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {feature ? feature.featureValue : 'N/A'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comparison;
