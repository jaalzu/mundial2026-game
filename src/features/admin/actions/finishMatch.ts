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

export async function finishMatch({
  matchId,
  scoreHome,
  scoreAway,
  winnerTeamId,
}: FinishMatchInput): Promise<ActionResult> {
  try {
    const predictions = await prisma.matchPrediction.findMany({
      where: { matchId },
      select: {
        id: true,
        userId: true,
        predictedHome: true,
        predictedAway: true,
      },
    });

    const scored = predictions.map((p) => ({
      id: p.id,
      ...scoreMatchPrediction({
        predictedHome: p.predictedHome,
        predictedAway: p.predictedAway,
        actualHome: scoreHome,
        actualAway: scoreAway,
      }),
    }));

    console.log("[finishMatch] input:", { scoreHome, scoreAway });
    console.log(
      "[finishMatch] predictions a scorear:",
      predictions.map((p) => ({
        userId: p.userId,
        predictedHome: p.predictedHome,
        predictedAway: p.predictedAway,
        types: {
          predictedHome: typeof p.predictedHome,
          predictedAway: typeof p.predictedAway,
          scoreHome: typeof scoreHome,
          scoreAway: typeof scoreAway,
        },
      })),
    );
    console.log("[finishMatch] scored:", JSON.stringify(scored, null, 2));

    await prisma.$transaction([
      prisma.match.update({
        where: { id: matchId },
        data: {
          status: "FINISHED",
          scoreHome,
          scoreAway,
          winnerTeamId: winnerTeamId ?? null,
        },
      }),
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

    await rebuildLeaderboard();

    revalidatePath("/", "layout");

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
