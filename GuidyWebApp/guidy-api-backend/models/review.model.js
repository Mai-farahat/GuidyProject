
const { connectToDB, sql } = require('../config/db.config');

const ReviewModel = {
  async addReview({ enrollmentId, rating, reviewText }) {
    const pool = await connectToDB();
    const result = await pool.request().query("SELECT ISNULL(MAX(ReviewID), 0) + 1 AS NewID");
    const newReviewId = result.recordset[0].NewID;

    await pool.request()
      .input('ReviewID', sql.Int, newReviewId)
      .input('EnrollmentId', sql.Int, enrollmentId)
      .input('Rating', sql.TinyInt, rating)
      .input('ReviewText', sql.NVarChar(sql.MAX), reviewText)
      .query(`
        INSERT INTO Review (ReviewID, EnrollmentId, Rating, ReviewText, CreatedAt)
        VALUES (@ReviewID, @EnrollmentId, @Rating, @ReviewText, GETDATE())
      `);
  },

  async getAllReviews() {
    const pool = await connectToDB();
    const result = await pool.request().query(`
      SELECT ReviewID, EnrollmentId, ReviewText, Rating, CreatedAt
      FROM Review
      ORDER BY CreatedAt DESC
    `);
    return result.recordset;
  },

  async getReviewById(reviewId) {
    const pool = await connectToDB();
    const result = await pool.request()
      .input('ReviewID', sql.Int, reviewId)
      .query(`
        SELECT ReviewID, EnrollmentId, ReviewText, Rating, CreatedAt
        FROM Review
        WHERE ReviewID = @ReviewID
      `);
    return result.recordset[0];
  }
};

module.exports = ReviewModel;

