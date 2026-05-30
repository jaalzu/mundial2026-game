"use server";

import { revalidatePath } from "next/cache";
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

    revalidatePath("/predictions");
    return { success: true, data: undefined };
  } catch (err) {
    console.error("[savePrediction] Failed:", err);
    return { success: false, error: "No se pudo guardar la predicción." };
  }
}
