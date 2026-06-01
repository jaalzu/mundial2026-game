"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { PredictionsMap, ActionResult } from "../models/types";

async function fetchUserPredictions(userId: string): Promise<PredictionsMap> {
  const rows = await prisma.matchPrediction.findMany({
    where: { userId },
    select: { matchId: true, predictedHome: true, predictedAway: true },
  });

  const map: PredictionsMap = {};
  for (const row of rows) {
    map[row.matchId] = {
      matchId: row.matchId,
      predictedHome: row.predictedHome,
      predictedAway: row.predictedAway,
    };
  }
  return map;
}

export async function getUserPredictions(
  userId: string,
): Promise<ActionResult<PredictionsMap>> {
  try {
    const cached = unstable_cache(
      () => fetchUserPredictions(userId),
      [`predictions-${userId}`],
      { revalidate: false, tags: [`predictions-${userId}`] },
    );
    const data = await cached();
    return { success: true, data };
  } catch (err) {
    console.error("[getUserPredictions] Failed:", err);
    return { success: false, error: "No se pudieron cargar las predicciones." };
  }
}
