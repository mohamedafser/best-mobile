import { addDays, format, isBefore, startOfDay } from "date-fns";
import { useCallback, useMemo, useState } from "react";

import type { GuestSelectorValue } from "@/components/guest-selector";
import { getNow } from "@/lib/utils/dateHelpers";
import { joinWithComma } from "@/lib/utils/join-with-comma";
import { getPluralWord } from "@/lib/utils/pluralize";
import { showErrorToast } from "@/lib/utils/toast";
import type { CitiesItem } from "@/types/cities.types";

import type {
  BookingDestination,
  BookingSearchBarProps,
  BookingSearchValues,
} from "./types";
import { syncChildrenAges } from "./types";

function formatDateSummary(
  checkInDate: Date | null,
  checkOutDate: Date | null,
) {
  if (!checkInDate || !checkOutDate) return "Add dates";
  return `${format(checkInDate, "MMM d")} - ${format(checkOutDate, "MMM d")}`;
}

function formatGuestSummary(adults: number, children: number, rooms: number) {
  const parts = [`${adults} ${getPluralWord(adults, "Adult")}`];

  if (children > 0) {
    parts.push(`${children} ${getPluralWord(children, "Child", "Children")}`);
  }

  if (rooms > 0) {
    parts.push(`${rooms} ${getPluralWord(rooms, "Room")}`);
  }

  return parts.join(", ");
}

function formatDestinationLabel(item: BookingDestination) {
  if (item.hotel_id) {
    return item.name || "";
  }

  return joinWithComma(item.name, item.state?.name, item.country?.name);
}

function validateBookingSearch(value: BookingSearchValues): string | null {
  const hasDestination =
    !!value.destination ||
    !!value.selectedHotel ||
    !!value.destinationText.trim();

  if (!hasDestination) {
    return "Please select a destination or hotel";
  }

  if (!value.checkInDate || !value.checkOutDate) {
    return "Please select check-in and check-out dates";
  }

  if (
    !isBefore(startOfDay(value.checkInDate), startOfDay(value.checkOutDate))
  ) {
    return "Check-out must be after check-in";
  }

  if (value.adults < 1) {
    return "At least 1 adult is required";
  }

  if (value.rooms < 1) {
    return "At least 1 room is required";
  }

  if (
    value.children > 0 &&
    (value.childrenAges.length < value.children ||
      value.childrenAges.some((age) => !age || age <= 0))
  ) {
    return "Please select age for all children";
  }

  return null;
}

function cloneDate(date: Date | null) {
  return date ? new Date(date.getTime()) : null;
}

export function useBookingSearchBar({
  value,
  onChange,
  onSearch,
  loading = false,
  disabled = false,
  autoOpenNextSteps = true,
  placeholder = "Where are you going?",
}: BookingSearchBarProps) {
  const [expanded, setExpanded] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [guestSelectorOpen, setGuestSelectorOpen] = useState(false);
  const [topResult, setTopResult] = useState<BookingDestination | null>(null);
  const [activeField, setActiveField] = useState<
    "destination" | "dates" | "guests" | null
  >(null);

  const minDate = useMemo(() => addDays(startOfDay(getNow()), 1), []);

  const dateRange = useMemo(() => {
    if (value.checkInDate && value.checkOutDate) {
      return [value.checkInDate, value.checkOutDate];
    }
    if (value.checkInDate) return [value.checkInDate];
    return [];
  }, [value.checkInDate, value.checkOutDate]);

  const destinationSummary = value.destinationText.trim() || placeholder;
  const datesSummary = formatDateSummary(value.checkInDate, value.checkOutDate);
  const guestsSummary = formatGuestSummary(
    value.adults,
    value.children,
    value.rooms,
  );

  const updateValue = useCallback(
    (patch: Partial<BookingSearchValues>) => {
      onChange({ ...value, ...patch });
    },
    [onChange, value],
  );

  const applyDestination = useCallback(
    (item: BookingDestination) => {
      if (item?.hotel_id) {
        updateValue({
          selectedHotel: item,
          destination: null,
          destinationText: item.name || "",
        });
        return;
      }

      updateValue({
        destination: item,
        selectedHotel: null,
        destinationText: formatDestinationLabel(item),
      });
    },
    [updateValue],
  );

  const handleDestinationSelect = useCallback(
    (item: BookingDestination) => {
      applyDestination(item);
      setActiveField(null);

      if (autoOpenNextSteps) {
        setDatePickerOpen(true);
        setGuestSelectorOpen(false);
        setActiveField("dates");
      }
    },
    [applyDestination, autoOpenNextSteps],
  );

  const handleDestinationInputChange = useCallback(
    (text: string) => {
      updateValue({
        destinationText: text,
        destination: null,
        selectedHotel: null,
      });
    },
    [updateValue],
  );

  const handleDateChange = useCallback(
    (range: Date[]) => {
      const checkInDate = cloneDate(range[0] ?? null);
      const checkOutDate = cloneDate(range[1] ?? null);

      updateValue({
        checkInDate,
        checkOutDate,
      });

      if (autoOpenNextSteps && checkInDate && checkOutDate) {
        setDatePickerOpen(false);
        setGuestSelectorOpen(true);
        setActiveField("guests");
      }
    },
    [autoOpenNextSteps, updateValue],
  );

  const handleGuestsChange = useCallback(
    (guests: GuestSelectorValue) => {
      updateValue({
        adults: guests.adults,
        children: guests.children,
        rooms: guests.rooms,
        childrenAges: syncChildrenAges(guests.children, guests.childrenAges),
      });
    },
    [updateValue],
  );

  const resolveSearchValue = useCallback(
    (baseValue: BookingSearchValues): BookingSearchValues => {
      if (baseValue.destination || baseValue.selectedHotel) {
        return baseValue;
      }

      if (!topResult) {
        return baseValue;
      }

      if (topResult.hotel_id) {
        return {
          ...baseValue,
          selectedHotel: topResult,
          destination: null,
          destinationText: topResult.name || baseValue.destinationText,
        };
      }

      return {
        ...baseValue,
        destination: topResult,
        selectedHotel: null,
        destinationText: formatDestinationLabel(topResult),
      };
    },
    [topResult],
  );

  const handleSearchPress = useCallback(() => {
    if (loading || disabled) return;

    const nextValue = resolveSearchValue(value);
    onChange(nextValue);

    const error = validateBookingSearch(nextValue);
    if (error) {
      showErrorToast(error);
      return;
    }

    setExpanded(false);
    setDatePickerOpen(false);
    setGuestSelectorOpen(false);
    setActiveField(null);
    onSearch(nextValue);
  }, [disabled, loading, onChange, onSearch, resolveSearchValue, value]);

  const openExpanded = useCallback(() => {
    if (disabled) return;
    setExpanded(true);
  }, [disabled]);

  const closeExpanded = useCallback(() => {
    setExpanded(false);
    setDatePickerOpen(false);
    setGuestSelectorOpen(false);
    setActiveField(null);
  }, []);

  const handleDatePickerOpenChange = useCallback((open: boolean) => {
    setDatePickerOpen(open);
    setActiveField(open ? "dates" : null);
    if (open) setGuestSelectorOpen(false);
  }, []);

  const handleGuestSelectorOpenChange = useCallback((open: boolean) => {
    setGuestSelectorOpen(open);
    setActiveField(open ? "guests" : null);
    if (open) setDatePickerOpen(false);
  }, []);

  const handleTopResultUpdate = useCallback((item: CitiesItem | null) => {
    setTopResult((item as BookingDestination) || null);
  }, []);

  return {
    value,
    loading,
    disabled,
    placeholder,
    expanded,
    datePickerOpen,
    guestSelectorOpen,
    activeField,
    minDate,
    dateRange,
    destinationSummary,
    datesSummary,
    guestsSummary,
    handleDestinationSelect,
    handleDestinationInputChange,
    handleDateChange,
    handleGuestsChange,
    handleSearchPress,
    openExpanded,
    closeExpanded,
    handleDatePickerOpenChange,
    handleGuestSelectorOpenChange,
    handleTopResultUpdate,
  };
}
