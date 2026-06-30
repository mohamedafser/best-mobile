import { UserResponse } from "@/types/user-profile.types";
import { POST, PUT } from "./api";

export const updateNameApi = (
  body: Pick<UserResponse, "first_name" | "last_name">,
) => PUT<any, any>("/user/name", body);

export const updateEmailApi = (body: Pick<UserResponse, "email">) =>
  PUT<any, any>("/user/email", body);

export const verifyCurrentPasswordApi = (
  body: Pick<
    {
      current_password: string;
    },
    "current_password"
  >,
) => POST<any, any>("/current-password", body);

export const updatePasswordApi = (
  body: Pick<
    {
      password: string;
      password_confirmation: string;
    },
    "password" | "password_confirmation"
  >,
) => PUT<any, any>("/new-password", body);
