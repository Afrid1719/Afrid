import { z } from "zod";

export const zExperienceCreateRequest = z.object({
  position: z
    .string()
    .min(3, { message: "Position must be at least 3 characters" })
    .max(30, { message: "Position must be at most 30 characters" }),
  company: z
    .string()
    .min(5, { message: "Company must be at least 5 characters" })
    .max(50, { message: "Company must be at most 50 characters" }),
  startDate: z
    .date()
    .max(new Date(), { message: "Start date must be in the past" }),
  endDate: z.date().optional(),
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
