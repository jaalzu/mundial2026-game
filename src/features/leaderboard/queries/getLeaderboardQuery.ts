// src/features/leaderboard/queries/getLeaderboardQuery.ts
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { LeaderboardEntry } from "../actions/getLeaderboard";

export const getCachedLeaderboard = unstable_cache(
  async (): Promise<LeaderboardEntry[]> => {
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
  },
  ["leaderboard"],
  { revalidate: 3600 },
);
