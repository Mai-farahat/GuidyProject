

const {
  getAllCourses,
  getCoursesByCategory,
  searchCourses,
  sortCourses,
  getCourseById
} = require('../models/course.model');

// Existing handler for GET /courses
const getCoursesHandler = async (req, res) => {
  try {
    const { category, search, sortBy, order } = req.query;

    let courses;

    if (search) {
      courses = await searchCourses(search);
    } else if (category) {
      courses = await getCoursesByCategory(category);
    } else if (sortBy) {
      courses = await sortCourses(sortBy, order || 'DESC');
    } else {
      courses = await getAllCourses();
    }

    res.json(courses);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Server error');
  }
};

// New handler for GET /courses/:id
const getCourseByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await getCourseById(id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getCoursesHandler,
  getCourseByIdHandler
};
