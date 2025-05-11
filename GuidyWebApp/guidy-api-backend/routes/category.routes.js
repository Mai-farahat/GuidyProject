
const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryDetails
} = require('../controllers/categoryController');

// Public endpoints
router.get('/', getAllCategories);          // GET /api/categories
router.get('/:id', getCategoryDetails);     // GET /api/categories/1

module.exports = router;