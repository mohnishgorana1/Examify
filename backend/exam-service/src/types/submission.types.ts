import mongoose from "mongoose";

export interface ISubmissionAnswer {
  questionId: mongoose.Types.ObjectId;
  selectedOption: number; // index of selected option
}

export interface ISubmission {
  examId: mongoose.Types.ObjectId;
  studentId: string;
  answers: ISubmissionAnswer[];
  submittedAt: Date;
  score: number;
  isAutoSubmitted: boolean;
  attemptNumber: number;
}
