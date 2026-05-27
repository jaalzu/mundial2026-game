"use client";

import { useQuery } from "@tanstack/react-query";
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
  const statsQuery = useQuery({
    queryKey: ["profile", userId, "stats"],
    queryFn: () => getUserStats(userId),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 48 * 60 * 60 * 1000,
    retry: 1,
    enabled: !!userId,
  });

  const predictionsQuery = useQuery({
    queryKey: ["profile", userId, "predictions"],
    queryFn: () => getTournamentPredictions(userId),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 48 * 60 * 60 * 1000,
    retry: 1,
    enabled: !!userId,
  });

  const recoveryKeyQuery = useQuery({
    queryKey: ["profile", userId, "recoveryKey"],
    queryFn: () => getRecoveryKey(),
    staleTime: Infinity,
    retry: 1,
    enabled: !!userId,
  });

  const predictions = resolveTournamentPredictionDisplay(
    predictionsQuery.data ?? null,
  );

  const isLoading = statsQuery.isLoading || predictionsQuery.isLoading;
  const error =
    statsQuery.error || predictionsQuery.error || recoveryKeyQuery.error;

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
