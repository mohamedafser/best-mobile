import {
  format,
  addDays,
  differenceInCalendarDays,
  parse,
  parseISO,
  isValid,
} from "date-fns";

const DEFAULT_FORMAT = "yyyy-MM-dd";

/**
 * Returns current date
 */
export const getNow = (): Date => {
  return new Date();
};

/**
 * Safely parse value into Date using date-fns
 */
export const getNowSafe = (
  value?: Date | string | number | null,
): Date | null => {
  if (!value) return null;

  let parsedDate: Date;

  if (value instanceof Date) {
    parsedDate = value;
  } else if (typeof value === "string") {
    // First try parsing using known format
    parsedDate = parse(value, DEFAULT_FORMAT, getNow());

    // Fallback to ISO parsing if needed
    if (!isValid(parsedDate)) {
      parsedDate = parseISO(value);
    }
  } else {
    parsedDate = new Date(value);
  }

  return isValid(parsedDate) ? parsedDate : null;
};

/**
 * Format any date value
 */
export const formatDate = (
  date: Date | string | number,
  dateFormat: string = DEFAULT_FORMAT,
): string => {
  const parsedDate = getNowSafe(date);
  if (!parsedDate) return "";

  return format(parsedDate, dateFormat);
};

/**
 * Get formatted date after X days from today
 */
export const getFutureDate = (
  daysToAdd: number,
  dateFormat: string = DEFAULT_FORMAT,
): string => {
  return format(addDays(getNow(), daysToAdd), dateFormat);
};

/**
 * Calculate number of nights between two dates
 */
export const getNightStayCount = (
  checkInDate?: Date | string | number | null,
  checkOutDate?: Date | string | number | null,
): number => {
  const checkIn = getNowSafe(checkInDate);
  const checkOut = getNowSafe(checkOutDate);

  if (!checkIn || !checkOut) return 0;

  const diff = differenceInCalendarDays(checkOut, checkIn);

  return diff > 0 ? diff : 0;
};

/**
 * Check if a date is in the past
 */
export const isPastDate = (date: Date | string | number): boolean => {
  const parsedDate = getNowSafe(date);
  if (!parsedDate) return false;

  return differenceInCalendarDays(parsedDate, getNow()) < 0;
};

/**
 * Check if given date is today
 */
export const isTodayDate = (date?: Date | string | number | null): boolean => {
  const parsedDate = getNowSafe(date);
  if (!parsedDate) return false;

  return differenceInCalendarDays(parsedDate, getNow()) === 0;
};
