"use server";

import { prisma } from "@/lib/prisma";
import type { TournamentPredictionData, ActionResult } from "../models/types";

export async function getTournamentPrediction(
  userId: string,
): Promise<ActionResult<TournamentPredictionData | null>> {
  try {
    const row = await prisma.tournamentPrediction.findUnique({
      where: { userId },
      select: {
        championTeamId: true,
        runnerUpTeamId: true,

        surpriseTeamId: true,
        disappointmentTeamId: true,
        mvpPlayerId: true,
        goldenBootPlayerId: true,
        bestGoalkeeperPlayerId: true,
        revelationPlayerId: true,
      },
    });

    return { success: true, data: row };
  } catch (err) {
    console.error("[getTournamentPrediction] Failed:", err);
    return {
      success: false,
      error: "No se pudieron cargar las predicciones del torneo.",
    };
  }
}
