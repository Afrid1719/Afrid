import { z } from "zod";

export const zProjectCreateRequest = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be at most 50 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must be at most 500 characters" }),
  preview: z
    .string()
    .nullable()
    .or(z.string().url({ message: "Preview must be a valid URL" }))
    .optional(),
  codeLink: z.string().url({ message: "Code link must be a valid URL" }),
  url: z
    .string()
    .nullable()
    .or(z.string().url({ message: "Must be a valid URL" }))
    .optional(),
  techs: z.array(z.string()).min(1, { message: "Techs are required" }),
  createdOn: z.preprocess((arg) => {
    if (typeof arg === "string") {
      const date = new Date(arg); // Convert string to Date
      return isNaN(date.getTime()) ? undefined : date; // Return undefined if invalid
    }
    return arg; // If already a Date, return as-is
  }, z.date().max(new Date(), { message: "Start date must be in the past" })), // Ensure the value is a valid Date
  images: z.array(z.string()).min(0).optional()
});

export const zProjectUpdateRequest = zProjectCreateRequest
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one property is required"
  });
