import { z } from "zod";

export const zBlogCreateRequest = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be at most 100 characters" }),
  excerpt: z
    .string({ message: "Excerpt is required" })
    .max(120, { message: "Excerpt must be at most 120 characters" }),
  content: z
    .string({ message: "Content is required" })
    .min(3, { message: "Content must be at least 3 characters" }),
  readTime: z.preprocess(
    (arg) => {
      if (typeof arg === "string") {
        return parseInt(arg, 10);
      }
      return arg;
    },
    z.number({ message: "Read time is required" }).gt(0, {
      message: "Read time must be greater than 0"
    })
  ),
  image: z
    .string()
    .nullable()
    .or(z.string().url({ message: "Image must be a valid URL" }))
    .optional(),
  tags: z
    .array(z.string())
    .min(1, { message: "Tags are required" })
    .max(10, { message: "Tags must be at most 10 characters" })
});

export const zBlogUpdateRequest = zBlogCreateRequest
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one property is required"
  });
