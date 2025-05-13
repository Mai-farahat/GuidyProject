const express = require('express');
const router = express.Router();
const { getCoursesHandler, getCourseDetails } = require('../controllers/courseController');

// Debug middleware for course routes
router.use((req, res, next) => {
  console.log('Course route accessed:', req.method, req.url);
  next();
});

// Get all courses
router.get('/', getCoursesHandler);

// Get course details by ID
router.get('/:courseId', async (req, res, next) => {
  try {
    console.log('Accessing course details for ID:', req.params.courseId);
    await getCourseDetails(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
