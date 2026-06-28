"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { KnockoutPredictionsMap, ActionResult } from "../models/types";

async function fetchUserKnockoutPredictions(
  userId: string,
): Promise<KnockoutPredictionsMap> {
  const rows = await prisma.matchPrediction.findMany({
    where: { userId, match: { phase: { not: "GROUP" } } },
    select: {
      matchId: true,
      predictedHome: true,
      predictedAway: true,
      predictedPenaltyWinnerId: true,
    },
  });

  const map: KnockoutPredictionsMap = {};
  for (const row of rows) {
    map[row.matchId] = {
      matchId: row.matchId,
      predictedHome: row.predictedHome,
      predictedAway: row.predictedAway,
      predictedPenaltyWinnerId: row.predictedPenaltyWinnerId,
    };
  }
  return map;
}

export async function getUserKnockoutPredictions(
  userId: string,
): Promise<ActionResult<KnockoutPredictionsMap>> {
  try {
    const cached = unstable_cache(
      () => fetchUserKnockoutPredictions(userId),
      [`knockout-predictions-${userId}`],
      { revalidate: false, tags: [`knockout-predictions-${userId}`] },
    );
    const data = await cached();
    return { success: true, data };
  } catch (err) {
    console.error("[getUserKnockoutPredictions] Failed:", err);
    return { success: false, error: "No se pudieron cargar las predicciones." };
  }
}
