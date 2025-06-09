// validators/auth.validator.ts
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(10).max(10),
  dob: z.coerce.date()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
