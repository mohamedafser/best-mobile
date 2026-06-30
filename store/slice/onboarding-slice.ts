import { showErrorToast, showSuccessToast } from "@/lib/utils/toast";
import {
  onboardingApi,
  OnboardingUserInfoType,
  OtpType,
  resendOtpApi,
  sendOtpApi,
  verifyOtpApi,
} from "@/services/api/onboarding.api";
import { completeOnboarding } from "@/store/slice/authSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type OnboardingState = {
  country: any;
  mobileNumber: string;
  otp: string;
  familyEmailOne: string;
  familyEmailTwo: string;
  familyEmailThree: string;
  loading: boolean;
  step: 1 | 2 | 3;
  error: string | null;
  dialCode: string;
  isResendOtp: boolean;
};

const initialState: OnboardingState = {
  country: "",
  mobileNumber: "",
  otp: "",
  familyEmailOne: "",
  familyEmailTwo: "",
  familyEmailThree: "",
  loading: false,
  step: 1,
  error: null,
  dialCode: "",
  isResendOtp: false,
};

export const sendOtpThunk = createAsyncThunk(
  "onboarding/sendOtp",
  async (body: Pick<OtpType, "phone">, { rejectWithValue }) => {
    try {
      const response = await sendOtpApi(body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const verifyOtpThunk = createAsyncThunk(
  "onboarding/verifyOtp",
  async (body: OtpType, { rejectWithValue }) => {
    try {
      const response = await verifyOtpApi(body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const resendOtpThunk = createAsyncThunk(
  "onboarding/resendOtp",
  async (body: Pick<OtpType, "phone">, { rejectWithValue }) => {
    try {
      const response = await resendOtpApi(body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const registerThunk = createAsyncThunk(
  "onboarding/register",
  async (body: OnboardingUserInfoType, { rejectWithValue, dispatch }) => {
    try {
      const response = await onboardingApi(body);
      dispatch(completeOnboarding());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload.phone;
      state.dialCode = action.payload.dialCode;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setFamilyEmailOne: (state, action) => {
      state.familyEmailOne = action.payload;
    },
    setFamilyEmailTwo: (state, action) => {
      state.familyEmailTwo = action.payload;
    },
    setFamilyEmailThree: (state, action) => {
      state.familyEmailThree = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setResendOtp: (state) => {
      state.isResendOtp = !state.isResendOtp;
    },
  },
  extraReducers: (builder) => {
    // SEND OTP
    builder.addCase(sendOtpThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(sendOtpThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.step = 2;
      showSuccessToast("OTP sent successfully");
    });
    builder.addCase(sendOtpThunk.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
      showErrorToast(action.payload || "Failed to send OTP");
    });
    // VERIFY OTP
    builder.addCase(verifyOtpThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyOtpThunk.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.step = 3;
      showSuccessToast("OTP verified successfully");
    });
    builder.addCase(verifyOtpThunk.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
      showErrorToast(action.payload || "Failed to verify OTP");
    });
    // RESEND OTP
    builder.addCase(resendOtpThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(resendOtpThunk.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.isResendOtp = false;
      showSuccessToast("OTP sent successfully");
    });
    builder.addCase(resendOtpThunk.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
      showErrorToast(action.payload || "Failed to resend OTP");
    });
    // REGISTER
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerThunk.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      showSuccessToast("Registered successfully");
    });
    builder.addCase(registerThunk.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
      showErrorToast(action.payload || "Failed to register");
    });
  },
});

export const {
  clearError,
  setStep,
  setCountry,
  setMobileNumber,
  setOtp,
  setFamilyEmailOne,
  setFamilyEmailTwo,
  setFamilyEmailThree,
  setError,
  setResendOtp,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
