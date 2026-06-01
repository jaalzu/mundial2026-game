// src/features/leaderboard/hooks/useLeaderboard.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getLeaderboard,
  type LeaderboardEntry,
} from "../actions/getLeaderboard";

// const LEADERBOARD_INIT_TIME = Date.now();

export function useLeaderboard(initialEntries: LeaderboardEntry[]) {
  const query = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => getLeaderboard(),
    initialData: initialEntries,
    // initialDataUpdatedAt: LEADERBOARD_INIT_TIME,
    refetchInterval: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });

  return {
    entries: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error as Error | null,
    refetch: () => query.refetch(),
  };
}
