// controllers/lessonEnrollment.controller.js
const LessonEnrollmentModel = require('../models/lessonEnrollment.model');

const LessonEnrollmentController = {
  // Enroll a user in a lesson
  async enroll(req, res) {
    try {
      const { enrollmentId, courseId, moduleId, lessonId } = req.body;
      await LessonEnrollmentModel.enrollLesson({ enrollmentId, courseId, moduleId, lessonId });
      res.status(201).json({ message: "Enrolled in lesson successfully" });
    } catch (err) {
      console.error("❌ Failed to enroll in lesson:", err.message);
      res.status(500).json({ error: "Failed to enroll in lesson" });
    }
  },

  // Update lesson watched status
  async updateStatus(req, res) {
    try {
      const { enrollmentId, courseId, moduleId, lessonId, status } = req.body;
      await LessonEnrollmentModel.updateLessonStatus({ enrollmentId, courseId, moduleId, lessonId, status });
      res.status(200).json({ message: "Lesson status updated successfully" });
    } catch (err) {
      console.error("❌ Failed to update lesson status:", err.message);
      res.status(500).json({ error: "Failed to update lesson status" });
    }
  },

  // Get lesson watched status
  async getStatus(req, res) {
    try {
      const { enrollmentId, courseId, moduleId, lessonId } = req.params;
      const status = await LessonEnrollmentModel.getLessonStatus({ enrollmentId, courseId, moduleId, lessonId });
      res.status(200).json(status);
    } catch (err) {
      console.error("❌ Failed to get lesson status:", err.message);
      res.status(500).json({ error: "Failed to get lesson status" });
    }
  }
};

module.exports = LessonEnrollmentController;
