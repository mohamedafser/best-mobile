import { getNow } from "@/lib/utils/dateHelpers";
import {
  getReservationApi,
  getReservationDetailsApi,
} from "@/services/api/reservation.api";
import { ReservationResponse } from "@/types/reservation.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAfter, isWithinInterval, parseISO, startOfDay } from "date-fns";

type ModifiedReservations = {
  current: ReservationResponse[];
  upcoming: ReservationResponse[];
  past: ReservationResponse[];
  cancelled: ReservationResponse[];
};
type ReservationState = {
  reservations: ReservationResponse[];
  reservationsModified: ModifiedReservations;
  reservationDetails: ReservationResponse | null;
  loading: boolean;
  error: string | null;
};

const initialState: ReservationState = {
  reservations: [],
  reservationsModified: {
    current: [],
    upcoming: [],
    past: [],
    cancelled: [],
  },
  reservationDetails: null,
  loading: false,
  error: null,
};
const today = startOfDay(getNow());

const classifyBooking = (booking: ReservationResponse) => {
  const checkIn = startOfDay(parseISO(booking.room.check_in_date));
  const checkOut = startOfDay(parseISO(booking.room.check_out_date));

  if (isAfter(today, checkOut)) return "past";

  if (
    isWithinInterval(today, {
      start: checkIn,
      end: checkOut,
    })
  ) {
    return "current";
  }

  return "upcoming";
};

const groupBookingsByStatus = (bookings: ReservationResponse[]) => {
  if (!bookings) return { current: [], upcoming: [], past: [], cancelled: [] };
  const cancelled = bookings.filter((booking) => booking?.is_cancelled);
  const active = bookings.filter((booking) => !booking.is_cancelled);
  const res = active.reduce(
    (acc: ModifiedReservations, booking: ReservationResponse) => {
      const status = classifyBooking(booking);
      acc[status].push(booking);
      return acc;
    },
    {
      current: [],
      upcoming: [],
      past: [],
      cancelled: [],
    },
  );

  return { ...res, cancelled };
};

export const getReservationThunk = createAsyncThunk(
  "reservation/getReservations",
  async (params: { id: string } | undefined, thunkAPI) => {
    try {
      const response = await getReservationApi(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch reservations",
      );
    }
  },
);

export const getReservationDetailsThunk = createAsyncThunk(
  "reservation/getReservationDetails",
  async (params: { id: string }, thunkAPI) => {
    try {
      const response = await getReservationDetailsApi(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch reservation details",
      );
    }
  },
);

const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    clearReservationError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // getReservationThunk
    builder.addCase(getReservationThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getReservationThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.reservations = action.payload;
      state.reservationsModified = groupBookingsByStatus(action.payload);
    });
    builder.addCase(getReservationThunk.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch reservations";
    });

    // getReservationDetailsThunk
    builder.addCase(getReservationDetailsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getReservationDetailsThunk.fulfilled, (state, action) => {
      state.loading = false;
      // Since the API response data is an array of ReservationResponse, we take the first element for reservationDetails
      state.reservationDetails = action.payload;
    });
    builder.addCase(
      getReservationDetailsThunk.rejected,
      (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch reservation details";
      },
    );
  },
});

export const { clearReservationError } = reservationSlice.actions;

export default reservationSlice.reducer;
