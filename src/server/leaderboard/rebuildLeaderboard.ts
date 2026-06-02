import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function rebuildLeaderboard(): Promise<void> {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const [
    matchPoints,
    exactHitCounts,
    tournamentPredictions,
    previousRanks,
    allUsers,
  ] = await Promise.all([
    prisma.matchPrediction.groupBy({
      by: ["userId"],
      _sum: { points: true },
    }),
    prisma.matchPrediction.groupBy({
      by: ["userId"],
      where: { exactHit: true },
      _count: { id: true },
    }),
    prisma.tournamentPrediction.findMany({
      select: { userId: true, points: true },
    }),
    prisma.leaderboardDaily.findMany({
      select: { userId: true, rank: true },
      orderBy: { calculatedAt: "desc" },
      distinct: ["userId"],
    }),
    prisma.user.findMany({
      select: { id: true },
    }),
  ]);

  const tournamentMap = new Map(
    tournamentPredictions.map((t) => [t.userId, t.points]),
  );
  const exactHitsMap = new Map(
    exactHitCounts.map((e) => [e.userId, e._count.id]),
  );
  const previousRankMap = new Map(previousRanks.map((r) => [r.userId, r.rank]));

  const userScores = matchPoints.map((agg) => ({
    userId: agg.userId,
    totalPoints: (agg._sum.points ?? 0) + (tournamentMap.get(agg.userId) ?? 0),
    exactHits: exactHitsMap.get(agg.userId) ?? 0,
  }));

  // Usuarios con solo tournament predictions
  for (const tp of tournamentPredictions) {
    if (!userScores.find((u) => u.userId === tp.userId)) {
      userScores.push({
        userId: tp.userId,
        totalPoints: tp.points,
        exactHits: 0,
      });
    }
  }

  // Usuarios sin ninguna predicción
  for (const user of allUsers) {
    if (!userScores.find((u) => u.userId === user.id)) {
      userScores.push({
        userId: user.id,
        totalPoints: 0,
        exactHits: 0,
      });
    }
  }

  userScores.sort((a, b) =>
    b.totalPoints !== a.totalPoints
      ? b.totalPoints - a.totalPoints
      : b.exactHits - a.exactHits,
  );

  const upserts = userScores.map((user, i) => {
    const rank = i + 1;
    const previousRank = previousRankMap.get(user.userId) ?? rank;
    const rankDelta = previousRank - rank;

    return prisma.leaderboardDaily.upsert({
      where: {
        userId_calculatedAt: { userId: user.userId, calculatedAt: now },
      },
      update: {
        totalPoints: user.totalPoints,
        exactHits: user.exactHits,
        rank,
        previousRank,
        rankDelta,
      },
      create: {
        userId: user.userId,
        totalPoints: user.totalPoints,
        exactHits: user.exactHits,
        rank,
        previousRank,
        rankDelta,
        calculatedAt: now,
      },
    });
  });

  console.log("[rebuild] total userScores a upsertear:", userScores.length);
  console.log("[rebuild] userScores:", JSON.stringify(userScores, null, 2));

  await prisma.$transaction(upserts);
  revalidatePath("/leaderboard");
  revalidatePath("/profile");
}
