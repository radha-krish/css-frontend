import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Comparison = ({ productId, category }) => {
  const [productToCompare, setProductToCompare] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const sortBy = 'rating'; // Sorting parameter
  const limit = 4; // Total number of products to fetch

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://css-backend-wvn4.onrender.com/api/admin/product/${productId}?type=${encodeURIComponent(category)}`);
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
        const response = await fetch(`https://css-backend-wvn4.onrender.com/api/admin/products?latest=true&sortBy=${sortBy}&limit=${limit}&type=${encodeURIComponent(category)}`);
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

  // Filter out the product to compare from the list
  const otherProducts = [productToCompare, ...products.filter(product => product._id !== productId)];

  const renderFeatures = (product) => {
    switch (product.subcategory) {
      case 'DomeCameras':
      case 'BulletCameras':
      case 'WeatherproofCameras':
      case 'PTZCameras':
        return (
          <>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Resolution</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.resolution}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Connectivity</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.connectivity}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Storage</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.storage}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Optical Zoom</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.opticalZoom}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Night Vision Range</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.nightVisionRange}</td>
              ))}
            </tr>
            {/* Add other features similarly */}
          </>
        );
      case 'NVRSystems':
      case 'DVRSystems':
        return (
          <>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Resolution</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.resolution}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Number of Channels</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.numberOfChannels}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Storage</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.storage}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Recording Modes</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.recordingModes}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Compression Formats</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.compressionFormats}</td>
              ))}
            </tr>
            {/* Add other features similarly */}
          </>
        );
      case 'MountsBrackets':
        return (
          <>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Material</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.material}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Adjustability</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.adjustability}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Compatibility</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.compatibility}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Weight Capacity</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.weightCapacity}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Installation Ease</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.installationEase}</td>
              ))}
            </tr>
            {/* Add other features similarly */}
          </>
        );
      case 'CablesConnectors':
        return (
          <>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Type</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.type}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Length</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.length}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Material</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.material}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Compatibility</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.compatibility}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Shielding</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.shielding}</td>
              ))}
            </tr>
            {/* Add other features similarly */}
          </>
        );
      case 'CompleteSurveillanceKits':
      case 'DIYKits':
        return (
          <>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Number of Cameras</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.numberOfCameras}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Storage Capacity</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.storageCapacity}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Accessories Included</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.accessoriesIncluded.join(', ')}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Installation Type</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.installationType}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Customization Options</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.customizationOptions?.join(', ') || 'N/A'}</td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Installation Instructions</td>
              {otherProducts.map(p => (
                <td key={p._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.installationInstructions || 'N/A'}</td>
              ))}
            </tr>
            {/* Add other features similarly */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="comparison-container p-4">
      {error && <p className="text-red-500">{error}</p>}
      {productToCompare && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Comparison for {productToCompare.name}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                  {otherProducts.map(product => (
                    <th key={product._id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Image</td>
                  {otherProducts.map(product => (
                    <td key={product._id} className="px-6 py-4 whitespace-nowrap">
                     <a href={
                       '/product/${product._id}'
                     }>
                     
                      <img
                        src={product.imageUrls[0] || 'https://via.placeholder.com/150'}
                        alt={product.name}
                        className="w-32 object-cover rounded"  // Adjust size as needed
                      />
                     </a>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Price</td>
                  {otherProducts.map(product => (
                    <td key={product._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{product.price}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rating</td>
                  {otherProducts.map(product => (
                    <td key={product._id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.adminRating}
                    </td>
                  ))}
                </tr>
                {productToCompare && renderFeatures(productToCompare)}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comparison;
