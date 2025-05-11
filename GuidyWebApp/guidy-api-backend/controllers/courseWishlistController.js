
const CourseWishlist = require('../models/courseWishlist.model');

exports.getAll = async (req, res) => {
  try {
    const data = await CourseWishlist.getAllCourseWishlist();
    res.json(data);
  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({ error: 'Error fetching course wishlist' });
  }
};

exports.add = async (req, res) => {
  const { CourseID, UserID } = req.body;
  try {
    await CourseWishlist.addToCourseWishlist(CourseID, UserID);
    res.status(201).json({ message: 'Added to course wishlist' });
  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({ error: 'Error adding to wishlist' });
  }
};

exports.remove = async (req, res) => {
  const { CourseID, UserID } = req.body;
  try {
    await CourseWishlist.removeFromCourseWishlist(CourseID, UserID);
    res.json({ message: 'Removed from course wishlist' });
  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({ error: 'Error removing from wishlist' });
  }
};
