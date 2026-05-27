"use server";

import { prisma } from "@/lib/prisma";

export async function getProfileData(userId: string) {
  const [leaderboardEntry, prediction, totalPlayers] = await Promise.all([
    prisma.leaderboardDaily.findFirst({
      where: { userId },
      orderBy: { calculatedAt: "desc" },
      select: {
        rank: true,
        totalPoints: true,
        exactHits: true,
        rankDelta: true,
        calculatedAt: true,
      },
    }),
    prisma.tournamentPrediction.findUnique({
      where: { userId },
      include: {
        championTeam: { select: { name: true } },
        runnerUpTeam: { select: { name: true } },
        finalHomeTeam: { select: { name: true } },
        finalAwayTeam: { select: { name: true } },
        surpriseTeam: { select: { name: true } },
        disappointmentTeam: { select: { name: true } },
        mvpPlayer: { select: { name: true } },
        goldenBootPlayer: { select: { name: true } },
        bestGoalkeeperPlayer: { select: { name: true } },
        revelationPlayer: { select: { name: true } },
      },
    }),

    prisma.user.count(),
  ]);

  const stats = leaderboardEntry
    ? {
        position: leaderboardEntry.rank,
        totalPlayers,
        totalPoints: leaderboardEntry.totalPoints,
        exactPredictions: leaderboardEntry.exactHits,
        rankDelta: leaderboardEntry.rankDelta,
      }
    : {
        position: null,
        totalPlayers,
        totalPoints: 0,
        exactPredictions: 0,
        rankDelta: 0,
      };

  return { stats, prediction };
}
