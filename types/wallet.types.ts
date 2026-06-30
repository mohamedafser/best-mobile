import { PaginationLinks, PaginationMeta } from "./types";

export type WalletCoins = {
  currency_code: string;
  total_active_coins: number;
  total_locked_coins: number;
  total_coins: number;
};

export type WalletCoinsResponse = {
  data: WalletCoins[];
};

export type WalletTransaction = {
  id: number;
  booking_code: string;
  type: "credit" | "debit";
  status: "pending" | "completed" | "failed";
  activation_date: string;
  amount: number;
  currency_code: string;
  reward_percentage: string;
  coin_conversion_rate: string;
  coins: number;
  coin_balance: number;
  transaction_category: string;
  title: string | null;

  meta: {
    note: string;
    details: {
      name: string;
      amount: number;
      currency: string;
      start_date: string;
      end_date: string;
      reference: string;
      booking_status: string;
      payment_status: string;
      reservation_id: string;
      provider_booking_id: string;
      confirmation_number: string;
      transaction_category: string;

      cashfree_order_id: string;
      cashfree_payment_id: string;

      wedbeds_booking_id: string | null;
      amadeus_booking_id: string | null;
      ratehawk_booking_id: string | null;
    };

    lock_days: number;
    used_plan: string;
    activation_date: string;
    payment_method_uuid: string | null;
  };

  created_at: string;
  booking_status: string;
  payment_status: string;
  pnr: string | null;
  ama_cancellation_number: string | null;
};

export type WalletTransactionsResponse = {
  data: WalletTransaction[];
  links: PaginationLinks;
  meta: PaginationMeta;
};
