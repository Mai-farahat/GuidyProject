// models/enrollment.model.js
const { connectToDB, sql } = require('../config/db.config');

const enrollUserInCourse = async (userId, courseId) => {
  const pool = await connectToDB();

  const result = await pool.request()
    .input('UserID', sql.Int, userId)
    .input('CourseID', sql.Int, courseId)
    .query(`
      INSERT INTO Enrollment (UserID, CourseID, EnrollmentDate)
      VALUES (@UserID, @CourseID, GETDATE())
    `);

  return result.rowsAffected[0]; // 1 if successful
};

const getUserEnrollments = async (userId) => {
  const pool = await connectToDB();

  const result = await pool.request()
    .input('UserID', sql.Int, userId)
    .query(`
      SELECT C.* FROM Enrollment E
      JOIN Course C ON C.CourseID = E.CourseID
      WHERE E.UserID = @UserID
    `);

  return result.recordset;
};

module.exports = {
  enrollUserInCourse,
  getUserEnrollments
};
