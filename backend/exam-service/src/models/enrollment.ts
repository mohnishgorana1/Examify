// models/enrollment.model.ts
import mongoose, { Schema, model, Document } from "mongoose";

interface IEnrollment extends Document {
  studentId: string;
  examId: mongoose.Types.ObjectId;
  enrolledAt: Date;
}

const enrollmentSchema = new Schema<IEnrollment>(
  {
    studentId: { type: String, required: true },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    enrolledAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Enrollment = model<IEnrollment>("Enrollment", enrollmentSchema);
