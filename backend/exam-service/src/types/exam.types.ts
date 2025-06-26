import mongoose from "mongoose";
import { IQuestion } from "./question.types";

export interface IExam{
    createdBy: mongoose.Types.ObjectId,
    title: string;
    description: string;
    duration: number; // in minutes
    scheduledAt: Date;
    questions: mongoose.Types.ObjectId[];
    totalMarks?: number;
    passingMarks?:number;
    marksPerQuestion?: number;
}