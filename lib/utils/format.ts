import { getNowSafe } from "./dateHelpers";

type DateFormat = "text" | "numeric";

export function formatDate(
  input: string | Date,
  format: DateFormat = "text",
): string {
  const date = typeof input === "string" ? getNowSafe(input) : input;

  if (!date) {
    return "";
  }

  if (format === "text") {
    // Example: "08 Nov 2025"
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } else {
    // Example: "08-11-2025"
    return date.toLocaleDateString("en-GB").replace(/\//g, "-");
  }
}

export interface FormatCurrencyOptions {
  hideCurrency?: boolean;
  decimals?: number;
}

const currencyLocaleMap: Record<string, string> = {
  INR: "en-IN",
  USD: "en-US",
  EUR: "de-DE",
  AED: "en-AE",
  GBP: "en-GB",
  JPY: "ja-JP",
};

export const getLocaleByCurrency = (currency: string) =>
  currencyLocaleMap[currency] || "en-US";

export const formatCurrency = (
  value: number | string,
  currency: string = "USD",
  options: FormatCurrencyOptions = { decimals: 2 },
): string => {
  const { hideCurrency = false, decimals } = options;
  const num = Number(value);

  if (isNaN(num)) return "0.00";

  const hasDecimals = !Number.isInteger(num);
  const fractionDigits = hasDecimals ? (decimals ?? 2) : 0;

  const formatOptions: Intl.NumberFormatOptions = hideCurrency
    ? {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      }
    : {
        style: "currency",
        currency,
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      };

  return num.toLocaleString(getLocaleByCurrency(currency), formatOptions);
};

export const formatToPercentage = (
  value: number | string,
  decimals: number = 0,
): string => {
  const num = Number(value);
  if (isNaN(num)) return "0";

  const result = num / 100;
  return result.toFixed(decimals);
};
