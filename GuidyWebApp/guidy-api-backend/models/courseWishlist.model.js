const { sql, connectToDB } = require('../config/db.config');

async function getAllCourseWishlist() {
  try {
    const pool = await connectToDB();
    const result = await pool.request().query('SELECT * FROM [CourseWishList]');
    return result.recordset;
  } catch (error) {
    console.error('DB Error in getAllCourseWishlist:', error);
    throw error;
  }
}

async function addToCourseWishlist(courseID, userID) {
  try {
    const pool = await connectToDB();
    await pool.request()
      .input('CourseID', sql.Int, courseID)
      .input('UserID', sql.Int, userID)
      .query(`
        INSERT INTO [CourseWishList] (CourseID, UserID)
        VALUES (@CourseID, @UserID)
      `);
  } catch (error) {
    console.error('DB Error in addToCourseWishlist:', error);
    throw error;
  }
}

async function removeFromCourseWishlist(courseID, userID) {
  try {
    const pool = await connectToDB();
    await pool.request()
      .input('CourseID', sql.Int, courseID)
      .input('UserID', sql.Int, userID)
      .query(`
        DELETE FROM [CourseWishList]
        WHERE CourseID = @CourseID AND UserID = @UserID
      `);
  } catch (error) {
    console.error('DB Error in removeFromCourseWishlist:', error);
    throw error;
  }
}

module.exports = {
  getAllCourseWishlist,
  addToCourseWishlist,
  removeFromCourseWishlist,
};
