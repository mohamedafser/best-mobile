export interface UserResponse {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string;
  auth_provider: string;
  is_onboarding_complete: number;
  pending_email: string | null;
  is_email_update_pending: boolean;
  subscription: Subscription;
  default_card: DefaultCard | null;
  user_details: UserDetails;
}

export interface Subscription {
  uuid: string;
  subscription_plan: SubscriptionPlan;
  stripe_customer_id: string;
  stripe_subscription_id: string | null;
  stripe_subscription_item_id: string | null;
  stripe_price_id: string | null;
  status: string;
  starts_at: string;
  ends_at: string | null;
  trails_ends_at: string | null;
  scheduled_downgrade: number;
}

export interface SubscriptionPlan {
  uuid: string;
  name: string;
  amount: string;
  currency_code: string;
  interval: string;
  active: number;
  is_default: number;
  is_current: boolean;
  reward_percentage: string;
}

export interface DefaultCard {
  uuid: string;
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  cardholder_name: string;
  address: CardAddress;
  is_default: boolean;
  created_at: string;
}

export interface CardAddress {
  city: string;
  line1: string;
  line2: string | null;
  state: string;
  country: string;
  postal_code: string;
}

export interface UserDetails {
  country: Country;
  city: string | null;
  phone_number: string;
}

export interface Country {
  uuid: string;
  name: string;
  code: string;
  alpha3_code: string;
  currency_code: string;
}

export interface UserProfileApiResponse {
  success: boolean;
  data: UserResponse;
}
