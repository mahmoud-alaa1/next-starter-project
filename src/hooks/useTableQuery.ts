"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useQueryParams } from "./useQueryParams";

type UseTableQueryOptions<TData> = {
  queryKey: string[];
  fetchFn: (params: Record<string, any>) => Promise<TData>;
};

export function useTableQuery<TData>({
  queryKey,
  fetchFn,
}: UseTableQueryOptions<TData>) {
  const filters = useQueryParams();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [...queryKey, filters],
    queryFn: () => fetchFn(filters),
  });

  useEffect(() => {
    if (!query.data) return;

    const currentPage = Number(filters.page || 1);

    queryClient.prefetchQuery({
      queryKey: [
        ...queryKey,
        { ...filters, page: (currentPage + 1).toString() },
      ],
      queryFn: () =>
        fetchFn({ ...filters, page: (currentPage + 1).toString() }),
    });

    if (currentPage > 1) {
      queryClient.prefetchQuery({
        queryKey: [
          ...queryKey,
          { ...filters, page: (currentPage - 1).toString() },
        ],
        queryFn: () =>
          fetchFn({ ...filters, page: (currentPage - 1).toString() }),
      });
    }
  }, [filters, query.data, queryKey, queryClient, fetchFn]);

  return query;
}
