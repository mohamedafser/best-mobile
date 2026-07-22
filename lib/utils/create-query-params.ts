type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | (string | number)[];

type QueryParams = Record<string, QueryValue>;

export const createQueryParams = (
  params: QueryParams,
  includeQuestionMark = true,
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) return;

      searchParams.set(key, value.join(","));
      return;
    }

    searchParams.set(key, String(value));
  });

  const queryString = searchParams.toString();

  if (!queryString) return "";

  return includeQuestionMark ? `?${queryString}` : queryString;
};
