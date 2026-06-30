import { BEST_INFO, BEST_USER_TOKEN } from "@/constant/auth";
import { signInApi, SignInPayload } from "@/services/api/auth/signin";
import { signUpApi, SignUpPayload } from "@/services/api/auth/signup";
import { AuthResponse } from "@/services/api/auth/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type AuthState = {
  user: AuthResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  success: false,
};

export const signInThunk = createAsyncThunk(
  "auth/signInThunk",
  async (payload: SignInPayload, thunkAPI) => {
    try {
      return await signInApi(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const signUpThunk = createAsyncThunk(
  "auth/signUpThunk",
  async (payload: SignUpPayload, thunkAPI) => {
    try {
      return await signUpApi(payload);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.success = false;
      AsyncStorage.removeItem(BEST_USER_TOKEN);
      AsyncStorage.removeItem(BEST_INFO);
    },
    clearSigninError: (state) => {
      state.error = null;
    },
    clearSignupError: (state) => {
      state.error = null;
    },
    resetSignupState: (state) => {
      state.success = false;
      state.error = null;
    },
    completeOnboarding: (state) => {
      if (state.user) {
        state.user.is_onboarding_complete = 1;
      }
    },
  },
  extraReducers: (builder) => {
    // Sign In cases
    builder.addCase(signInThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      const { token, ...rest } = action.payload;
      AsyncStorage.setItem(BEST_USER_TOKEN, token);
      AsyncStorage.setItem(BEST_INFO, JSON.stringify(rest));
    });
    builder.addCase(signInThunk.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });

    // Sign Up cases
    builder.addCase(signUpThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.success = true;
      const { token, ...rest } = action.payload;
      AsyncStorage.setItem(BEST_USER_TOKEN, token);
      AsyncStorage.setItem(BEST_INFO, JSON.stringify(rest));
    });
    builder.addCase(signUpThunk.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
  },
});

export const {
  logout,
  clearSigninError,
  clearSignupError,
  resetSignupState,
  completeOnboarding,
} = authSlice.actions;

export default authSlice.reducer;
