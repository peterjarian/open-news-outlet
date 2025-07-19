'use client';

import { withSearchParams } from '@/lib/fetch';
import { ApiResponse, GetUsersApiResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useUsers(limit?: number, offset?: number) {
  return useQuery({
    queryKey: ['users', limit, offset],
    queryFn: () =>
      fetch(
        withSearchParams(`/api/users`, ['limit', String(limit)], ['offset', String(offset)]),
      ).then(async (res) => await res.json()) as Promise<ApiResponse<GetUsersApiResponse>>,
  });
}
