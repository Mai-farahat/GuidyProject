
const { sql, connectToDB } = require('../config/db.config');

// Get all categories
const getAllCategories = async () => {
  try {
    const pool = await connectToDB(); // use the function, not poolPromise
    const result = await pool.request()
      .query('SELECT CategoryID, CategoryName FROM Category');
    return result.recordset;
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    throw error;
  }
};

// Get category by ID with courses count
const getCategoryWithStats = async (id) => {
  try {
    const pool = await connectToDB(); // use the function again
    const result = await pool.request()
      .input('categoryId', sql.Int, id)
      .query(`
        SELECT 
          c.CategoryID,
          c.CategoryName,
          COUNT(co.CourseID) AS CourseCount
        FROM Category c
        LEFT JOIN Course co ON c.CategoryID = co.CategoryID
        WHERE c.CategoryID = @categoryId
        GROUP BY c.CategoryID, c.CategoryName
      `);
    return result.recordset[0];
  } catch (error) {
    console.error('Error fetching category stats:', error.message);
    throw error;
  }
};

module.exports = {
  getAllCategories,
  getCategoryWithStats
};
