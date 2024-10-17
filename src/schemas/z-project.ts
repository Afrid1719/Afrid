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
  techs: z.array(z.string()).min(1, { message: "Techs are required" })
});

export const zProjectUpdateRequest = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be at most 50 characters" })
    .optional(),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must be at most 500 characters" })
    .optional(),
  preview: z
    .string()
    .nullable()
    .or(z.string().url({ message: "Preview must be a valid URL" }))
    .optional(),
  codeLink: z
    .string()
    .url({ message: "Code link must be a valid URL" })
    .optional(),
  url: z
    .string()
    .nullable()
    .or(z.string().url({ message: "Must be a valid URL" }))
    .optional(),
  techs: z.array(z.string()).optional()
});
