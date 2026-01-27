// hooks/useListQuery.ts
import { useQuery, type QueryKey } from '@tanstack/react-query';

interface UseListQueryOptions<T> {
  queryKey: QueryKey;
  queryFn: () => Promise<T[]>;
  enabled?: boolean;
}

export function useListQuery<T>({
  queryKey,
  queryFn,
  enabled = true,
}: UseListQueryOptions<T>) {
  return useQuery<T[]>({
    queryKey,
    queryFn,
    enabled,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: false,
  });
}