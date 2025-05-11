// routes/enrollment.routes.js
const express = require('express');
const router = express.Router();
const { enrollHandler, getEnrollmentsHandler } = require('../controllers/enrollmentController');

router.post('/', enrollHandler); // POST /api/enroll
router.get('/:userId', getEnrollmentsHandler); // GET /api/enroll/:userId

module.exports = router;
