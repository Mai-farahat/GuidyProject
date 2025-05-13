SELECT 
    c.*,
    cd.Description as CourseDescription,
    cp.Prerequisite,
    cc.Subject,
    i.InstructorName,
    i.InstructorEmail,
    i.linkedInLink,
    i.phoneNumber,
    i.Description as InstructorDescription
FROM course c 
LEFT JOIN CourseDescription cd ON c.CourseID = cd.CourseID
LEFT JOIN CoursePrerequisite cp ON cp.CourseID = c.CourseID
LEFT JOIN CourseContent cc ON cc.CourseID = c.CourseID
LEFT JOIN Instructor i ON c.InstructorID = i.InstructorID
WHERE c.CourseID = @CourseID; 