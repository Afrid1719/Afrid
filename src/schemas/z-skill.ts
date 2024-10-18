import { z } from "zod";

export const zSkillCreateRequest = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(30, { message: "Name must be at most 30 characters" }),
  icon: z
    .string()
    .nullable()
    .or(z.string().url({ message: "Icon must be a valid URL" }))
    .optional(),
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(10, { message: "Rating must be at most 10" })
});

export const zSkillUpdateRequest = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(30, { message: "Name must be at most 30 characters" })
    .optional(),
  icon: z
    .string()
    .nullable()
    .or(z.string().url({ message: "Icon must be a valid URL" }))
    .optional(),
  rating: z
    .number()
    .min(1, { message: "Rating must be at least 1" })
    .max(10, { message: "Rating must be at most 10" })
    .optional()
});
