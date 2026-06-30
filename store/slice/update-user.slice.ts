import { showErrorToast } from "@/lib/utils/toast";
import {
  updateEmailApi,
  updateNameApi,
  updatePasswordApi,
  verifyCurrentPasswordApi,
} from "@/services/api/update-user.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserProfileThunk } from "./user-profile.slice";

type UserProfileState = {
  // LOADING
  loading: boolean;

  // ERROR
  error: string | null;
};

const initialState: UserProfileState = {
  loading: false,
  error: null,
};

export const updateNameThunk = createAsyncThunk(
  "update-user/name",
  async (
    body: { first_name: string; last_name: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await updateNameApi(body);
      dispatch(getUserProfileThunk());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateEmailThunk = createAsyncThunk(
  "update-user/email",
  async (body: { email: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateEmailApi(body);
      dispatch(getUserProfileThunk());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updatePasswordThunk = createAsyncThunk(
  "update-user/password",
  async (
    body: { password: string; password_confirmation: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await updatePasswordApi(body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const verifyCurrentPasswordThunk = createAsyncThunk(
  "update-user/verify-current-password",
  async (body: { current_password: string }, { rejectWithValue }) => {
    try {
      const response = await verifyCurrentPasswordApi(body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const updateUserSlice = createSlice({
  name: "update-user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateNameThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateNameThunk.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateNameThunk.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || "Failed to update name";
    });

    builder.addCase(updateEmailThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateEmailThunk.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updateEmailThunk.rejected, (state, action: any) => {
      state.loading = false;
      showErrorToast(action.payload?.message || "Failed to update email");
    });

    builder.addCase(updatePasswordThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updatePasswordThunk.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(updatePasswordThunk.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || "Failed to update password";
    });

    builder.addCase(verifyCurrentPasswordThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(verifyCurrentPasswordThunk.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(
      verifyCurrentPasswordThunk.rejected,
      (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Failed to verify current password";
      },
    );
  },
});

export const { clearError } = updateUserSlice.actions;

export default updateUserSlice.reducer;
