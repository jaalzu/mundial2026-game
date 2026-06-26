// "use server";

// import { revalidatePath } from "next/cache";
// import { prisma } from "@/lib/prisma";
// import { scoreKnockoutPrediction } from "@/server/scoring/scoreKnockoutPrediction";
// import { rebuildLeaderboard } from "@/server/leaderboard/rebuildLeaderboard";
// import type { ActionResult } from "@/features/predictions/models/types";

// interface FinishKnockoutMatchInput {
//   matchId: string;
//   scoreHome: number;
//   scoreAway: number;
//   winnerTeamId: string;
// }

// export async function finishKnockoutMatch({
//   matchId,
//   scoreHome,
//   scoreAway,
//   winnerTeamId,
// }: FinishKnockoutMatchInput): Promise<ActionResult> {
//   try {
//     const match = await prisma.match.findUniqueOrThrow({
//       where: { id: matchId },
//       select: { homeTeamId: true, awayTeamId: true },
//     });

//     if (!match.homeTeamId || !match.awayTeamId) {
//       return {
//         success: false,
//         error: "El partido todavía no tiene ambos equipos asignados.",
//       };
//     }

//     const predictions = await prisma.matchPrediction.findMany({
//       where: { matchId },
//       select: {
//         id: true,
//         predictedHome: true,
//         predictedAway: true,
//         predictedPenaltyWinnerId: true,
//       },
//     });

//     const scored = predictions.map((p) => ({
//       id: p.id,
//       ...scoreKnockoutPrediction({
//         predictedHome: p.predictedHome,
//         predictedAway: p.predictedAway,
//         predictedPenaltyWinnerId: p.predictedPenaltyWinnerId ?? null,
//         actualHome: scoreHome,
//         actualAway: scoreAway,
//         actualWinnerTeamId: winnerTeamId,
//         homeTeamId: match.homeTeamId,
//         awayTeamId: match.awayTeamId,
//       }),
//     }));

//     await prisma.$transaction([
//       prisma.match.update({
//         where: { id: matchId },
//         data: { status: "FINISHED", scoreHome, scoreAway, winnerTeamId },
//       }),
//       ...scored.map((s) =>
//         prisma.matchPrediction.update({
//           where: { id: s.id },
//           data: { points: s.points, exactHit: s.exactHit, result: s.result },
//         }),
//       ),
//     ]);

//     await rebuildLeaderboard();
//     revalidatePath("/", "layout");

//     return { success: true, data: undefined };
//   } catch (err) {
//     console.error("[finishKnockoutMatch] Failed:", { matchId, err });
//     return { success: false, error: "No se pudo finalizar el partido." };
//   }
// }
