import mongoose, { Schema, model, Document, Types } from "mongoose";
import { ISubmission } from "../types/submission.types";

interface ISubmissionDoc extends ISubmission, Document {}

const submissionSchema = new Schema<ISubmissionDoc>(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    }, // Using Types.ObjectId
    studentId: { type: String, required: true },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        }, // Using Types.ObjectId
        selectedOption: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["started", "submitted", "auto-submitted"],
      default: "started",
    },
    startedAt: { type: Date, default: Date.now, required: true },
    submittedAt: { type: Date },
    score: { type: Number  },
    isAutoSubmitted: { type: Boolean, default: false },
    attemptNumber: { type: Number, required: true },
    timeTaken: { type: Number },
  },
  { timestamps: true }
);

export const Submission = model<ISubmissionDoc>("Submission", submissionSchema);
