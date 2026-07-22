import { createQueryParams } from "@/lib/utils/create-query-params";
import type {
  CitiesQueryParams,
  CitiesResponse,
  MiscellaneousPayload,
} from "@/types/cities.types";
import { GET, POST } from "./api";

export const getCitiesApi = (data: CitiesQueryParams) => {
  const query = createQueryParams(data);
  return GET<CitiesResponse>(`/cities${query}`);
};

export const postMiscellaneousApi = (body: MiscellaneousPayload) =>
  POST<any, any>("/miscellaneous", body);
