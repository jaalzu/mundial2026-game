"use server";

import { prisma } from "@/lib/prisma";
import type { PredictionsMap, ActionResult } from "../models/types";

/**
 * Fetches all existing predictions for a user and returns them as a
 * PredictionsMap (keyed by matchId) for O(1) lookup when hydrating forms.
 */
export async function getUserPredictions(
  userId: string,
): Promise<ActionResult<PredictionsMap>> {
  try {
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

    return { success: true, data: map };
  } catch (err) {
    console.error("[getUserPredictions] Failed to load predictions:", err);
    return {
      success: false,
      error: "No se pudieron cargar las predicciones.",
    };
  }
}
