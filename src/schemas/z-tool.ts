import { z } from "zod";

export const zToolCreateRequest = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(30, { message: "Name must be at most 30 characters" }),
  icon: z
    .string()
    .url({ message: "URL must be a valid URL" })
    .nullable()
    .optional(),
  rating: z.number({ message: "Rating must be a number" }).optional()
});

export const zToolUpdateRequest = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(30, { message: "Name must be at most 30 characters" })
    .optional(),
  icon: z
    .string()
    .url({ message: "URL must be a valid URL" })
    .nullable()
    .optional(),
  rating: z.number({ message: "Rating must be a number" }).optional()
});
