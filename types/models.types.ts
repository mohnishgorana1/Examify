import mongoose from "mongoose";

export interface IUser {
  clerkUserId: string;
  name: string;
  email: string;
  phone?: string;
  dob: Date;
  role: "admin" | "student" | "instructor";
  createdAt?: Date;
  updatedAt?: Date;
}

export type QuestionType = "mcq" | "truefalse";

export interface IQuestion {
  createdBy: mongoose.Types.ObjectId; // instructor id
  text: string;
  type: QuestionType;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation?: string;
}

export interface IExam {
  createdBy: mongoose.Types.ObjectId; // instructor id
  title: string;
  description: string;
  duration: number; // in minutes
  isPublished?: boolean;
  publishUpdatedDate?: Date;
  scheduledAt: Date;
  questions: mongoose.Types.ObjectId[];
  totalMarks?: number;
  passingMarks?: number;
  marksPerQuestion?: number;
  submissions: mongoose.Types.ObjectId[];
}
export interface IEnrollment {
  studentId: mongoose.Types.ObjectId; // student id;
  examId: mongoose.Types.ObjectId;
  enrolledAt: Date;
}

export interface ISubmissionAnswer {
  questionId: mongoose.Types.ObjectId;
  selectedOption: number; // index of selected option
}

export interface ISubmission {
  examId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  answers: ISubmissionAnswer[];
  status: string;
  startedAt: Date;
  submittedAt?: Date;
  score?: number;
  isAutoSubmitted: boolean;
  attemptNumber: number;
  timeTaken: number;
}


export interface IWorkExperience {
  company: string;
  post: string;
  timeSpanYears: number;
}

export interface IEducationalQualification {
  institute: string;
  course: string;
  yearCompleted: number; 
  grade: string; 
}

export interface IInstructorRequest {
  student: mongoose.Types.ObjectId;
  email: string;
  name: string;
  experience: IWorkExperience[];
  qualifications: IEducationalQualification[];
  status: "pending" | "approved" | "rejected";
  requestedAt?: Date;
  processedBy?: mongoose.Types.ObjectId;
  processedAt?: Date;
}