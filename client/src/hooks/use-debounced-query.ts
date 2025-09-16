import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

interface UseDebouncedQueryOptions<TData> {
  queryKey: (string | number | boolean | object)[];
  queryFn: () => Promise<TData>;
  debounceMs?: number;
}

/**
 * Custom hook that combines React Query with debouncing to avoid excessive API calls
 * when filters or dependencies change rapidly.
 */
export function useDebouncedQuery<TData>({
  queryKey,
  queryFn,
  debounceMs = 500,
}: UseDebouncedQueryOptions<TData>) {
  // Debounce the query key to prevent rapid refetches
  const [debouncedQueryKey] = useDebounce(queryKey, debounceMs);

  return useQuery({
    queryKey: debouncedQueryKey,
    queryFn,
  });
}
