import { AcademicLevel } from "@/enums/academic-level";
import { parse } from "path";
import { z } from "zod";

export const zAcademicsCreateRequest = z.object({
  level: z.nativeEnum(AcademicLevel, { message: "Level is required" }),
  degree: z.string().min(3, { message: "Degree is required" }).max(100, {
    message: "Degree must be at most 100 characters"
  }),
  institutionImage: z
    .string()
    .url({ message: "Institution image must be a valid URL" })
    .optional(),
  institutionName: z
    .string()
    .min(5, { message: "Institution name must be at least 5 characters" })
    .max(150, { message: "Institution name must be at most 150 characters" }),
  startYear: z
    .string()
    .length(4, { message: "Start year must be a valid year" }),
  endYear: z
    .string()
    .length(4, { message: "End year must be a valid year" })
    .optional(),
  marksObtained: z.preprocess((arg) => {
    if (typeof arg === "string") {
      return parseInt(arg, 10);
    }
    return arg;
  }, z.number().optional()),
  marksOutOf: z.preprocess((arg) => {
    if (typeof arg === "string") {
      return parseInt(arg, 10);
    }
    return arg;
  }, z.number().optional())
});

export const zAcademicsUpdateRequest = zAcademicsCreateRequest
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one property is required"
  });
