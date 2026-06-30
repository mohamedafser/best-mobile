import { POST } from "../api";
import { AuthResponse } from "./type";

export type SignInPayload = {
  email: string;
  password: string;
};

export const signInApi = (body: SignInPayload) =>
  POST<AuthResponse, SignInPayload>("/login", body);
