const express = require('express');
const router = express.Router();
const {
  getCoursesHandler,
  getCourseByIdHandler
} = require('../controllers/courseController');

router.get('/', getCoursesHandler);         // /courses?filter=...
router.get('/:id', getCourseByIdHandler);   // /courses/123

module.exports = router;


