import {
  WalletCoinsResponse,
  WalletTransactionsResponse,
} from "@/types/wallet.types";
import { GET } from "./api";

export const getWalletCoinsApi = () =>
  GET<WalletCoinsResponse>("/wallet/coins");

export const getTransactionApi = (data: any) => {
  const { from_date, to_date } = data || {};

  let query = "?limit=-1";
  if (from_date && to_date) {
    query += `&from_date=${from_date}&to_date=${to_date}`;
  }
  return GET<WalletTransactionsResponse>(`/wallet/transactions${query}`);
};
