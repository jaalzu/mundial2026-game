"use client";

import { useQueries } from "@tanstack/react-query";
import { getUserStats } from "../actions/getUserStats";
import { getTournamentPredictions } from "../actions/getTournamentPredictions";
import { getRecoveryKey } from "../actions/getRecoveryKey";
import { resolveTournamentPredictionDisplay } from "../utils/resolveTournamentPredictionDisplay";
import { getMockStats, MOCK_RECOVERY_KEY } from "../data/mockProfileData";
import type { UserStats, TournamentPredictions } from "../types";

export type UseProfileDataReturn = {
  stats: UserStats;
  predictions: TournamentPredictions;
  recoveryKey: string;
  isLoading: boolean;
  error: Error | null;
};

export function useProfileData(userId: string): UseProfileDataReturn {
  const results = useQueries({
    queries: [
      {
        queryKey: ["profile", userId, "stats"],
        queryFn: () => getUserStats(userId),
        staleTime: 24 * 60 * 60 * 1000, // 24h
        gcTime: 7 * 24 * 60 * 60 * 1000, // 7 días
        retry: 1,
        enabled: !!userId,
      },
      {
        queryKey: ["profile", userId, "predictions"],
        queryFn: () => getTournamentPredictions(userId),
        staleTime: 24 * 60 * 60 * 1000, // 24h
        gcTime: 7 * 24 * 60 * 60 * 1000, // 7 días
        retry: 1,
        enabled: !!userId,
      },
      {
        queryKey: ["profile", userId, "recoveryKey"],
        queryFn: () => getRecoveryKey(),
        staleTime: Infinity, // Recovery key NUNCA cambia
        gcTime: 7 * 24 * 60 * 60 * 1000, // 7 días
        retry: 1,
        enabled: !!userId,
      },
    ],
  });

  const [statsQuery, predictionsQuery, recoveryKeyQuery] = results;

  const predictions = resolveTournamentPredictionDisplay(
    predictionsQuery.data ?? null,
  );

  const isLoading = results.some((q) => q.isLoading);

  const error = results.find((q) => q.error)?.error || null;

  const stats = statsQuery.data ?? getMockStats();
  const recoveryKey = recoveryKeyQuery.data?.recoveryKey ?? MOCK_RECOVERY_KEY;

  return {
    stats,
    predictions,
    recoveryKey,
    isLoading,
    error: error as Error | null,
  };
}
