const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/reviewController');

// POST /api/reviews
router.post('/', ReviewController.create);

// GET /api/reviews
router.get('/', ReviewController.getAll);

// GET /api/reviews/:id
router.get('/:id', ReviewController.getOne);

module.exports = router;

