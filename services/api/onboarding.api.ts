import { POST } from "./api";

export type OtpType = {
  phone: string;
  otp: string;
};

export type OnboardingUserInfoType = {
  country_id: string;
  family_emails?: string[];
  phone_number: string;
};

export const verifyOtpApi = (body: OtpType) =>
  POST<any, any>("/otp/verify", body);

export const resendOtpApi = (body: Pick<OtpType, "phone">) =>
  POST<any, any>("/otp/resend", body);

export const sendOtpApi = (body: Pick<OtpType, "phone">) =>
  POST<any, any>("/otp/send", body);

export const onboardingApi = (body: OnboardingUserInfoType) =>
  POST<any, any>("/onboarding", body);
