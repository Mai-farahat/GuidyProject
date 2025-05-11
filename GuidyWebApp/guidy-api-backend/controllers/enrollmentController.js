// controllers/enrollmentController.js
const { enrollUserInCourse, getUserEnrollments } = require('../models/enrollment.model');

const enrollHandler = async (req, res) => {
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    return res.status(400).json({ message: 'UserID and CourseID are required' });
  }

  try {
    const result = await enrollUserInCourse(userId, courseId);
    if (result) {
      res.status(201).json({ message: 'Enrollment successful' });
    } else {
      res.status(400).json({ message: 'Enrollment failed' });
    }
  } catch (err) {
    console.error('Enrollment Error:', err);
    res.status(500).send('Server Error');
  }
};

const getEnrollmentsHandler = async (req, res) => {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const enrollments = await getUserEnrollments(userId);
    res.json(enrollments);
  } catch (err) {
    console.error('Get Enrollments Error:', err);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  enrollHandler,
  getEnrollmentsHandler
};
