export interface ICourseDetails {
  Title: string
  CourseID: number
  Description: string
  CategoryID: number
  InstructorID: number
  Price: number
  IsFree: boolean
  Discount: number
  DifficultyLevel: string
  Language: string
  Duration_Hours: number
  CreatedAt: string
  ImageCover: string
  StudentNumber: number
  CourseRating: number
  NumberOfModules: number
  Status: string
  Prerequisite: string[]
  Subject: string[]
  Instructor: Instructor
}

export interface Instructor {
  InstructorID: number
  InstructorName: string
  InstructorEmail: string
  linkedInLink: string
  phoneNumber: string
  Description: string
}

