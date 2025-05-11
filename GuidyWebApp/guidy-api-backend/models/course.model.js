const sql = require('mssql');

const { connectToDB } = require('../config/db.config');


const getAllCourses = async () => {
  const pool = await connectToDB();
  const result = await pool.request().query('SELECT * FROM Course');
  return result.recordset;
};


const getCourseById = async (courseId) => {
  const pool = await connectToDB();
  const result = await pool.request()
    .input('CourseID', sql.Int, courseId)
       .query(`
      SELECT 
          c.CourseID,
          c.Title,
          c.Description AS CourseMainDescription,
          c.Price,
          c.IsFree,
          c.Discount,
          c.DifficultyLevel,
          c.Language,
          c.Duration_Hours,
          c.CreatedAt,
          c.ImageCover,
          c.StudentNumber,
          c.CourseRating,
          c.NumberOfModules,
          c.Status,

          cat.CategoryID,
          cat.CategoryName,

          i.InstructorID,
          i.InstructorName,
          i.InstructorEmail,
          i.linkedInLink,
          i.phoneNumber,
          i.Description AS InstructorBio,

          cd.Description AS DetailedCourseDescription,
          cp.Prerequisite,
          cc.Subject

      FROM Course c
      LEFT JOIN Category cat ON c.CategoryID = cat.CategoryID
      LEFT JOIN Instructor i ON c.InstructorID = i.InstructorID
      LEFT JOIN CourseDescription cd ON c.CourseID = cd.CourseID
      LEFT JOIN CoursePrerequisite cp ON c.CourseID = cp.CourseID
      LEFT JOIN CourseContent cc ON c.CourseID = cc.CourseID
      WHERE c.CourseID = @CourseID
    `);
  return result.recordset[0]; // return a single course object
};

// Get courses by category
const getCoursesByCategory = async (categoryName) => {
  const pool = await connectToDB();
  const result = await pool.request()
    .input('CategoryName', sql.NVarChar(50), categoryName)
    .query(`
      SELECT c.*
      FROM Course c
      JOIN Category cat ON c.CategoryID = cat.CategoryID
      WHERE cat.CategoryName = @CategoryName
    `);
  return result.recordset;
};


// Search courses by keyword
const searchCourses = async (searchTerm) => {
  const pool = await connectToDB();
  const result = await pool.request()
    .input('term', sql.NVarChar, `%${searchTerm}%`)
    .query(`
      SELECT * FROM Course
      WHERE CourseName LIKE @term OR InstructorName LIKE @term
    `);
  return result.recordset;
};

// Sort courses by a field (rating or price)
const sortCourses = async (sortBy = 'Rating', order = 'DESC') => {
  const pool = await connectToDB();
  const result = await pool.request().query(`
    SELECT * FROM Course ORDER BY ${sortBy} ${order}
  `);
  return result.recordset;
};


module.exports = {
  getAllCourses,
  getCoursesByCategory,
  searchCourses,
  sortCourses,
  getCourseById
};
