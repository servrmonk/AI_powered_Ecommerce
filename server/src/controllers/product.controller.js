const Product = require('../models/product.model');
const { ApiResponse } = require('../utils/ApiResponse');
const { ApiError } = require('../utils/ApiError');

// Get all products
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    
    res.status(200).json(new ApiResponse(200, products, 'Products retrieved successfully'));
  } catch (error) {
    next(new ApiError(500, error.message || 'Failed to fetch products'));
  }
};

// Create a new product (admin only)
const createProduct = async (req, res, next) => {
  // Check if the user is an admin
  if (req.user.role !== 'admin') {
    return next(new ApiError(403, 'Forbidden: Admins only'));
  }

  const { name, description, price, image, category } = req.body;

  try {
    const newProduct = new Product({ name, description, price, image, category });
    await newProduct.save();
    res.status(201).json(new ApiResponse(201, newProduct, 'Product created successfully'));
  } catch (error) {
    next(new ApiError(500, error.message || 'Failed to create product'));
  }
};

// Update product (admin only)
const updateProduct = async (req, res, next) => {
  // Check if the user is an admin
  if (req.user.role !== 'admin') {
    return next(new ApiError(403, 'Forbidden: Admins only'));
  }

  const { id } = req.params;
  const { name, description, price, image, category } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price, image, category }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json(new ApiResponse(404, null, 'Product not found'));
    }
    res.status(200).json(new ApiResponse(200, updatedProduct, 'Product updated successfully'));
  } catch (error) {
    next(new ApiError(500, error.message || 'Failed to update product'));
  }
};

// Delete product (admin only)
const deleteProduct = async (req, res, next) => {
  // Check if the user is an admin
  if (req.user.role !== 'admin') {
    return next(new ApiError(403, 'Forbidden: Admins only'));
  }

  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json(new ApiResponse(404, null, 'Product not found'));
    }
    res.status(200).json(new ApiResponse(200, null, 'Product deleted successfully'));
  } catch (error) {
    next(new ApiError(500, error.message || 'Failed to delete product'));
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
