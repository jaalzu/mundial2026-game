import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Minimum 3 characters")
    .max(16, "Maximum 16 characters")
    .regex(/^[A-Z0-9_]+$/i, "Only letters, numbers and underscores"),

  avatar: z.string().min(1, "Avatar is required"),

  recoveryCode: z.string().min(1),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
