"use server";

import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/features/auth/utils/getAuthenticatedUser";

export async function getUserStats(userId: string) {
  // Validar que el usuario autenticado sea el mismo
  const user = await getAuthenticatedUser();
  if (!user || user.id !== userId) {
    throw new Error("Unauthorized");
  }

  const leaderboardEntry = await prisma.leaderboardDaily.findFirst({
    where: { userId },
    orderBy: { calculatedAt: "desc" },
  });

  if (!leaderboardEntry) {
    return {
      position: null,
      totalPlayers: 0,
      totalPoints: 0,
      exactPredictions: 0,
      rankDelta: 0,
    };
  }

  const totalPlayersResult = await prisma.leaderboardDaily.groupBy({
    by: ["userId"],
    where: { calculatedAt: leaderboardEntry.calculatedAt },
  });

  return {
    position: leaderboardEntry.rank,
    totalPlayers: totalPlayersResult.length,
    totalPoints: leaderboardEntry.totalPoints,
    exactPredictions: leaderboardEntry.exactHits,
    rankDelta: leaderboardEntry.rankDelta,
  };
}
