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
  resume: z
    .object({ url: z.string().url("Resume URL is invalid").optional() })
    .optional(),
  introduction: z.string().optional(),
  phone: z
    .string()
    .regex(/^\+[0-9]{11,13}$/, "Phone number is invalid")
    .optional(),
  location: z.string().optional(),
  socialLinks: z
    .array(
      z.object({
        name: z.string().optional(),
        link: z.string().url("URL is invalid").optional()
      })
    )
    .optional(),
  blocked: z.boolean().optional()
});

export const zAdminUpdateRequest = zAdminCreateRequest
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one property is required"
  });
