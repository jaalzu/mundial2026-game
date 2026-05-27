"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getLeaderboard,
  type LeaderboardEntry,
} from "../actions/getLeaderboard";

export type UseLeaderboardReturn = {
  entries: LeaderboardEntry[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
};

/**
 * Hook para el leaderboard con:
 * - Refetch automático cada 5 minutos
 * - Refetch al enfocar la ventana
 * - Refetch manual via refetch()
 */
export function useLeaderboard(userId?: string): UseLeaderboardReturn {
  const query = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => getLeaderboard(),
    refetchInterval: 60 * 60 * 2000, // 2 hora
    refetchOnWindowFocus: false, // Desactiva refetch al enfocar
    staleTime: 60 * 60 * 1000, // 1 hora
    gcTime: 24 * 60 * 60 * 1000, // 24 horas
    retry: 1,
  });

  return {
    entries: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error as Error | null,
    refetch: () => query.refetch(),
  };
}
