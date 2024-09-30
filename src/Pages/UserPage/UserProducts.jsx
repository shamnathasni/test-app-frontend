import React, { useEffect, useState } from 'react';
import { productListing } from '../../Api/UserApi';

function UserProducts() {
  const [products, setProducts] = useState([]);
  console.log(products, "products");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productListing();
        console.log(response.data.products[0].images[0],"response.data.products.image");

        if (response) { // Check for success status
          setProducts(response.data.products); // Set the products array
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="h-screen p-6 text-white">
      {/* Heading Section */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold">List of Black T-shirts</h1>
        <div className="flex justify-center gap-3 mt-4">
          <button className="px-4 py-2 bg-blue-600 rounded-full">Recommended</button>
          <button className="px-4 py-2 bg-gray-700 rounded-full">Lowest Price</button>
          <button className="px-4 py-2 bg-gray-700 rounded-full">Top Rated</button>
        </div>
      </div>

      {/* Product Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product._id} className="bg-gray-800 rounded-lg p-4">
            <img
              key={product.index}
              sizes=""
              className="w-full h-64 object-cover rounded-lg"
            src={`http://localhost:3000/uploads/${product.images[0].split('/').pop()}`} // Constructing the correct URL
            alt="Product Image"
            />
            <div className="mt-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="mt-2 text-lg">₹{product.price}</p>
              <div className="mt-2 flex items-center">
                <span className="text-yellow-400">⭐ {product.rating}</span>
                <button className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-full">Shop now</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mt-8">
        <input 
          type="text" 
          placeholder="Black T-shirt under ₹300" 
          className="p-3 w-2/3 md:w-1/3 bg-gray-800 border border-gray-700 rounded-full text-white"
        />
        <button className="ml-4 px-6 py-3 bg-blue-600 rounded-full">Search</button>
      </div>
    </div>
  );
}

export default UserProducts;
