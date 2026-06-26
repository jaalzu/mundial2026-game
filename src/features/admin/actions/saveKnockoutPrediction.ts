// "use server";

// import { revalidatePath } from "next/cache";
// import { prisma } from "@/lib/prisma";
// import type { ActionResult } from "../models/types";

// export async function saveKnockoutPrediction(
//   userId: string,
//   matchId: string,
//   predictedHome: number,
//   predictedAway: number,
//   predictedPenaltyWinnerId: string | null,
// ): Promise<ActionResult> {
//   try {
//     await prisma.matchPrediction.upsert({
//       where: { userId_matchId: { userId, matchId } },
//       update: { predictedHome, predictedAway, predictedPenaltyWinnerId },
//       create: {
//         userId,
//         matchId,
//         predictedHome,
//         predictedAway,
//         predictedPenaltyWinnerId,
//       },
//     });

//     revalidatePath("/predictions");
//     return { success: true, data: undefined };
//   } catch (err) {
//     console.error("[saveKnockoutPrediction] Failed:", err);
//     return { success: false, error: "No se pudo guardar la predicción." };
//   }
// }
