// src/components/Product.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import productsData from "../db.json"; // Import data directly

// Function to limit text to a specific number of words
const limitWords = (text, wordLimit) => {
  if (!text) return ""; // If text is undefined or null, return an empty string

  const words = text.split(" ");
  if (words.length <= wordLimit) {
    return text;
  }
  return words.slice(0, wordLimit).join(" ") + " ...";
};

// Function to ensure rating is never less than 1
const generateRating = (rate) => {
  const randomRating = rate || (Math.random() * 5).toFixed(1);
  return parseFloat(randomRating) < 1 ? 1 : randomRating;
};

const Product = () => {
  const products = productsData?.products;

  // Pagination and Sort State
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [sortOption, setSortOption] = useState("none");

  // Sorting logic
  const sortProducts = (products) => {
    switch (sortOption) {
      case "price-low-high":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high-low":
        return [...products].sort((a, b) => b.price - a.price);
      case "popular":
        return [...products].sort((a, b) => b.rating?.rate - a.rating?.rate);
      default:
        return products;
    }
  };

  // Get sorted products based on the selected sort option
  const sortedProducts = sortProducts(products);

  // Calculate the index of the first and last product to show on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Slice the products array to get the products for the current page
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Pagination
  const totalPages = Math.ceil((products?.length || 0) / productsPerPage);

  return (
    <div className="p-9 mt-16">
      {/* Sort Options */}
      <div className="mb-4 flex justify-end items-center">
        <div className="text-lg font-semibold text-gray-800">Sort by :</div>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-2 w-20 py-1 ml-1 border rounded-md text-gray-700"
        >
          <option value="none">None</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="popular">Popularity</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentProducts?.map((product) => (
          <div
            key={product.id}
            className="bg-white border p-1 border-gray-300 rounded-lg shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] overflow-hidden flex flex-col"
          >
            {/* Link to Product Detail */}
            <Link to={`/product/${product.id}`}>
              {/* Image section */}
              <img
                src={product?.image}
                alt={product.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4 flex flex-col">
                <h2 className="text-xl font-semibold text-gray-800">
                  {limitWords(product.name, 5)}
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  {limitWords(product.description, 8)}
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <p className="text-lg font-bold text-gray-900">${product.price}</p>
                  <p className="text-sm text-gray-500">
                    {generateRating(product?.rating?.rate)} ⭐
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:bg-gray-200"
        >
          Prev
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
