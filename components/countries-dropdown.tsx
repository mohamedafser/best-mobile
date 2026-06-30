import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getCountriesThunk } from "@/store/slice/countries-slice";
import { useEffect, useMemo } from "react";
import { Dropdown } from "./ui";

export type Country = {
  id?: string | number;
  uuid?: string;
  code: string;
  name: string;
};

type CountriesDropdownProps = {
  onChange: (country: Country) => void;
  selectedCountry: Country | null;
  validationError?: string;
  allowedCountries?: string[];
  isSearchable?: boolean;
};

export default function CountriesDropdown({
  onChange,
  selectedCountry,
  validationError,
  allowedCountries,
  isSearchable = true,
}: CountriesDropdownProps) {
  const dispatch = useAppDispatch();

  const { countries, loading } = useAppSelector((state) => state.countries);

  const filteredCountries = useMemo(() => {
    if (!countries) return [];

    if (!allowedCountries?.length) {
      return countries;
    }

    return countries.filter((country: Country) =>
      allowedCountries.includes(country.code),
    );
  }, [countries, allowedCountries]);

  const dropdownOptions = useMemo(
    () =>
      filteredCountries?.map((country: Country) => ({
        id: country.code,
        name: country.name,
        value: country,
      })),
    [filteredCountries],
  );

  useEffect(() => {
    dispatch(getCountriesThunk());
  }, [dispatch]);

  return (
    <Dropdown
      label="Country"
      options={dropdownOptions}
      value={selectedCountry?.name ?? "Select Country"}
      selected={!!selectedCountry}
      searchable={isSearchable}
      validationError={validationError}
      onChange={(selected) => {
        onChange(selected);
      }}
    />
  );
}
