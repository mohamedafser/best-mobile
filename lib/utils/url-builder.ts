export interface BookingQueryParams {
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  roomQuantity: number;
  cityName?: string;
  childrenAges?: number[];
  stateUuid?: string; // not `state` — reserved by Expo Router
  propertyId?: string;
}

const allowedKeys: (keyof BookingQueryParams)[] = [
  "checkInDate",
  "checkOutDate",
  "adults",
  "roomQuantity",
  "cityName",
  "childrenAges",
  "stateUuid",
  "propertyId",
];

export const buildBookingQuery = (params: BookingQueryParams) => {
  const searchParams = new URLSearchParams();

  allowedKeys.forEach((key) => {
    const value = params[key];

    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      if (key === "childrenAges" && Array.isArray(value)) {
        searchParams.append("children", value.join(","));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  return searchParams.toString();
};

export const buildSearchUrl = (params: BookingQueryParams) => {
  return `/search?${buildBookingQuery(params)}`;
};

export const buildHotelUrl = (
  countryCode: string,
  slug: string,
  params: BookingQueryParams,
) => {
  return `/hotel/${countryCode?.toLowerCase()}/${slug?.toLowerCase()}?${buildBookingQuery(
    params,
  )}`;
};
