import { createQueryParams } from "@/lib/utils/create-query-params";
import type {
  HotelDetailsQueryParams,
  HotelDetailsResponse,
} from "@/types/hotel-details.types";
import { GET } from "./api";

export const getHotelDetailApi = (params: HotelDetailsQueryParams) => {
  const { propertyId, ...query } = params;
  const normalizedPropertyId = propertyId.toLowerCase();
  const queryString = createQueryParams({
    checkInDate: query.checkInDate,
    checkOutDate: query.checkOutDate,
    adults: query.adults,
    roomQuantity: query.roomQuantity,
    backSlug: query.backSlug,
  });

  // Example:
  // /hotel-detail/admaaafz/?checkInDate=...&checkOutDate=...&adults=2&roomQuantity=1&backSlug=%2Fhotel%2Fin%2F...
  return GET<HotelDetailsResponse>(
    `/hotel-detail/${normalizedPropertyId}/${queryString}`,
  );
};
