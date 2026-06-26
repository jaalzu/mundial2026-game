// "use server";

// import { revalidatePath } from "next/cache";
// import { prisma } from "@/lib/prisma";
// import type { ActionResult } from "@/features/predictions/models/types";

// interface AssignKnockoutTeamsInput {
//   matchId: string;
//   homeTeamId: string;
//   awayTeamId: string;
//   startsAt: string | null;
// }

// export async function assignKnockoutTeams({
//   matchId,
//   homeTeamId,
//   awayTeamId,
//   startsAt,
// }: AssignKnockoutTeamsInput): Promise<ActionResult> {
//   try {
//     if (homeTeamId === awayTeamId) {
//       return { success: false, error: "Los equipos no pueden ser iguales." };
//     }

//     await prisma.match.update({
//       where: { id: matchId },
//       data: {
//         homeTeamId,
//         awayTeamId,
//         startsAt: startsAt ? new Date(startsAt) : null,
//       },
//     });

//     revalidatePath("/admin");
//     revalidatePath("/predictions");
//     return { success: true, data: undefined };
//   } catch (err) {
//     console.error("[assignKnockoutTeams] Failed:", { matchId, err });
//     return { success: false, error: "No se pudo asignar el cruce." };
//   }
// }
