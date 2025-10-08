export interface IUser {
  clerkUserId: string;
  name: string;
  email: string;
  phone?: string;
  dob: Date;
  role: "admin" | "student" | "instructor";
  createdAt?: Date;
  updatedAt?: Date;
}
