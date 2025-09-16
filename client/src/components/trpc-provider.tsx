'use client';

import { config } from '@/lib/config';
import type { AppRouter } from '@server/routes/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { inferRouterOutputs } from '@trpc/server';
import { useState } from 'react';

export const trpc = createTRPCReact<AppRouter>();

type RouterOutputs = inferRouterOutputs<AppRouter>;
export type ServerFilter = RouterOutputs['getFilterOrDefault'];

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: config.apiUrl,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
