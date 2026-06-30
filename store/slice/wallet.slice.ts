import {
  getTransactionApi,
  getWalletCoinsApi,
} from "@/services/api/wallet.api";
import { WalletCoins, WalletTransactionsResponse } from "@/types/wallet.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type WalletState = {
  coins: WalletCoins[];
  transactions: WalletTransactionsResponse | null;
  loading: boolean;
  error: string | null;
};

const initialState: WalletState = {
  coins: [],
  transactions: null,
  loading: false,
  error: null,
};

export const getWalletCoinsThunk = createAsyncThunk(
  "wallet/getWalletCoins",
  async (_, thunkAPI) => {
    try {
      const response = await getWalletCoinsApi();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch wallet coins",
      );
    }
  },
);

export const getTransactionsThunk = createAsyncThunk(
  "wallet/getTransactions",
  async (params: any, thunkAPI) => {
    try {
      const response = await getTransactionApi(params);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch wallet transactions",
      );
    }
  },
);

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    clearWalletCoinsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWalletCoinsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getWalletCoinsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.coins = action.payload;
    });

    builder.addCase(getWalletCoinsThunk.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch wallet coins";
    });
    builder.addCase(getTransactionsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTransactionsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    });
    builder.addCase(getTransactionsThunk.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch wallet transactions";
    });
  },
});

export const { clearWalletCoinsError } = walletSlice.actions;

export default walletSlice.reducer;
