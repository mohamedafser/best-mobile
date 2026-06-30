import { getUserProfileApi } from "@/services/api/user-profile.api";
import { UserResponse } from "@/types/user-profile.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type UserProfileState = {
  userProfile: UserResponse;
  loading: boolean;
  error: string | null;
};

const initialState: UserProfileState = {
  userProfile: {} as UserResponse,
  loading: false,
  error: null,
};

export const getUserProfileThunk = createAsyncThunk(
  "user-profile/getUserProfile",
  async (_, thunkAPI) => {
    try {
      const response = await getUserProfileApi();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch user profile",
      );
    }
  },
);

const userProfileSlice = createSlice({
  name: "user-profile",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfileThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.userProfile = action.payload;
    });

    builder.addCase(getUserProfileThunk.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch user profile";
    });
  },
});

export const { clearError } = userProfileSlice.actions;

export default userProfileSlice.reducer;
