import { MutationCache, QueryClient, QueryKey } from '@tanstack/react-query';

import { DEFAULT_GC_TIME, DEFAULT_STALE_TIME } from '@/shared/constants/api.constants';

declare module '@tanstack/react-query' {
  interface Register {
    invalidateQueries?: QueryKey;
    successMessage?: string;
    errorMessage?: string;
  }
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      staleTime: DEFAULT_STALE_TIME,
      gcTime: DEFAULT_GC_TIME,
    },
    mutations: {
      retry: 1,
    },
  },
  mutationCache: new MutationCache({
    onSuccess: (_, __, ___, mutations) => {
      if (mutations.meta?.successMessage) {
        console.log('Mutation successful', mutations.meta.successMessage);
      }
      if (mutations.meta?.invalidateQueries) {
        queryClient.invalidateQueries({ queryKey: mutations.meta.invalidateQueries as QueryKey });
      }
    },
    onError: (_, __, ___, mutations) => {
      if (mutations.meta?.errorMessage) {
        console.log('Mutation failed', mutations.meta.errorMessage);
      }
    },
  }),
});

export { queryClient };
