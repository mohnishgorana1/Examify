import { IExam } from "@/types/models.types";
import mongoose, { Schema, model, Document, models } from "mongoose";

interface IExamDoc extends IExam, Document {}

const examSchema = new Schema<IExamDoc>(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // without ref we cant populate user model
      required: true,
    }, // instructor's userId
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true }, // in minutes
    isPublished: { type: Boolean, default: false },
    publishUpdatedDate: { type: Date },
    scheduledAt: { type: Date, required: true },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ], // referencing
    totalMarks: { type: Number },
    passingMarks: { type: Number },
    marksPerQuestion: {
      type: Number,
      default: 1,
    },
    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submission",
      },
    ],
  },
  { timestamps: true }
);

export const Exam = models.Exam || model<IExamDoc>("Exam", examSchema);
