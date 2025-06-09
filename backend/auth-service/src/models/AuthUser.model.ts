import { Schema, model, Document } from "mongoose";
import { IAuthUser } from "../types/authUser.types";
import bcrypt from "bcryptjs";

interface IAuthUserDoc extends IAuthUser, Document {}

const authUserSchema = new Schema<IAuthUserDoc>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: String, // optional, if storing in DB
  },
  { timestamps: true }
);


authUserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


authUserSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const AuthUser = model<IAuthUserDoc>("AuthUser", authUserSchema);
