// routes/lessonEnrollment.routes.js
const express = require('express');
const router = express.Router();
const LessonEnrollmentController = require('../controllers/lessonEnrollmentController');

// Route to enroll a user in a lesson
router.post('/enroll', LessonEnrollmentController.enroll);

// Route to update the lesson watched status
router.put('/update-status', LessonEnrollmentController.updateStatus);

// Route to get the lesson watched status
router.get('/status/:enrollmentId/:courseId/:moduleId/:lessonId', LessonEnrollmentController.getStatus);

module.exports = router;
