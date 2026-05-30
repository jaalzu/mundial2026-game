"use server";

import { prisma } from "@/lib/prisma";
import type { ActionResult } from "../models/types";

export async function savePrediction(
  userId: string,
  matchId: string,
  predictedHome: number,
  predictedAway: number,
): Promise<ActionResult> {
  try {
    await prisma.matchPrediction.upsert({
      where: { userId_matchId: { userId, matchId } },
      update: { predictedHome, predictedAway },
      create: { userId, matchId, predictedHome, predictedAway },
    });
    return { success: true, data: undefined };
  } catch (err) {
    console.error("[savePrediction] Failed to save prediction:", err);
    return {
      success: false,
      error: "No se pudo guardar la predicción. Intenta de nuevo.",
    };
  }
}
