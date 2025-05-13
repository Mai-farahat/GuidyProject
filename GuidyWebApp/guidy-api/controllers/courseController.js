const { getAllCourses } = require('../models/course.model');
const { connectToDB, sql } = require('../config/db.config');
const { loadSqlQueries } = require('../utils/sqlLoader');

const getCoursesHandler = async (req, res) => {
  try {
    const courses = await getAllCourses();
    res.json(courses);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Server error');
  }
};

const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;
    console.log('Fetching details for course ID:', courseId);

    const pool = await connectToDB();
    console.log('Database connection established');

    const queries = await loadSqlQueries('courses');
    console.log('SQL queries loaded:', Object.keys(queries));

    if (!queries.getCourseDetails) {
      console.error('getCourseDetails query not found in loaded queries');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    console.log('Executing query with courseId:', courseId);
    const result = await pool.request()
      .input('CourseID', sql.Int, courseId)
      .query(queries.getCourseDetails);

    console.log('Query executed, records found:', result.recordset.length);

    if (!result.recordset || result.recordset.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Process the results to group prerequisites and subjects
    const courseData = result.recordset[0];
    const prerequisites = result.recordset
      .filter(record => record.Prerequisite)
      .map(record => record.Prerequisite);
    
    const subjects = result.recordset
      .filter(record => record.Subject)
      .map(record => record.Subject);

    // Format the response
    const formattedResponse = {
      Title: courseData.Title,
      CourseID: courseData.CourseID,
      Description: courseData.CourseDescription,
      CategoryID: courseData.CategoryID,
      InstructorID: courseData.InstructorID,
      Price: courseData.Price,
      IsFree: courseData.IsFree,
      Discount: courseData.Discount,
      DifficultyLevel: courseData.DifficultyLevel,
      Language: courseData.Language,
      Duration_Hours: courseData.Duration_Hours,
      CreatedAt: courseData.CreatedAt,
      ImageCover: courseData.ImageCover,
      StudentNumber: courseData.StudentNumber,
      CourseRating: courseData.CourseRating,
      NumberOfModules: courseData.NumberOfModules,
      Status: courseData.Status,
      Prerequisite: prerequisites,
      Subject: subjects,
      Instructor: {
        InstructorID: courseData.InstructorID,
        InstructorName: courseData.InstructorName,
        InstructorEmail: courseData.InstructorEmail,
        linkedInLink: courseData.linkedInLink,
        phoneNumber: courseData.phoneNumber,
        Description: courseData.InstructorDescription
      }
    };

    console.log('Sending response for course:', courseData.CourseID);
    res.status(200).json(formattedResponse);
  } catch (error) {
    console.error('Error fetching course details:', {
      message: error.message,
      stack: error.stack,
      courseId: req.params.courseId
    });
    res.status(500).json({ 
      message: 'Server error while fetching course details',
      error: error.message 
    });
  }
};

module.exports = {
  getCoursesHandler,
  getCourseDetails
};
