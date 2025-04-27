USE Guidy;
GO

-- 1. Instructor (5 rows)
INSERT INTO Instructor (InstructorName, InstructorEmail, linkedInLink, phoneNumber, Description)
VALUES
('Mohamed Ali', 'm.ali@guidy.com', 'linkedin.com/mali', '01012345678', 'Senior Web Developer with 10 years experience'),
('Sarah Johnson', 's.johnson@guidy.com', 'linkedin.com/sjohnson', '01123456789', 'Data Science specialist and AI researcher'),
('Ahmed Hassan', 'a.hassan@guidy.com', 'linkedin.com/ahassan', '01234567890', 'Cybersecurity expert and ethical hacker'),
('Emily Wilson', 'e.wilson@guidy.com', 'linkedin.com/ewilson', '01512345678', 'UI/UX designer with 8 years experience'),
('David Kim', 'd.kim@guidy.com', 'linkedin.com/dkim', '01098765432', 'Cloud architect and DevOps engineer');

-- 2. Category (5 rows)
INSERT INTO Category (CategoryName)
VALUES
('Web Development'),
('Data Science'),
('Cybersecurity'),
('Graphic Design'),
('Cloud Computing');

-- 3. Course (5 rows)
INSERT INTO Course (Title, Description, CategoryID, InstructorID, Price, IsFree, Discount, DifficultyLevel, Language, Duration_Hours)
VALUES
('HTML & CSS Fundamentals', 'Learn the basics of web development', 1, 1, 0, 1, 0, 'Beginner', 'English', 10.5),
('Python for Data Analysis', 'Master Python for data science', 2, 2, 49.99, 0, 10, 'Intermediate', 'English', 15.0),
('Ethical Hacking Basics', 'Introduction to cybersecurity', 3, 3, 79.99, 0, 15, 'Beginner', 'English', 12.0),
('UI/UX Design Principles', 'Learn modern design techniques', 4, 4, 59.99, 0, 0, 'Intermediate', 'English', 8.5),
('AWS Cloud Practitioner', 'Amazon Web Services fundamentals', 5, 5, 99.99, 0, 20, 'Advanced', 'English', 20.0);

-- 4. CoursePrerequisite (5 rows)
INSERT INTO CoursePrerequisite (CourseID, Prerequisite)
VALUES
(2, 'Basic programming knowledge'),
(3, 'Networking fundamentals'),
(4, 'Basic design sense'),
(5, 'Understanding of cloud concepts'),
(2, 'Mathematics background');

-- 5. CourseDescription (5 rows)
INSERT INTO CourseDescription (CourseID, Description)
VALUES
(1, 'Perfect for absolute beginners in web development'),
(2, 'Hands-on projects with real-world datasets'),
(3, 'Learn security best practices and tools'),
(4, 'Create beautiful and functional interfaces'),
(5, 'Prepare for AWS certification exams');

-- 6. CourseContent (5 rows)
INSERT INTO CourseContent (CourseID, Subject)
VALUES
(1, 'HTML Document Structure'),
(2, 'Pandas DataFrames'),
(3, 'Penetration Testing'),
(4, 'Color Theory'),
(5, 'EC2 Instances');

-- 7. Module (5 rows)
INSERT INTO Module (CourseID, Title, Duration_Hours, Status, ModuleOrder)
VALUES
(1, 'HTML Basics', 3.0, 1, 1),
(1, 'CSS Styling', 2.5, 1, 2),
(2, 'Python Fundamentals', 4.0, 1, 1),
(3, 'Network Security', 3.0, 1, 1),
(4, 'Design Theory', 2.0, 1, 1);

-- 8. Lesson (5 rows)
INSERT INTO Lesson (LessonID, ModuleID, CourseID, Title, LessonContent, Duration_Hours, Status, LessonOrder)
VALUES
(1, 1, 1, 'HTML Tags', 'Learn about common HTML tags', 0.75, 1, 1),
(1, 2, 1, 'CSS Selectors', 'Understanding CSS selectors', 1.0, 1, 1),
(1, 3, 2, 'Variables in Python', 'Data types and variables', 1.5, 1, 1),
(1, 4, 3, 'Firewall Basics', 'How firewalls work', 1.0, 1, 1),
(1, 5, 4, 'Color Psychology', 'Meaning of colors in design', 0.5, 1, 1);

-- 9. Users (5 rows)
INSERT INTO Users (FirstName, LastName, UserName, Email, [Password], Role)
VALUES
('John', 'Smith', 'jsmith', 'j.smith@email.com', 'pass123', 'Student'),
('Emma', 'Johnson', 'ejohnson', 'e.johnson@email.com', 'pass456', 'Student'),
('Admin', 'User', 'admin', 'admin@guidy.com', 'adminpass', 'Admin'),
('Michael', 'Brown', 'mbrown', 'm.brown@email.com', 'pass789', 'Student'),
('Sophia', 'Lee', 'slee', 's.lee@email.com', 'pass101', 'Student');

-- 10. Cart (5 rows)
INSERT INTO Cart (UserID, totalPrice)
VALUES
(1, 49.99),
(2, 79.99),
(3, 0),
(4, 129.98),
(5, 59.99);

-- 11. CartItem (5 rows)
INSERT INTO CartItem (CartID, CourseID)
VALUES
(1, 2),
(2, 3),
(4, 2),
(4, 4),
(5, 4);

-- 12. CourseWishList (5 rows)
INSERT INTO CourseWishList (CourseID, UserID)
VALUES
(1, 2),
(3, 1),
(5, 3),
(2, 4),
(4, 5);

-- 13. Payment (5 rows)
INSERT INTO Payment (UserID, CartID, Amount, PaymentStatus)
VALUES
(1, 1, 49.99, 'Completed'),
(2, 2, 79.99, 'Completed'),
(4, 4, 129.98, 'Pending'),
(5, 5, 59.99, 'Completed'),
(3, 3, 0, 'Failed');

-- 14. Enrollment (5 rows) - Will be created by trigger in actual implementation
INSERT INTO Enrollment (UserID, CourseID, Progress, GetCertificate)
VALUES
(1, 1, 75, 1),
(2, 2, 50, 0),
(3, 3, 100, 1),
(4, 4, 25, 0),
(5, 5, 0, 0);

-- 15. Lesson_Enrollment (5 rows)
INSERT INTO Lesson_Enrollment (LessonID, ModuleID, CourseID, EnrollmentID, status)
VALUES
(1, 1, 1, 1, 1),
(1, 2, 1, 1, 0),
(1, 3, 2, 2, 1),
(1, 4, 3, 3, 1),
(1, 5, 4, 4, 0);

-- 16. Review (5 rows)
INSERT INTO Review (ReviewID, EnrollmentId, ReviewText, Rating)
VALUES
(1, 1, 'Great course for beginners!', 5),
(2, 2, 'Content was good but could be more detailed', 4),
(3, 3, 'Excellent instructor and materials', 5),
(4, 4, 'A bit too basic for my level', 3),
(5, 5, 'Not what I expected', 2);

-- 17. HelpMessage (5 rows)
INSERT INTO HelpMessage (UserID, Message, Status, AdminResponse)
VALUES
(1, 'How do I download my certificate?', 'Resolved', 'Go to your profile page and click Certificates'),
(2, 'Payment not processing', 'In Progress', NULL),
(3, 'Course content not loading', 'Resolved', 'Fixed server issue, please refresh'),
(4, 'Request for refund', 'Pending', NULL),
(5, 'Account access issues', 'Resolved', 'Password has been reset');

-- 18. ContactUs (5 rows)
INSERT INTO ContactUs (UserID, Name, Email, Message)
VALUES
(NULL, 'Robert Green', 'r.green@email.com', 'Interested in instructor opportunities'),
(2, 'Emma Johnson', 'e.johnson@email.com', 'Question about course curriculum'),
(NULL, 'Lisa White', 'l.white@email.com', 'Feedback on platform usability'),
(4, 'Michael Brown', 'm.brown@email.com', 'Reporting a technical issue'),
(NULL, 'Daniel Black', 'd.black@email.com', 'Partnership inquiry');

-- 19. Notification (5 rows - mixed automatic and manual)
INSERT INTO Notification (UserID, Message, Type, Status)
VALUES
(1, 'Your course "HTML & CSS Fundamentals" is 75% complete', 'Course', 0),
(2, 'System maintenance scheduled tonight at 2 AM', 'System', 0),
(3, 'New course added to your wishlist category', 'Reminder', 1),
(4, 'Your payment for $129.98 is pending', 'Admin', 0),
(5, 'Welcome to Guidy! Start learning today', 'System', 1);