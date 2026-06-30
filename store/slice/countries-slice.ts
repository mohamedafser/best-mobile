import { Country, getCountriesApi } from "@/services/api/countries.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type CountryState = {
  countries: Country[];
  loading: boolean;
  error: string | null;
};

const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

export const getCountriesThunk = createAsyncThunk(
  "country/getCountries",
  async (_, thunkAPI) => {
    try {
      const response = await getCountriesApi();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch countries",
      );
    }
  },
);

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    clearCountriesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCountriesThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getCountriesThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.countries = action.payload;
    });

    builder.addCase(getCountriesThunk.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch countries";
    });
  },
});

export const { clearCountriesError } = countrySlice.actions;

export default countrySlice.reducer;
