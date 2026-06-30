// import { useUserDetails } from "@/context";
import { formatCurrency, FormatCurrencyOptions } from "@/lib/utils/format";

export const useCurrency = () => {
  // const {
  //   userDetails: { currencyCode },
  // } = useUserDetails();

  const amountWithCurrency = (
    amount?: string | number | null,
    code?: string,
    options?: FormatCurrencyOptions,
  ) => {
    const currency = code ? code : "USD";

    // If amount is null/undefined/empty string, return an empty string instead of showing e.g. "₹undefined"
    if (amount == null || amount === "") return "";

    return formatCurrency(amount, currency || "USD", options);
  };

  return {
    amountWithCurrency,
  };
};
