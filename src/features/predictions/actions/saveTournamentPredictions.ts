"use server";

import { prisma } from "@/lib/prisma";
import type { TournamentPredictionField, ActionResult } from "../models/types";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/profile");
    return { success: true, data: undefined };
  } catch (err) {
    console.error("[saveTournamentPrediction] Failed:", { field, value, err });
    return {
      success: false,
      error: "No se pudo guardar la predicción. Intenta de nuevo.",
    };
  }
}
