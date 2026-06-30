import { parsePhoneNumberFromString } from "libphonenumber-js";

export const isValidPhoneNumber = (phone: string, countryCode: string) => {
  try {
    const parsed = parsePhoneNumberFromString(phone, countryCode as any);

    return parsed?.isValid() ?? false;
  } catch {
    return false;
  }
};
