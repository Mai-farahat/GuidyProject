
const categoryModel = require('../models/category.model');

// Get all categories (for dropdowns/filters)
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to load categories',
      error: error.message 
    });
  }
};

// Get category details with course count
const getCategoryDetails = async (req, res) => {
  try {
    const category = await categoryModel.getCategoryWithStats(req.params.id);
    
    if (!category) {
      return res.status(404).json({ 
        message: 'Category not found' 
      });
    }
    
    res.status(200).json({
      ...category,
      message: category.CourseCount === 0 
        ? 'No courses in this category yet' 
        : ''
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to load category details',
      error: error.message
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryDetails
};