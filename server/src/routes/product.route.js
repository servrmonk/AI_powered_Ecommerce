const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { verifyJWT , admin } = require('../middlewares/auth.middleware');
const router = express.Router();

// Product Routes
router.get('/', getProducts);
router.post('/', verifyJWT, admin, createProduct);
router.put('/:id', verifyJWT, admin, updateProduct);
router.delete('/:id', verifyJWT, admin, deleteProduct);

module.exports = router;
