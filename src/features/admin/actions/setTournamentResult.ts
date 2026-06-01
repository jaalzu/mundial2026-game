"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { scoreTournamentPrediction } from "@/server/scoring/scoreTournament";
import { rebuildLeaderboard } from "@/server/leaderboard/rebuildLeaderboard";
import type { ActionResult } from "@/features/predictions/models/types";

type TournamentResultInput = {
  championTeamId?: string | null;
  runnerUpTeamId?: string | null;
  surpriseTeamId?: string | null;
  disappointmentTeamId?: string | null;
  mvpPlayerId?: string | null;
  goldenBootPlayerId?: string | null;
  bestGoalkeeperPlayerId?: string | null;
  revelationPlayerId?: string | null;
};

/**
 * Called from admin when setting official tournament results.
 * Can be called multiple times as results come in — idempotent via upsert.
 *
 * Steps:
 * 1. Upsert TournamentResult
 * 2. Score all TournamentPredictions against the new result
 * 3. Rebuild leaderboard
 */
export async function setTournamentResult(
  input: TournamentResultInput,
): Promise<ActionResult> {
  try {
    // 1. Upsert the official result (only one row ever exists)
    const result = await prisma.tournamentResult.upsert({
      where: { id: await getOrCreateResultId() },
      update: input,
      create: input,
    });

    // 2. Score all user tournament predictions
    const predictions = await prisma.tournamentPrediction.findMany({
      select: {
        userId: true,
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

    const updates = predictions.map((p) => {
      const points = scoreTournamentPrediction(p, result);
      return prisma.tournamentPrediction.update({
        where: { userId: p.userId },
        data: { points },
      });
    });

    await prisma.$transaction(updates);

    // 3. Rebuild leaderboard
    await rebuildLeaderboard();

    revalidatePath("/leaderboard");
    revalidatePath("/profile");

    return { success: true, data: undefined };
  } catch (err) {
    console.error("[setTournamentResult] Failed:", { input, err });
    return {
      success: false,
      error: "No se pudo guardar el resultado del torneo.",
    };
  }
}

/**
 * TournamentResult is a singleton — one row for the whole tournament.
 * Returns existing id or creates empty row.
 */
async function getOrCreateResultId(): Promise<string> {
  const existing = await prisma.tournamentResult.findFirst({
    select: { id: true },
  });
  if (existing) return existing.id;

  const created = await prisma.tournamentResult.create({
    data: {},
    select: { id: true },
  });
  return created.id;
}
