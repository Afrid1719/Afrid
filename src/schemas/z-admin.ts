import { z } from "zod";

export const zAdminCreateRequest = z.object({
  email: z.string().email("Email is invalid"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password must be at most 15 characters")
    .regex(
      /^[a-zA-Z0-9_$@]*$/,
      "Password can only contain letters, numbers, _, @, and $"
    ),
  name: z.string().regex(/^[a-zA-Z\s]*$/, "Name can only contain alphabets"),
  title: z.string().regex(/^[a-zA-Z\s]*$/, "Title can only contain alphabets"),
  image: z.object({ url: z.string().url("Image URL is invalid") }).optional(),
  resume: z.object({ url: z.string().url("Resume URL is invalid") }).optional(),
  introduction: z
    .string()
    .min(50, "Introduction is too short")
    .max(500, "Introduction is too long")
    .optional()
});

export const zAdminUpdateRequest = zAdminCreateRequest
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one property is required"
  });
