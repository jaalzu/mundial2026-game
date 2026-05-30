"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { PredictionsMap, ActionResult } from "../models/types";

export async function getUserPredictions(
  userId: string,
): Promise<ActionResult<PredictionsMap>> {
  try {
    const fetch = unstable_cache(
      async () => {
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
      },
      [`predictions-${userId}`],
      {
        revalidate: false,
        tags: [`predictions-${userId}`],
      },
    );

    const data = await fetch();
    return { success: true, data };
  } catch (err) {
    console.error("[getUserPredictions] Failed:", err);
    return { success: false, error: "No se pudieron cargar las predicciones." };
  }
}
