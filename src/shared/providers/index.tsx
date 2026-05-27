"use client";

import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactNode, useMemo } from "react";

type ProvidersProps = {
  children: ReactNode;
};

/**
 * Provider con persistencia en localStorage:
 * - Si cierras la app y vuelves, el caché se restaura
 * - Stale time es muy alto (24h) así que casi no refetchea
 */
export function Providers({ children }: ProvidersProps) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10 * 60 * 2000, // 20 min
            gcTime: 24 * 60 * 60 * 1000, // 24h
            retry: 1,
          },
        },
      }),
    [],
  );

  // Persistencia en localStorage (solo en client)
  const persister = useMemo(
    () =>
      typeof window !== "undefined"
        ? createSyncStoragePersister({
            storage: window.localStorage,
            serialize: JSON.stringify,
            deserialize: JSON.parse,
          })
        : null,
    [],
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: persister!,
        maxAge: 24 * 60 * 60 * 1000, // Persist 24 horas
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
