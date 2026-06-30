import { POST } from "../api";
import { AuthResponse } from "./type";

export type SignUpPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  terms_accepted: boolean;
};

export const signUpApi = (body: SignUpPayload) =>
  POST<AuthResponse, SignUpPayload>("/signup", body);
