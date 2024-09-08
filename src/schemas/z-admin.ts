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
  name: z.string().regex(/^[a-zA-Z]*$/, "Name can only contain alphabets")
});
