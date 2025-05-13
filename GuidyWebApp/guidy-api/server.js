const express = require('express');
const cors = require('cors');
//necessary to merge environment formats from the .env file.
require('dotenv').config(); // important here

const userRoutes = require('./routes/user.routes');
const courseRoutes = require('./routes/course.routes');
const authRoutes = require('./routes/auth.routes');
const enrollmentRoutes = require('./routes/enrollment.routes');
const contactRoutes = require('./routes/contact.routes');
const helpMessageRoutes = require('./routes/helpmessages.routes');
const reviewRoutes = require('./routes/review.routes');
const moduleRoutes = require('./routes/module.routes');
const lessonRoutes = require('./routes/lesson.routes');
const lessonEnrollmentRoutes = require('./routes/lessonEnrollment.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
//To check use : http://localhost:3000/api/users
app.use('/api/users', userRoutes);
console.log('✅ User routes loaded');

//To check use : http://localhost:3000/api/courses
app.use('/api/courses', courseRoutes);
console.log('✅ Course routes loaded');

// http://localhost:3000/api/auth/register
app.use('/api/auth', authRoutes);
console.log('✅ Auth routes loaded');

//http://localhost:3000/api/enroll/4
app.use('/api/enroll', enrollmentRoutes);
console.log('✅ Enrollment routes loaded');

app.use('/api/contact', contactRoutes);
console.log('✅ Contact routes loaded');

// Help Messages API
app.use('/api/help', helpMessageRoutes);
console.log('✅ Help message routes loaded');

app.use('/api/reviews', reviewRoutes);
console.log('✅ Reviews routes loaded');

app.use('/api/modules', moduleRoutes);
console.log('✅ Module routes loaded');

app.use('/api/lessons', lessonRoutes);
console.log('✅ Lesson routes loaded');

//http://localhost:3000/api/lesson-enrollment/status/2/2/3/1
app.use('/api/lesson-enrollment', lessonEnrollmentRoutes);
console.log('✅ Lesson enrollment routes loaded');

// Test Route
app.get('/', (req, res) => {
  res.send('Welcome to Guidy API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// 404 handler
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).json({ message: 'Route not found' });
});

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
