import { z } from "zod";

export const createReferralSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .refine((email) => email.toLowerCase().trim(), {
      message: "Invalid email",
    }),
});

export type CreateReferralData = z.infer<typeof createReferralSchema>;
