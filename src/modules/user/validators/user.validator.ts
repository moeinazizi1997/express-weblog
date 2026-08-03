import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters"),

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const updateUserSchema = z.object({
  displayName: z
    .string()
    .trim()
    .optional(),

  role: z
    .enum(["USER", "MODERATOR", "ADMIN"])
    .optional(),
});