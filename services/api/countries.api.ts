import { GET } from "./api";

export type Country = {
  uuid: string;
  name: string;
  continent: string;
  code: string;
  alpha3_code: string;
  active: number;
};

export const getCountriesApi = () => GET<{ data: Country[] }>("/countries");
