"use server";

import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/features/auth/utils/getAuthenticatedUser";

export async function getTournamentPredictions(userId: string) {
  // Validar que el usuario autenticado sea el mismo
  const user = await getAuthenticatedUser();
  if (!user || user.id !== userId) {
    throw new Error("Unauthorized");
  }

  const prediction = await prisma.tournamentPrediction.findUnique({
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
  });

  return prediction;
}
