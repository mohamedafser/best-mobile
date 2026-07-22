export type CitiesItem = {
  id?: string | number;
  uuid?: string;
  name?: string;
  country?: {
    name?: string;
    code?: string;
  };
  state?: {
    name?: string;
    uuid?: string;
    code?: string;
  };
  contact?: {
    city?: string;
    country?: string;
  };
};

export type CitiesResponse = {
  data?: CitiesItem[];
  cities?: CitiesItem[];
  hotels?: CitiesItem[];
};

export type CitiesQueryParams = {
  isSearchBar?: boolean;
  name?: string;
  countryCode?: string;
};

export type MiscellaneousPayload = {
  key: "let_us_know";
  value: string;
};
