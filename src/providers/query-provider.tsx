import { QueryClientProvider } from '@tanstack/react-query';

import React from 'react';

import { queryClient } from '@/shared/configs/query-configs';

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
