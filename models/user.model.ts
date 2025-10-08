import { IUser } from "@/types/models.types";
import { Schema, model, models, Document } from "mongoose";

interface IUserDoc extends IUser, Document {}

const userSchema = new Schema<IUserDoc>(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: String,
    dob: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "instructor"],
      default: "student",
    },
  },
  { timestamps: true }
);

export const User = models.User || model<IUserDoc>("User", userSchema);
