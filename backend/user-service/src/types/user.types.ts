export type UserRole = "admin" | "student" | "instructor";

export interface IUser {
  userId: string;
  name: string;
  email: string;
  phone?: string;
  dob: Date;
  role: UserRole;

  isVerified: boolean;
}