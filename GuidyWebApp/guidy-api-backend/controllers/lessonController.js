const LessonModel = require('../models/lesson.model');

const LessonController = {
  async getAll(req, res) {
    try {
      const lessons = await LessonModel.getAllLessons();
      res.json(lessons);
    } catch (err) {
      console.error("❌ Failed to fetch lessons:", err.message);
      res.status(500).json({ error: "Failed to fetch lessons" });
    }
  },

  async create(req, res) {
    try {
      await LessonModel.createLesson(req.body);
      res.status(201).json({ message: "Lesson created successfully" });
    } catch (err) {
      console.error("❌ Failed to create lesson:", err.message);
      res.status(500).json({ error: "Failed to create lesson" });
    }
  },

  async update(req, res) {
    try {
      const lessonId = parseInt(req.params.lessonId);
      await LessonModel.updateLesson({ lessonId, ...req.body });
      res.json({ message: "Lesson updated successfully" });
    } catch (err) {
      console.error("❌ Failed to update lesson:", err.message);
      res.status(500).json({ error: "Failed to update lesson" });
    }
  }
};

module.exports = LessonController;

