import { prisma } from "@/lib/prisma";

/**
 * Rebuilds the leaderboard snapshot for all users.
 * Called after any match is finished or tournament results are updated.
 *
 * Algorithm:
 * 1. Sum all MatchPrediction.points + TournamentPrediction.points per user
 * 2. Rank by totalPoints DESC, exactHits DESC as tiebreaker
 * 3. Compare with previous rank to compute rankDelta
 * 4. Upsert LeaderboardDaily rows
 */
export async function rebuildLeaderboard(): Promise<void> {
  const now = new Date();

  // 1. Aggregate points per user
  const [matchAggregates, tournamentPredictions, previousRanks] =
    await Promise.all([
      prisma.matchPrediction.groupBy({
        by: ["userId"],
        _sum: { points: true },
        _count: { exactHit: true },
      }),
      prisma.tournamentPrediction.findMany({
        select: { userId: true, points: true },
      }),
      prisma.leaderboardDaily.findMany({
        select: { userId: true, rank: true },
        orderBy: { calculatedAt: "desc" },
        distinct: ["userId"],
      }),
    ]);

  // Build lookup maps
  const tournamentMap = new Map(
    tournamentPredictions.map((t) => [t.userId, t.points]),
  );
  const previousRankMap = new Map(previousRanks.map((r) => [r.userId, r.rank]));

  // 2. Merge match + tournament points per user
  const userScores = matchAggregates.map((agg) => ({
    userId: agg.userId,
    totalPoints: (agg._sum.points ?? 0) + (tournamentMap.get(agg.userId) ?? 0),
    exactHits: agg._count.exactHit,
  }));

  // Include users with only tournament predictions (no match predictions yet)
  for (const tp of tournamentPredictions) {
    if (!userScores.find((u) => u.userId === tp.userId)) {
      userScores.push({
        userId: tp.userId,
        totalPoints: tp.points,
        exactHits: 0,
      });
    }
  }

  // 3. Sort and assign ranks
  userScores.sort((a, b) =>
    b.totalPoints !== a.totalPoints
      ? b.totalPoints - a.totalPoints
      : b.exactHits - a.exactHits,
  );

  // 4. Upsert leaderboard rows
  const upserts = userScores.map((user, i) => {
    const rank = i + 1;
    const previousRank = previousRankMap.get(user.userId) ?? rank;
    const rankDelta = previousRank - rank; // positive = moved up

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

  await prisma.$transaction(upserts);
}
