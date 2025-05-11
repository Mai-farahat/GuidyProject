const express = require('express');
const cors = require('cors');
//necessary to merge environment formats from the .env file.
require('dotenv').config(); // important here


const userRoutes = require('./routes/user.routes');
const courseRoutes = require('./routes/course.routes');
const authRoutes = require('./routes/auth.routes');
const enrollmentRoutes = require('./routes/enrollment.routes');
const instructorRoutes = require('./routes/instructor.routes');
const categoryRoutes = require('./routes/category.routes');
const notificationRoutes = require('./routes/notification.routes');
const courseWishlistRoutes = require('./routes/courseWishlist.routes');
const cartRoutes = require('./routes/cart.routes');
const paymentRoutes = require('./routes/payment.routes');


const contactRoutes = require('./routes/contact.routes');
const helpMessageRoutes = require('./routes/helpmessages.routes');
 const reviewRoutes = require('./routes/review.routes');
const moduleRoutes = require('./routes/module.routes');
 const lessonRoutes = require('./routes/lesson.routes');
const lessonEnrollmentRoutes = require('./routes/lessonEnrollment.routes');


const app = express();
app.use(cors());
app.use(express.json());

// Routes
//To check use : http://localhost:3000/api/users
app.use('/api/users', userRoutes);
//To check use : http://localhost:3000/api/courses
app.use('/api/courses', courseRoutes);

//To get all info about selected course by course id : http://localhost:3000/api/courses/2
app.use('/api/courses', courseRoutes);
// http://localhost:3000/api/auth/register
app.use('/api/auth', authRoutes);
//http://localhost:3000/api/enroll/4
app.use('/api/enroll', enrollmentRoutes);

app.use('/api/instructors', instructorRoutes);

// Get http://localhost:3000/api/categories

app.use('/api/categories', categoryRoutes);

app.use('/api/notifications', notificationRoutes); 
// Get http://localhost:3000/api/course-wishlist
app.use('/api/course-wishlist', courseWishlistRoutes);

//GET http://localhost:3000/api/cart
app.use('/api/cart', cartRoutes);
// http://localhost:3000/api/payments
app.use('/api/payments', paymentRoutes);

// http://localhost:3000/api/reviews

app.use('/api/reviews', reviewRoutes);


// http://localhost:3000/api/modules
app.use('/api/modules', moduleRoutes);
// http://localhost:3000/api/lessons
app.use('/api/lessons', lessonRoutes);

//http://localhost:3000/api/lesson-enrollment/status/2/2/3/1
app.use('/api/lesson-enrollment', lessonEnrollmentRoutes);

// http://localhost:3000/api/contact

app.use('/api/contact', contactRoutes);
// http://localhost:3000/api/help

app.use('/api/help', helpMessageRoutes);



// Test Route
app.get('/', (req, res) => {
  res.send(' Welcome to Guidy API');
});

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
