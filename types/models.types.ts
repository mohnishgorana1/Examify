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
  studentId: string;
  answers: ISubmissionAnswer[];
  status: string;
  startedAt: Date;
  submittedAt?: Date;
  score?: number;
  isAutoSubmitted: boolean;
  attemptNumber: number;
  timeTaken: number;
}
