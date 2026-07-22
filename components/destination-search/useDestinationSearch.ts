import { useDebounce } from "@/hooks/use-debounce";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { showErrorToast } from "@/lib/utils/toast";
import {
  getCitiesThunk,
  postMiscellaneousThunk,
} from "@/store/slice/cities.slice";
import type { CitiesItem, CitiesResponse } from "@/types/cities.types";
import { useEffect, useMemo, useState } from "react";

function reorderCitiesByStateCode(
  data: CitiesResponse,
  stateCode?: string | null,
): CitiesResponse {
  if (!stateCode || !Array.isArray(data.cities)) return data;

  const matchIndex = data.cities.findIndex(
    (item) =>
      item?.state?.uuid === stateCode ||
      item?.state?.name?.toLowerCase() === stateCode.toLowerCase() ||
      item?.state?.code?.toLowerCase() === stateCode.toLowerCase(),
  );

  if (matchIndex < 0) return data;

  const matchedItem = data.cities[matchIndex];
  return {
    ...data,
    cities: [
      matchedItem,
      ...data.cities.slice(0, matchIndex),
      ...data.cities.slice(matchIndex + 1),
    ],
  };
}

export function useDestinationSearch(
  value: string = "",
  stateCode?: string | null,
) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.cities.loading);

  const [searchTerm, setSearchTerm] = useState(value);
  const [prevValue, setPrevValue] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isNoDestinationApiCalled, setIsNoDestinationApiCalled] =
    useState(false);
  const [lists, setLists] = useState<CitiesResponse>({});

  if (value !== prevValue) {
    setPrevValue(value);
    setSearchTerm(value);
  }

  const debouncedQuery = useDebounce(searchTerm, 1000);

  const topResult = useMemo<CitiesItem | null>(() => {
    const listData = lists?.data || [];
    const cities = lists?.cities || [];
    const hotels = lists?.hotels || [];
    return listData[0] || cities[0] || hotels[0] || null;
  }, [lists]);

  useEffect(() => {
    let cancelled = false;

    const fetchCities = async () => {
      try {
        const query = !debouncedQuery.trim()
          ? { countryCode: "US" }
          : {
              isSearchBar: true,
              name: debouncedQuery.split(",")[0]?.trim() || debouncedQuery,
            };

        const data = await dispatch(getCitiesThunk(query)).unwrap();
        if (cancelled) return;

        setLists(reorderCitiesByStateCode(data || {}, stateCode));
      } catch (error: any) {
        if (cancelled) return;
        showErrorToast(
          error?.message || "Failed to fetch cities. Please try again later.",
        );
      }
    };

    if (showDropdown) {
      fetchCities();
    }

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, dispatch, showDropdown, stateCode]);

  const onClickLetUsKnowCta = async () => {
    try {
      await dispatch(
        postMiscellaneousThunk({ key: "let_us_know", value: searchTerm }),
      ).unwrap();
      setIsNoDestinationApiCalled(true);
    } catch {
      setIsNoDestinationApiCalled(false);
    }
  };

  const closeDropdown = () => {
    setShowDropdown(false);
    setIsNoDestinationApiCalled(false);
  };

  return {
    lists,
    searchTerm,
    setSearchTerm,
    showDropdown,
    setShowDropdown,
    closeDropdown,
    loading,
    topResult,
    onClickLetUsKnowCta,
    isNoDestinationApiCalled,
  };
}
