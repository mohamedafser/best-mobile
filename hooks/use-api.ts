// hooks/useApi.ts

import { useCallback, useState } from "react";

type ApiFunction<T> = () => Promise<T>;

type UseApiOptions<T> = {
  onSuccess?: (data: T) => void;
  onError?: (message: string, error?: any) => void;
};

export function useApi<T>(options?: UseApiOptions<T>) {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<T | null>(null);

  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (apiFunc: ApiFunction<T>) => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiFunc();

        setData(response);

        options?.onSuccess?.(response);

        return response;
      } catch (err: any) {
        const message = err?.message || "Something went wrong";

        setError(message);

        options?.onError?.(message, err);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [options],
  );

  return {
    loading,
    data,
    error,
    request,
  };
}
