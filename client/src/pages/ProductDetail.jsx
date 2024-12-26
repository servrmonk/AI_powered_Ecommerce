// src/components/ProductDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../db.json"; // Import data directly

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL params
  const product = productsData?.products?.find((prod) => prod.id === id);
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-9 mt-16 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Product Image */}
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-96 h-fit  rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-start">
        <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>
        <p className="text-gray-600 text-sm mt-2">{product.description}</p>
        <p className="text-lg font-bold text-gray-900 mt-4">${product.price}</p>
        <p className="text-sm text-gray-500 mt-2">
          Rating: {product?.rating?.rate || Math.max(parseFloat( (Math.random() * 5).toFixed(1)), 1)}
            ⭐
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
            Add to Cart
          </button>
          <button className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">
            Buy Now
          </button>
        </div>

        {/* Back to Products Link */}
        <div className="mt-4">
          <Link to="/product" className="text-blue-500 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
