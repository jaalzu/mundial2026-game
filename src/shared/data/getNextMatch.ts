import { prisma } from "@/lib/prisma";

export async function getNextMatch() {
  return prisma.match.findFirst({
    where: { status: "SCHEDULED" },
    orderBy: { startsAt: "asc" },
    select: {
      group: true,
      startsAt: true,
      homeTeam: { select: { code: true } },
      awayTeam: { select: { code: true } },
    },
  });
}
