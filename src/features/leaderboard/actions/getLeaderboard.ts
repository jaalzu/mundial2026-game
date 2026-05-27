"use server";

import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/features/auth/utils/getAuthenticatedUser";

export type LeaderboardEntry = {
  rank: number;
  userId: string;
  username: string;
  avatarPlayerId: string | null;
  totalPoints: number;
  rankDelta: number;
};

/**
 * Obtiene el leaderboard actual desde leaderboard_daily.
 * Cuando tengas scoring, esto ya va a estar poblado por Vercel Crons.
 *
 * Por ahora retorna datos temporales desde users.
 */
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  // Validar que el usuario esté autenticado (seguridad)
  const user = await getAuthenticatedUser();
  if (!user) throw new Error("Unauthorized");

  // TODO: Cuando tengas leaderboard_daily poblado por scoring:
  // const leaderboard = await prisma.leaderboardDaily.findMany({
  //   where: { calculatedAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
  //   include: { user: { select: { name: true, avatarPlayerId: true } } },
  //   orderBy: { rank: "asc" },
  // });
  // return leaderboard.map(...);

  // TEMPORAL: Datos fake desde users
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      avatarPlayerId: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
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
