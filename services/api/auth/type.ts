export type AuthResponse = {
  is_email_verified: boolean;
  is_onboarding_complete: number;
  token: string;
  token_type: string;
};
