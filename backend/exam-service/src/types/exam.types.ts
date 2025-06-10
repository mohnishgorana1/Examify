import mongoose from "mongoose";

export interface IExam{
    createdBy: mongoose.Types.ObjectId,
    title: string;
    description: string;
    duration: number; // in minutes
    scheduledAt: Date;
    questions: mongoose.Types.ObjectId[],
}