// features/predictions/actions/savePrediction.ts
"use server";

import { prisma } from "@/lib/prisma";

export async function savePrediction(
  userId: string,
  matchId: string,
  predictedHome: number,
  predictedAway: number,
) {
  await prisma.matchPrediction.upsert({
    where: { userId_matchId: { userId, matchId } },
    update: {
      predictedHome,
      predictedAway,
    },
    create: {
      userId,
      matchId,
      predictedHome,
      predictedAway,
    },
  });
}
