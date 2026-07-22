import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  clearHotelDetails,
  getHotelDetailThunk,
} from "@/store/slice/hotel-details.slice";
import type { HotelDetailsQueryParams } from "@/types/hotel-details.types";

function getParamValue(value?: string | string[]): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function extractPropertyIdFromSlug(slug?: string): string | undefined {
  if (!slug) return undefined;

  const lastSegment = slug.split("-").pop();
  if (!lastSegment || !/^[a-z0-9]+$/i.test(lastSegment)) return undefined;

  return lastSegment.toLowerCase();
}

function buildBackSlug(countryCode?: string, slug?: string): string | undefined {
  if (!countryCode || !slug) return undefined;
  return `/hotel/${countryCode.toLowerCase()}/${slug.toLowerCase()}`;
}

export function useHotelDetails() {
  const dispatch = useAppDispatch();
  const { details, loading, error } = useAppSelector(
    (state) => state.hotelDetails,
  );

  const params = useLocalSearchParams<{
    "country-code"?: string;
    slug?: string;
    propertyId?: string;
    checkInDate?: string;
    checkOutDate?: string;
    adults?: string;
    roomQuantity?: string;
    backSlug?: string;
  }>();

  const countryCode = getParamValue(params["country-code"]);
  const slug = getParamValue(params.slug);

  const propertyId = useMemo(() => {
    const fromQuery = getParamValue(params.propertyId);
    if (fromQuery) return fromQuery.toLowerCase();

    return extractPropertyIdFromSlug(slug) || "";
  }, [params.propertyId, slug]);

  const queryParams = useMemo<HotelDetailsQueryParams | null>(() => {
    if (!propertyId) return null;

    const backSlug =
      getParamValue(params.backSlug) || buildBackSlug(countryCode, slug);

    return {
      propertyId,
      checkInDate: getParamValue(params.checkInDate),
      checkOutDate: getParamValue(params.checkOutDate),
      adults: getParamValue(params.adults) || "2",
      roomQuantity: getParamValue(params.roomQuantity) || "1",
      backSlug,
    };
  }, [
    propertyId,
    countryCode,
    slug,
    params.checkInDate,
    params.checkOutDate,
    params.adults,
    params.roomQuantity,
    params.backSlug,
  ]);

  const fetchHotelDetails = useCallback(() => {
    if (!queryParams) return;

    dispatch(getHotelDetailThunk(queryParams));
  }, [dispatch, queryParams]);

  useEffect(() => {
    fetchHotelDetails();

    return () => {
      dispatch(clearHotelDetails());
    };
  }, [dispatch, fetchHotelDetails]);

  return {
    details,
    loading,
    error,
    propertyId,
    queryParams,
    refetch: fetchHotelDetails,
  };
}

export default useHotelDetails;
