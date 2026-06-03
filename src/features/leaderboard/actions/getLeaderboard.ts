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

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const rows = await prisma.leaderboardDaily.findMany({
    orderBy: { rank: "asc" },
    distinct: ["userId"],
    select: {
      userId: true,
      rank: true,
      totalPoints: true,
      rankDelta: true,
      user: {
        select: { name: true, avatarPlayerId: true },
      },
    },
  });

  if (rows.length === 0) {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, avatarPlayerId: true },
      orderBy: { name: "asc" },
    });
    return users.map((user, i) => ({
      rank: i + 1,
      userId: user.id,
      username: user.name,
      avatarPlayerId: user.avatarPlayerId,
      totalPoints: 0,
      rankDelta: 0,
    }));
  }

  console.log("[leaderboard] rows:", rows.length);

  return rows.map((row) => ({
    rank: row.rank,
    userId: row.userId,
    username: row.user.name,
    avatarPlayerId: row.user.avatarPlayerId,
    totalPoints: row.totalPoints,
    rankDelta: row.rankDelta,
  }));
}
