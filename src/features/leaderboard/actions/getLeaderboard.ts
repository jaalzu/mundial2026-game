// src/features/leaderboard/actions/getLeaderboard.ts
"use server";

import { prisma } from "@/lib/prisma";

export type LeaderboardEntry = {
  rank: number;
  userId: string;
  username: string;
  avatarPlayerId: string | null;
  totalPoints: number;
  rankDelta: number;
};
// getLeaderboard.ts - sin auth adentro, el layout ya lo garantiza
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, avatarPlayerId: true },
    orderBy: { id: "asc" },
  });

  return users.map((user, index) => ({
    rank: index + 1,
    userId: user.id,
    username: user.name,
    avatarPlayerId: user.avatarPlayerId,
    totalPoints: 0,
    rankDelta: 0,
  }));
}
