const express = require('express');
const router = express.Router();
const LessonController = require('../controllers/lessonController');

router.get('/', LessonController.getAll);
router.post('/', LessonController.create);
router.patch('/:lessonId', LessonController.update);

module.exports = router;

