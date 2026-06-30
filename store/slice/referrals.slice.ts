import { createReferralApi } from "@/services/api/referral.api";
import { CreateReferralType } from "@/types/referrals.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type ReferralsState = {
  // LOADING
  loading: boolean;

  // ERROR
  error: string | null;
  success: boolean;
};

const initialState: ReferralsState = {
  loading: false,
  error: null,
  success: false,
};

export const createReferralThunk = createAsyncThunk(
  "referrals/send",
  async (body: CreateReferralType, { rejectWithValue }) => {
    try {
      const response = await createReferralApi(body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const referralsSlice = createSlice({
  name: "referrals",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createReferralThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });

    builder.addCase(createReferralThunk.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });

    builder.addCase(createReferralThunk.rejected, (state, action: any) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload || "Failed to send referral";
    });
  },
});

export const { clearError, clearSuccess } = referralsSlice.actions;

export default referralsSlice.reducer;
