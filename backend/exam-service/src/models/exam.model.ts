import mongoose, { Schema, model, Document } from "mongoose";
import { IExam } from "../types/exam.types";

interface IExamDoc extends IExam, Document {}

const examSchema = new Schema<IExamDoc>(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true }, // instructor's userId
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true }, // in minutes
    scheduledAt: { type: Date, required: true },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ], // referencing
  },
  { timestamps: true }
);

export const Exam = model<IExamDoc>("Exam", examSchema);
