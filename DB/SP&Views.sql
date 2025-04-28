-- ========================================
-- 1.View: View_CoursesDetails
-- Purpose: Show full details about courses with instructor and category
-- ========================================
CREATE  VIEW View_CoursesDetails
AS
SELECT 
    C.CourseID,
    C.Title,
    C.Description,
    C.Price,
    C.Discount,
    C.DifficultyLevel,
    C.Language,
    C.Duration_Hours,
    C.StudentNumber,
    C.CourseRating,
    C.Status,
    I.InstructorName,
    Cat.CategoryName,
    C.CreatedAt
FROM Course C
LEFT JOIN Instructor I ON C.InstructorID = I.InstructorID
LEFT JOIN Category Cat ON C.CategoryID = Cat.CategoryID;
GO


-- ========================================
-- 2.View: View_StudentEnrollments
-- Purpose: Show which student enrolled in which course
-- ========================================
CREATE  VIEW View_StudentEnrollments
AS
SELECT 
    U.UserID,
    U.FirstName + ' ' + U.LastName AS FullName,
    U.Email,
    C.CourseID,
    C.Title AS CourseTitle,
    E.Progress,
    E.GetCertificate,
    E.CreatedAt AS EnrollmentDate
FROM Enrollment E
JOIN Users U ON E.UserID = U.UserID
JOIN Course C ON E.CourseID = C.CourseID;
GO

-- ========================================
-- 3.View: View_StudentProgress
-- Purpose: Track the progress of each student in each enrolled course
-- ========================================
CREATE  VIEW View_StudentProgress
AS
SELECT 
    E.EnrollmentID,
    U.FirstName + ' ' + U.LastName AS StudentName,
    C.Title AS CourseTitle,
    E.Progress,
    CASE WHEN E.Progress = 100 THEN 'Completed'
         WHEN E.Progress >= 50 THEN 'In Progress'
         ELSE 'Just Started'
    END AS ProgressStatus
FROM Enrollment E
JOIN Users U ON E.UserID = U.UserID
JOIN Course C ON E.CourseID = C.CourseID;
GO

-- ========================================
-- 4.View: View_CourseReviews
-- Purpose: Display course reviews with student names
-- ========================================
CREATE VIEW View_CourseReviews
AS
SELECT 
    R.ReviewID,
    U.FirstName + ' ' + U.LastName AS ReviewerName,
    C.Title AS CourseTitle,
    R.Rating,
    R.ReviewText,
    R.CreatedAt
FROM Review R
JOIN Enrollment E ON R.EnrollmentID = E.EnrollmentID
JOIN Users U ON E.UserID = U.UserID
JOIN Course C ON E.CourseID = C.CourseID;
GO

-- ========================================
-- 5.View: View_AdminDashboard
-- Purpose: Show platform KPIs for Admin Dashboard
-- ========================================
CREATE  VIEW View_AdminDashboard
AS
SELECT 
    (SELECT COUNT(*) FROM Users WHERE Role = 'Student') AS TotalStudents,
    (SELECT COUNT(*) FROM Users WHERE Role = 'Instructor') AS TotalInstructors,
    (SELECT COUNT(*) FROM Course WHERE Status = 'Active') AS TotalActiveCourses,
    (SELECT SUM(Amount) FROM Payment WHERE PaymentStatus = 'Completed') AS TotalRevenue
GO


