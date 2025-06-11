import mongoose from "mongoose";

export type QuestionType = "mcq" | "truefalse";

export interface IQuestion{
    examId: mongoose.Types.ObjectId;
    text: string;
    type: QuestionType;
    options: string[];
    correctAnswer: number; // index of correct option
    explanation?: string;
}