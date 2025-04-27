-- Create the database
CREATE DATABASE Guidy;
GO

USE Guidy;
GO

-- Users table
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(50), 
    LastName NVARCHAR(50),
    UserName NVARCHAR(20) UNIQUE, 
	ProfileImage NVARCHAR(MAX), --add image path
    Email VARCHAR(50) UNIQUE,
    [Password] VARCHAR(50) UNIQUE, --should store hashed password but it's hard now
    Role VARCHAR(20) NOT NULL DEFAULT 'Student',
	IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    CHECK (Role IN ('Student', 'Instructor', 'Admin'))
);

-- Instructor table
CREATE TABLE Instructor(
    InstructorID INT PRIMARY KEY IDENTITY(1,1),
    InstructorName NVARCHAR(50) NOT NULL,
    InstructorEmail VARCHAR(50) UNIQUE NOT NULL,
    linkedInLink VARCHAR(MAX),
    phoneNumber VARCHAR(11) CHECK (
    (phoneNumber LIKE '010%' OR
    phoneNumber LIKE '011%' OR
    phoneNumber LIKE '012%' OR
    phoneNumber LIKE '015%') AND LEN(phoneNumber) = 11),
    Description NVARCHAR(MAX)
);

-- Categories table
CREATE TABLE Category (
    CategoryID INT PRIMARY KEY IDENTITY(1,1),
    CategoryName NVARCHAR(50) NOT NULL
);
-- Courses Table
CREATE TABLE Course (
    CourseID INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    CategoryID INT,
    InstructorID INT,
    Price MONEY DEFAULT 0,
    IsFree BIT DEFAULT 1,
    Discount INT DEFAULT 0,
    DifficultyLevel NVARCHAR(20), -- Beginner, Intermediate, Advanced
    Language NVARCHAR(20),
    Duration_Hours DECIMAL(10, 2),
    CreatedAt DATETIME DEFAULT GETDATE(),
    ImageCover NVARCHAR(255),
    StudentNumber INT DEFAULT 0, -- Managed by trigger
    CourseRating INT DEFAULT 0, -- Managed by trigger
    NumberOfModules INT DEFAULT 0, -- Managed by trigger
    Status NVARCHAR(20) DEFAULT 'Active', -- Active / Inactive
    FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (InstructorID) REFERENCES Instructor(InstructorID)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CHECK (Discount BETWEEN 0 AND 100)
);



	--Not exists
-- Step 1: Make sure the column exists with the correct data type
--ALTER TABLE Course DROP CONSTRAINT DF__Course__Discount__18EBB532;
--ALTER TABLE Course DROP CONSTRAINT CK__Course__1CBC4616;
-------------------------------------
-- Course Prerequisites Table
CREATE TABLE CoursePrerequisite (
    CourseID INT,
    Prerequisite NVARCHAR(255),
    PRIMARY KEY (CourseID, Prerequisite),
    FOREIGN KEY (CourseID) REFERENCES Course(CourseID)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Course Content
CREATE TABLE CourseContent (
    CourseID INT,
    Subject NVARCHAR(255) NOT NULL,
    PRIMARY KEY (CourseID, Subject),
    FOREIGN KEY (CourseID) REFERENCES Course(CourseID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Course Descriptions
CREATE TABLE CourseDescription (
    CourseID INT,
    Description NVARCHAR(255) NOT NULL,
    PRIMARY KEY (CourseID, Description),
    FOREIGN KEY (CourseID) REFERENCES Course(CourseID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- Enrollment Table
CREATE TABLE Enrollment (
    EnrollmentID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT,
    CourseID INT,
    Progress INT DEFAULT 0 CHECK (Progress BETWEEN 0 AND 100),
    GetCertificate BIT DEFAULT 0, -- 0 = no certificate
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (CourseID) REFERENCES Course(CourseID)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Reviews
CREATE TABLE Review (
    ReviewID INT PRIMARY KEY,
    EnrollmentId INT UNIQUE,
    ReviewText NVARCHAR(MAX) ,
    Rating TINYINT CHECK (Rating IN (1, 2, 3, 4, 5)),
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (EnrollmentId) REFERENCES Enrollment(EnrollmentId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Module Table
CREATE TABLE Module (
    ModuleID INT PRIMARY KEY IDENTITY(1,1),
    CourseID INT,
    Title NVARCHAR(100) NOT NULL,
    Duration_Hours DECIMAL(10, 2) NOT NULL,
    Status BIT DEFAULT 0,
    ModuleOrder INT, -- 1,2,3,...
    NumberOfLessons INT DEFAULT 0, -- Managed by trigger
    FOREIGN KEY (CourseID) REFERENCES Course(CourseID)
        ON DELETE CASCADE ON UPDATE CASCADE
);


-- Lessons Table 
CREATE TABLE Lesson (
    LessonID INT NOT NULL,
    ModuleID INT NOT NULL,
    CourseID INT NOT NULL,
    Title NVARCHAR(100) NOT NULL,
    LessonContent NVARCHAR(MAX) NOT NULL,
    Duration_Hours DECIMAL(10, 4) NOT NULL,
    Status BIT DEFAULT 0, -- 0: Not Watched
    LessonOrder INT, -- Order inside module
    PRIMARY KEY (CourseID, ModuleID, LessonID),
    
    -- Only one Foreign Key on Module
    FOREIGN KEY (ModuleID) REFERENCES Module(ModuleID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

--lesson && enrollment relation 
-- to hanle lesson watched or not
CREATE TABLE Lesson_Enrollment (
    LessonID INT,
    ModuleID INT,
    CourseID INT,
    EnrollmentID INT,
    status BIT DEFAULT 0,  -- default -> lesson is not watched
    PRIMARY KEY (CourseID, ModuleID, LessonID,EnrollmentID),
    FOREIGN KEY (EnrollmentID) REFERENCES Enrollment(EnrollmentID)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION,
    FOREIGN KEY (CourseID, ModuleID, LessonID) REFERENCES Lesson(CourseID, ModuleID, LessonID)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
);

-- Notification Table
CREATE TABLE Notification (
    NotificationID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT,
    Message NVARCHAR(MAX) NOT NULL,
    Type NVARCHAR(50) CHECK (Type IN ('System', 'Reminder', 'Course', 'Admin')),
    Status BIT DEFAULT 0, -- 0: Unread
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Contact Us
CREATE TABLE ContactUs (
    ContactID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NULL, -- If user is logged in
    Name NVARCHAR(100),
    Email NVARCHAR(100),
    Message NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
        ON DELETE SET NULL ON UPDATE CASCADE
);

-- Course Wish List
CREATE TABLE CourseWishList (
    CourseID INT,
    UserID INT,
    PRIMARY KEY (CourseID, UserID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (CourseID) REFERENCES Course(CourseID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Cart Table
CREATE TABLE Cart (
    CartID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT UNIQUE,
    totalPrice MONEY, -- Will be calculated dynamically
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
-- Cart and Course Relationship
CREATE TABLE CartItem (
    CartID INT,
    CourseID INT,
    PRIMARY KEY (CartID, CourseID),
    FOREIGN KEY (CartID) REFERENCES Cart(CartID)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (CourseID) REFERENCES Course(CourseID)
        ON DELETE CASCADE ON UPDATE CASCADE
);


-- Payment Table
CREATE TABLE Payment (
    PaymentID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL, 
    CartID INT UNIQUE,
    Amount DECIMAL(10,2) NOT NULL,
    PaymentStatus NVARCHAR(20) DEFAULT 'Pending' CHECK (PaymentStatus IN ('Pending', 'Completed', 'Failed')),
    PaymentDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (CartID) REFERENCES Cart(CartID)
);



-- Help Message Table 
CREATE TABLE HelpMessage (
    HelpMessageID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT,
    Message NVARCHAR(MAX) NOT NULL,
    Status NVARCHAR(50) DEFAULT 'Pending' CHECK (Status IN ('Pending', 'In Progress', 'Resolved')),
    AdminResponse NVARCHAR(MAX) NULL,
    ResponseDate DATETIME NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
        ON DELETE CASCADE ON UPDATE CASCADE
);