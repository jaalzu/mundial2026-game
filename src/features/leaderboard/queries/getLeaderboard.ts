import { prisma } from "@/lib/prisma";

export async function getLeaderboard() {
  // 🔴 TEMPORAL: Esto calcula en tiempo real desde users
  // 🔴 CUANDO TENGAS SCORING: Reemplazá con query a leaderboard_daily

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      avatarPlayerId: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc", // 🔴 TEMPORAL: Ordenar por fecha de registro
    },
  });

  // 🔴 TEMPORAL: Mapear a formato de leaderboard con datos fake
  const leaderboard = users.map((user, index) => ({
    rank: index + 1,
    userId: user.id,
    username: user.name,
    avatarPlayerId: user.avatarPlayerId,
    totalPoints: 0, // 🔴 TODO: Calcular desde predictions cuando existan
    rankDelta: 0, // 🔴 TODO: Calcular diferencia con snapshot anterior
  }));

  return leaderboard;
}

// 🔴🔴🔴 CUANDO IMPLEMENTES SCORING, REEMPLAZÁ TODO ARRIBA CON ESTO:
//
// export async function getLeaderboard() {
//   const leaderboard = await prisma.leaderboardDaily.findMany({
//     where: {
//       calculatedAt: {
//         gte: new Date(new Date().setHours(0, 0, 0, 0)), // Hoy
//       },
//     },
//     include: {
//       user: {
//         select: {
//           name: true,
//           avatarPlayerId: true,
//         },
//       },
//     },
//     orderBy: {
//       rank: "asc",
//     },
//   });
//
//   return leaderboard.map((entry) => ({
//     rank: entry.rank,
//     userId: entry.userId,
//     username: entry.user.name,
//     avatarPlayerId: entry.user.avatarPlayerId,
//     totalPoints: entry.totalPoints,
//     rankDelta: entry.rankDelta,
//   }));
// }
