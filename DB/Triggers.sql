-- 1.if any student added rating on the course the --> courseRating will be changed
CREATE OR ALTER TRIGGER Tri_UpdateCourseRating
ON Review
AFTER INSERT
AS
BEGIN
    UPDATE C
    SET C.CourseRating = RR.AvgRating
    FROM Course C
    JOIN (
        SELECT E.CourseID, AVG(R.Rating) AS AvgRating
        FROM Review R
        JOIN Enrollment E ON R.EnrollmentID = E.EnrollmentID
        GROUP BY E.CourseID
    ) AS RR ON RR.CourseID = C.CourseID
    WHERE C.CourseID IN (
        SELECT E.CourseID 
        FROM inserted i 
        JOIN Enrollment E ON i.EnrollmentID = E.EnrollmentID
    );
END;

-- 2.if new student enrolled to a certain course studentNumber increase by 1 
--Handle studen number automatic at each course

CREATE OR ALTER TRIGGER Tri_IncreaseStudentNumber
ON Enrollment
AFTER INSERT
AS
BEGIN
    UPDATE C
    SET C.StudentNumber = C.StudentNumber + 1
    FROM Course C
    WHERE C.CourseID IN (SELECT CourseID FROM inserted);
END;


-- 3. Number of Modules
CREATE OR ALTER TRIGGER Tri_UpdateNumberOfModules
ON Module
AFTER INSERT
AS
BEGIN
    UPDATE C
    SET C.NumberOfModules = C.NumberOfModules + 1
    FROM Course C
    WHERE C.CourseID IN (SELECT CourseID FROM inserted);
END;

-- 4.Number Of Lessons
CREATE OR ALTER TRIGGER Tri_UpdateNumberOfLessons
ON Lesson
AFTER INSERT
AS
BEGIN
    UPDATE M
    SET M.NumberOfLessons = M.NumberOfLessons + 1
    FROM Module M
    WHERE M.ModuleID IN (SELECT ModuleID FROM inserted);
END;

-- 5. progress in enrollment table 
--progress =((number of watched lessons) / (total number of lessons)) *100
CREATE OR ALTER TRIGGER Tri_UpdateProgress
ON Lesson_Enrollment
AFTER INSERT
AS
BEGIN
    UPDATE E
    SET E.Progress = 
        CAST(WL.NumberOfWatchedLessons AS FLOAT) / NULLIF(LN.TotalLessons, 0) * 100
    FROM Enrollment E
    JOIN (
        SELECT EnrollmentID, COUNT(*) AS NumberOfWatchedLessons
        FROM Lesson_Enrollment
        WHERE Status = 1
        GROUP BY EnrollmentID
    ) WL ON WL.EnrollmentID = E.EnrollmentID
    JOIN (
        SELECT E.EnrollmentID, COUNT(L.LessonID) AS TotalLessons
        FROM Enrollment E
        JOIN Lesson L ON L.CourseID = E.CourseID
        GROUP BY E.EnrollmentID
    ) LN ON LN.EnrollmentID = E.EnrollmentID
    WHERE E.EnrollmentID IN (SELECT EnrollmentID FROM inserted);
END;


-- 6. GetCertificate on Enrollment
CREATE OR ALTER TRIGGER Tri_ActivateCertificate
ON Enrollment
AFTER INSERT, UPDATE
AS
BEGIN
    UPDATE E
    SET E.GetCertificate = 1
    FROM Enrollment E
    JOIN inserted i ON i.EnrollmentID = E.EnrollmentID
    WHERE i.Progress = 100;
END;


--7. adding a course automatically to enrollment table after a payment successfully done--7. adding a course automatically to enrollment table after a payment successfully done
CREATE OR ALTER TRIGGER trg_EnrollAfterPayment
ON Payment
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM inserted WHERE PaymentStatus = 'Completed')
    BEGIN
        INSERT INTO Enrollment (UserID, CourseID, CreatedAt, Progress)
        SELECT 
            p.UserID,
            ci.CourseID,
            GETDATE(),
            0
        FROM inserted p
        INNER JOIN Cart c ON p.CartID = c.CartID
        INNER JOIN CartItem ci ON ci.CartID = c.CartID
        WHERE p.PaymentStatus = 'Completed'
        AND NOT EXISTS (
            SELECT 1 
            FROM Enrollment e 
            WHERE e.UserID = p.UserID 
              AND e.CourseID = ci.CourseID
        );

        -- Update StudentNumber in Course table
        UPDATE c
        SET StudentNumber = (
            SELECT COUNT(*) 
            FROM Enrollment e 
            WHERE e.CourseID = c.CourseID
        )
        FROM Course c
        INNER JOIN CartItem ci ON ci.CourseID = c.CourseID
        INNER JOIN inserted p ON p.CartID = ci.CartID
        WHERE p.PaymentStatus = 'Completed';
    END
END;



-- 8.Trigger: Auto-Create Notification After Enrollment

CREATE OR ALTER TRIGGER Tri_NotifyAfterEnrollment
ON Enrollment
AFTER INSERT
AS
BEGIN
    INSERT INTO Notification (UserID, Message, Type, Status, CreatedAt)
    SELECT 
        i.UserID,
        'Congratulations! You have successfully enrolled in your course.',
        'Course',
        0, -- unread
        GETDATE()
    FROM inserted i;
END;


--9. Trigger: Auto-Clear Cart After Successful Payment
CREATE OR ALTER TRIGGER Tri_ClearCartAfterPayment
ON Payment
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Corrected to PaymentStatus
    IF UPDATE(PaymentStatus)
    BEGIN
        DELETE FROM CartItem
        WHERE CartID IN (SELECT CartID FROM inserted WHERE PaymentStatus = 'Completed');

        DELETE FROM Cart
        WHERE CartID IN (SELECT CartID FROM inserted WHERE PaymentStatus = 'Completed');
    END
END;









