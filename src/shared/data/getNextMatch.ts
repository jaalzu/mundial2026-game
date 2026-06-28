import { prisma } from "@/lib/prisma";

export async function getNextMatch() {
  const match = await prisma.match.findFirst({
    where: {
      status: "SCHEDULED",
      startsAt: { not: null },
      homeTeamId: { not: null },
      awayTeamId: { not: null },
    },
    orderBy: { startsAt: "asc" },
    select: {
      group: true,
      startsAt: true,
      homeTeam: { select: { code: true } },
      awayTeam: { select: { code: true } },
    },
  });

  if (!match) return null;

  return {
    group: match.group,
    startsAt: match.startsAt!,
    homeTeam: match.homeTeam!,
    awayTeam: match.awayTeam!,
  };
}
