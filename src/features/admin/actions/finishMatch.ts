"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { scoreMatchPrediction } from "@/server/scoring/scoreMatch";
import { rebuildLeaderboard } from "@/server/leaderboard/rebuildLeaderboard";
import type { ActionResult } from "@/features/predictions/models/types";

interface FinishMatchInput {
  matchId: string;
  scoreHome: number;
  scoreAway: number;
  winnerTeamId?: string | null;
}

/**
 * Called from the admin panel when a match ends.
 *
 * Steps (all in one transaction):
 * 1. Update match: status → FINISHED, scores, winnerTeamId
 * 2. Score all predictions for this match
 *
 * Then outside the transaction:
 * 3. Rebuild leaderboard
 * 4. Revalidate cache
 */
export async function finishMatch({
  matchId,
  scoreHome,
  scoreAway,
  winnerTeamId,
}: FinishMatchInput): Promise<ActionResult> {
  try {
    // Fetch all predictions for this match
    const predictions = await prisma.matchPrediction.findMany({
      where: { matchId },
      select: {
        id: true,
        userId: true,
        predictedHome: true,
        predictedAway: true,
      },
    });

    // Calculate scores for each prediction
    const scored = predictions.map((p) => ({
      id: p.id,
      ...scoreMatchPrediction({
        predictedHome: p.predictedHome,
        predictedAway: p.predictedAway,
        actualHome: scoreHome,
        actualAway: scoreAway,
      }),
    }));

    console.log(
      "[finishMatch] scored predictions:",
      JSON.stringify(scored, null, 2),
    );

    // Transaction: update match + all predictions atomically
    await prisma.$transaction([
      // 1. Mark match as finished
      prisma.match.update({
        where: { id: matchId },
        data: {
          status: "FINISHED",
          scoreHome,
          scoreAway,
          winnerTeamId: winnerTeamId ?? null,
        },
      }),
      // 2. Update each prediction with points
      ...scored.map((s) =>
        prisma.matchPrediction.update({
          where: { id: s.id },
          data: {
            points: s.points,
            exactHit: s.exactHit,
            result: s.result,
          },
        }),
      ),
    ]);

    // 3. Rebuild leaderboard outside transaction (heavy operation)
    await rebuildLeaderboard();

    // 4. Invalidate caches
    revalidatePath("/predictions");
    revalidatePath("/leaderboard");
    revalidatePath("/profile");

    return { success: true, data: undefined };
  } catch (err) {
    console.error("[finishMatch] Failed:", {
      matchId,
      scoreHome,
      scoreAway,
      err,
    });
    return { success: false, error: "No se pudo finalizar el partido." };
  }
}
