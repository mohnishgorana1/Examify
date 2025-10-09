import { IQuestion } from "@/types/models.types";
import mongoose, { Schema, model, Document, models } from "mongoose";

interface IQuestionDoc extends IQuestion, Document {}

const questionSchema = new Schema<IQuestionDoc>(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true }, // instructor's userId
    text: { type: String, required: true },
    type: { type: String, enum: ["mcq", "truefalse"], required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
    explanation: { type: String },
  },
  { timestamps: true }
);

export const Question =
  models.Question || model<IQuestionDoc>("Question", questionSchema);
