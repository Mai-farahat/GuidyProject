
const { connectToDB } = require('../config/db.config');

// استرجاع كل الكورسات من قاعدة البيانات
const getAllCourses = async () => {
  const pool = await connectToDB();
  const result = await pool.request().query('SELECT * FROM Course');
  return result.recordset;
};

// ممكن تضيفي هنا دوال تانية زي: getCourseById, createCourse, etc

module.exports = {
  getAllCourses
};
