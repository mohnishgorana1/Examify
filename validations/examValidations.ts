import { z } from "zod";

export const createExamSchema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters"),
  duration: z
    .string()
    .min(1, "Duration is required")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Duration must be a valid number greater than 0",
    }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  scheduledDate: z.string(),
  scheduledTime: z.string(),
});
