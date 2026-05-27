// getProfileData.ts
"use server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/features/auth/utils/getAuthenticatedUser";

export async function getProfileData(userId: string) {
  const user = await getAuthenticatedUser(); // 1 sola auth call
  if (!user || user.id !== userId) throw new Error("Unauthorized");

  // Todo en paralelo, 1 sola auth
  const [leaderboardEntry, prediction] = await Promise.all([
    prisma.leaderboardDaily.findFirst({
      where: { userId },
      orderBy: { calculatedAt: "desc" },
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
  ]);

  const stats = leaderboardEntry
    ? await prisma.leaderboardDaily
        .groupBy({
          by: ["userId"],
          where: { calculatedAt: leaderboardEntry.calculatedAt },
        })
        .then((r) => ({
          position: leaderboardEntry.rank,
          totalPlayers: r.length,
          totalPoints: leaderboardEntry.totalPoints,
          exactPredictions: leaderboardEntry.exactHits,
          rankDelta: leaderboardEntry.rankDelta,
        }))
    : {
        position: null,
        totalPlayers: 0,
        totalPoints: 0,
        exactPredictions: 0,
        rankDelta: 0,
      };

  return { stats, prediction };
}
