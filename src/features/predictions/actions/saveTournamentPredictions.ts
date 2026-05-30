"use server";

import { prisma } from "@/lib/prisma";
import type { TournamentPredictionField, ActionResult } from "../models/types";
import { revalidatePath } from "next/cache";

/**
 * Saves a single tournament prediction field via upsert.
 * Called on every card selection — one field at a time.
 */
export async function saveTournamentPrediction(
  userId: string,
  field: TournamentPredictionField,
  value: string | null,
): Promise<ActionResult> {
  try {
    await prisma.tournamentPrediction.upsert({
      where: { userId },
      update: { [field]: value },
      create: { userId, [field]: value },
    });

    revalidatePath("/predictions");

    return { success: true, data: undefined };
  } catch (err) {
    console.error("[saveTournamentPrediction] Failed:", { field, value, err });
    return {
      success: false,
      error: "No se pudo guardar la predicción. Intenta de nuevo.",
    };
  }
}
