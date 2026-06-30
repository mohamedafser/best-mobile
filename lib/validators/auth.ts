import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),

    lastName: z.string().min(1, "Last name is required"),

    email: z.string().email("Invalid email"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),

    termsAccepted: z.boolean(),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",

    path: ["confirmPassword"],
  })

  .refine((data) => data.termsAccepted, {
    message: "Please accept terms and conditions",

    path: ["termsAccepted"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
