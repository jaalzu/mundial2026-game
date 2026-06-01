// src/features/leaderboard/actions/getLeaderboard.ts
"use server";

import { getCachedLeaderboard } from "../queries/getLeaderboardQuery";

export type LeaderboardEntry = {
  rank: number;
  userId: string;
  username: string;
  avatarPlayerId: string | null;
  totalPoints: number;
  rankDelta: number;
};

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  return getCachedLeaderboard();
}
