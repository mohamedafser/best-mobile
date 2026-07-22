import type { CitiesItem } from "@/types/cities.types";
import { addDays, startOfDay } from "date-fns";

import { getNow } from "@/lib/utils/dateHelpers";

export type BookingDestination = CitiesItem & {
  hotel_id?: string | number;
  iata_code?: string;
  slug_details?: {
    country_code?: string;
    slug?: string;
    property_code?: string;
  };
};

export type BookingSearchValues = {
  destinationText: string;
  destination: BookingDestination | null;
  selectedHotel: BookingDestination | null;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  adults: number;
  children: number;
  rooms: number;
  childrenAges: number[];
};

export type BookingSearchBarProps = {
  value: BookingSearchValues;
  onChange: (value: BookingSearchValues) => void;
  onSearch: (value: BookingSearchValues) => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  autoOpenNextSteps?: boolean;
  placeholder?: string;
};

export const DEFAULT_BOOKING_GUESTS = {
  adults: 2,
  children: 0,
  rooms: 1,
  childrenAges: [] as number[],
};

export function createDefaultBookingSearchValues(): BookingSearchValues {
  const checkInDate = addDays(startOfDay(getNow()), 1);
  const checkOutDate = addDays(checkInDate, 1);

  return {
    destinationText: "",
    destination: null,
    selectedHotel: null,
    checkInDate,
    checkOutDate,
    ...DEFAULT_BOOKING_GUESTS,
    childrenAges: [],
  };
}

export function syncChildrenAges(
  children: number,
  currentAges: number[] = [],
): number[] {
  const next = currentAges.slice(0, children);
  while (next.length < children) {
    next.push(0);
  }
  return next;
}
