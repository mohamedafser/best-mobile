import { getHotelDetailApi } from "@/services/api/hotel-details.api";
import type {
  HotelDetails,
  HotelDetailsQueryParams,
} from "@/types/hotel-details.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type HotelDetailsState = {
  details: HotelDetails | null;
  loading: boolean;
  error: string | null;
};

const initialState: HotelDetailsState = {
  details: null,
  loading: false,
  error: null,
};

export const getHotelDetailThunk = createAsyncThunk(
  "hotelDetails/getHotelDetail",
  async (params: HotelDetailsQueryParams, thunkAPI) => {
    try {
      return await getHotelDetailApi(params);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch hotel details",
      );
    }
  },
);

const hotelDetailsSlice = createSlice({
  name: "hotelDetails",
  initialState,
  reducers: {
    clearHotelDetailsError: (state) => {
      state.error = null;
    },
    clearHotelDetails: (state) => {
      state.details = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHotelDetailThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getHotelDetailThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.details = action.payload?.data ?? null;
    });

    builder.addCase(getHotelDetailThunk.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch hotel details";
    });
  },
});

export const { clearHotelDetailsError, clearHotelDetails } =
  hotelDetailsSlice.actions;

export default hotelDetailsSlice.reducer;
