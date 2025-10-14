import { IInstructorRequest } from "@/types/models.types";
import mongoose, { Schema, model, Document, models } from "mongoose";

interface IInstructorRequestDoc extends IInstructorRequest, Document {}

const instructorRequestSchema = new Schema<IInstructorRequestDoc>(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: { type: String, required: true, lowercase: true, trim: true },
    name: { type: String, required: true },

    experience: [
      {
        company: { type: String, required: true },
        post: { type: String, required: true },
        timeSpanYears: { type: Number, required: true },
      },
    ],
    qualifications: [
      {
        institute: { type: String, required: true },
        course: { type: String, required: true },
        yearCompleted: { type: Number, required: true },
        grade: { type: String, required: true },
      },
    ],
    // END UPDATED FIELDS

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    processedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const InstructorRequest =
  models.InstructorRequest ||
  model<IInstructorRequestDoc>("InstructorRequest", instructorRequestSchema);
