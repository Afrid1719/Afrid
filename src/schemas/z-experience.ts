import { z } from "zod";

export const zExperienceCreateRequest = z.object({
  position: z
    .string()
    .min(3, { message: "Position must be at least 3 characters" })
    .max(50, { message: "Position must be at most 50 characters" }),
  company: z
    .string()
    .min(5, { message: "Company must be at least 5 characters" })
    .max(100, { message: "Company must be at most 100 characters" }),
  startDate: z.preprocess((arg) => {
    if (typeof arg === "string") {
      const date = new Date(arg); // Convert string to Date
      return isNaN(date.getTime()) ? undefined : date; // Return undefined if invalid
    }
    return arg; // If already a Date, return as-is
  }, z.date().max(new Date(), { message: "Start date must be in the past" })), // Ensure the value is a valid Date
  endDate: z.preprocess((arg) => {
    if (typeof arg === "string") {
      const date = new Date(arg); // Convert string to Date
      return isNaN(date.getTime()) ? undefined : date; // Return undefined if invalid
    }
    return arg; // If already a Date, return as-is
  }, z.date().optional()),
  description: z
    .array(z.string())
    .min(1, { message: "Description is required" }),
  techs: z.array(z.string()).min(1, { message: "Techs is required" })
});

export const zExperienceUpdateRequest = zExperienceCreateRequest
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one property is required"
  });
