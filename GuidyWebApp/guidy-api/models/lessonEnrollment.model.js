// models/lessonEnrollment.model.js
const { connectToDB, sql } = require('../config/db.config');

const LessonEnrollmentModel = {
  // Enroll a user in a lesson
  async enrollLesson({ enrollmentId, courseId, moduleId, lessonId }) {
    const pool = await connectToDB();
    await pool.request()
      .input('EnrollmentID', sql.Int, enrollmentId)
      .input('CourseID', sql.Int, courseId)
      .input('ModuleID', sql.Int, moduleId)
      .input('LessonID', sql.Int, lessonId)
      .query(`
        INSERT INTO Lesson_Enrollment (EnrollmentID, CourseID, ModuleID, LessonID, status)
        VALUES (@EnrollmentID, @CourseID, @ModuleID, @LessonID, 0)
      `);
  },

  // Update lesson status (watched or not)
  async updateLessonStatus({ enrollmentId, courseId, moduleId, lessonId, status }) {
    const pool = await connectToDB();
    await pool.request()
      .input('EnrollmentID', sql.Int, enrollmentId)
      .input('CourseID', sql.Int, courseId)
      .input('ModuleID', sql.Int, moduleId)
      .input('LessonID', sql.Int, lessonId)
      .input('Status', sql.Bit, status)
      .query(`
        UPDATE Lesson_Enrollment
        SET status = @Status
        WHERE EnrollmentID = @EnrollmentID AND CourseID = @CourseID AND ModuleID = @ModuleID AND LessonID = @LessonID
      `);
  },

  // Get the lesson status (watched or not)
  async getLessonStatus({ enrollmentId, courseId, moduleId, lessonId }) {
    const pool = await connectToDB();
    const result = await pool.request()
      .input('EnrollmentID', sql.Int, enrollmentId)
      .input('CourseID', sql.Int, courseId)
      .input('ModuleID', sql.Int, moduleId)
      .input('LessonID', sql.Int, lessonId)
      .query(`
        SELECT status
        FROM Lesson_Enrollment
        WHERE EnrollmentID = @EnrollmentID AND CourseID = @CourseID AND ModuleID = @ModuleID AND LessonID = @LessonID
      `);
    return result.recordset[0];
  }
};

module.exports = LessonEnrollmentModel;
