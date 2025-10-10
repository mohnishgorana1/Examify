import { IEnrollment } from "@/types/models.types";
import mongoose, { Schema, model, Document, models } from "mongoose";

interface IEnrollmentDoc extends IEnrollment, Document {}

const enrollmentSchema = new Schema<IEnrollmentDoc>(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    enrolledAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Enrollment =
  models.Enrollment || model<IEnrollment>("Enrollment", enrollmentSchema);
