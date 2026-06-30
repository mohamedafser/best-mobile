import { z } from "zod";

export const updateUserInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),

  lastName: z.string().min(1, "Last name is required"),

  email: z.string().email("Invalid email"),
});

export type UpdateUserInfoData = z.infer<typeof updateUserInfoSchema>;

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type UpdatePasswordData = z.infer<typeof updatePasswordSchema>;
