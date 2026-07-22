import { getCitiesApi, postMiscellaneousApi } from "@/services/api/cities.api";
import {
  CitiesQueryParams,
  CitiesResponse,
  MiscellaneousPayload,
} from "@/types/cities.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type CitiesState = {
  lists: CitiesResponse;
  loading: boolean;
  error: string | null;
};

const initialState: CitiesState = {
  lists: {},
  loading: false,
  error: null,
};

export const getCitiesThunk = createAsyncThunk(
  "cities/getCities",
  async (query: CitiesQueryParams, thunkAPI) => {
    try {
      // GET() already returns response.data
      return await getCitiesApi(query);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch cities",
      );
    }
  },
);

export const postMiscellaneousThunk = createAsyncThunk(
  "miscellaneous/postMiscellaneous",
  async (body: MiscellaneousPayload, { rejectWithValue }) => {
    try {
      return await postMiscellaneousApi(body);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    clearCitiesError: (state) => {
      state.error = null;
    },
    clearCitiesLists: (state) => {
      state.lists = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCitiesThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getCitiesThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.lists = action.payload || {};
    });

    builder.addCase(getCitiesThunk.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch cities";
    });

    // Keep search loading independent from "let us know" submission
    builder.addCase(postMiscellaneousThunk.rejected, (state, action: any) => {
      state.error = action.payload || "Failed to post miscellaneous";
    });
  },
});

export const { clearCitiesError, clearCitiesLists } = citiesSlice.actions;

export default citiesSlice.reducer;
