export type UserScoreRow = {
  userId: string;
  name: string;
  matchPoints: number;
  tournamentPoints: number;
  exactHits: number;
  previousRank?: number | null;
};

export type LeaderboardEntry = {
  userId: string;
  name: string;
  totalPoints: number;
  exactHits: number;
  rank: number;
  previousRank: number | null;
  rankDelta: number;
};

export function calculateLeaderboard(rows: UserScoreRow[]): LeaderboardEntry[] {
  return rows
    .map((row) => ({
      userId: row.userId,
      name: row.name,
      totalPoints: row.matchPoints + row.tournamentPoints,
      exactHits: row.exactHits,
      previousRank: row.previousRank ?? null
    }))
    .sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }

      if (b.exactHits !== a.exactHits) {
        return b.exactHits - a.exactHits;
      }

      return a.name.localeCompare(b.name);
    })
    .map((entry, index) => {
      const rank = index + 1;

      return {
        ...entry,
        rank,
        rankDelta: entry.previousRank ? entry.previousRank - rank : 0
      };
    });
}
