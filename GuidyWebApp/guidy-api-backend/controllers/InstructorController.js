

const Instructor = require('../models/instructor.model');


async function getInstructors(req, res) {
  try {
    const instructors = await Instructor.getAllInstructors();
    res.json(instructors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getInstructorById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const instructor = await Instructor.getInstructorById(id);
    if (!instructor) return res.status(404).json({ message: 'Instructor not found' });
    res.json(instructor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function createInstructor(req, res) {
  try {
    await Instructor.createInstructor(req.body);
    res.status(201).json({ message: 'Instructor created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateInstructor(req, res) {
  try {
    const id = parseInt(req.params.id);
    await Instructor.updateInstructor(id, req.body);
    res.json({ message: 'Instructor updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteInstructor(req, res) {
  try {
    const id = parseInt(req.params.id);
    await Instructor.deleteInstructor(id);
    res.json({ message: 'Instructor deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  getInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
};
