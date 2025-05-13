const { connectToDB, sql } = require('../config/db.config');

const LessonModel = {
  async getAllLessons() {
    const pool = await connectToDB();
    const result = await pool.request().query(`
      SELECT * FROM Lesson ORDER BY ModuleID, LessonOrder
    `);
    return result.recordset;
  },

  async createLesson({ lessonId, moduleId, courseId, title, content, duration, status, lessonOrder }) {
    const pool = await connectToDB();
    await pool.request()
      .input('LessonID', sql.Int, lessonId)
      .input('ModuleID', sql.Int, moduleId)
      .input('CourseID', sql.Int, courseId)
      .input('Title', sql.NVarChar(100), title)
      .input('LessonContent', sql.NVarChar(sql.MAX), content)
      .input('Duration_Hours', sql.Decimal(10, 4), duration)
      .input('Status', sql.Bit, status)
      .input('LessonOrder', sql.Int, lessonOrder)
      .query(`
        INSERT INTO Lesson (LessonID, ModuleID, CourseID, Title, LessonContent, Duration_Hours, Status, LessonOrder)
        VALUES (@LessonID, @ModuleID, @CourseID, @Title, @LessonContent, @Duration_Hours, @Status, @LessonOrder)
      `);
  },

  async updateLesson(lessonId, { moduleId, courseId, title, content, duration, status, lessonOrder }) {
    const pool = await connectToDB();
    await pool.request()
      .input('LessonID', sql.Int, lessonId)
      .input('ModuleID', sql.Int, moduleId)
      .input('CourseID', sql.Int, courseId)
      .input('Title', sql.NVarChar(100), title)
      .input('LessonContent', sql.NVarChar(sql.MAX), content)
      .input('Duration_Hours', sql.Decimal(10, 4), duration)
      .input('Status', sql.Bit, status)
      .input('LessonOrder', sql.Int, lessonOrder)
      .query(`
        UPDATE Lesson SET
          Title = @Title,
          LessonContent = @LessonContent,
          Duration_Hours = @Duration_Hours,
          Status = @Status,
          LessonOrder = @LessonOrder
        WHERE LessonID = @LessonID AND ModuleID = @ModuleID AND CourseID = @CourseID
      `);
  }
};

module.exports = LessonModel;
LessonModel;

