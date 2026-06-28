"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { KnockoutMatch } from "@/features/predictions/models/types";

const fetchKnockoutMatches = unstable_cache(
  async (): Promise<KnockoutMatch[]> => {
    const matches = await prisma.match.findMany({
      where: { phase: { not: "GROUP" } },
      orderBy: { startsAt: "asc" },
      select: {
        id: true,
        phase: true,
        bracket: true,
        status: true,
        startsAt: true,
        scoreHome: true,
        scoreAway: true,
        winnerTeamId: true,
        homeTeam: {
          select: { id: true, name: true, code: true, flagUrl: true },
        },
        awayTeam: {
          select: { id: true, name: true, code: true, flagUrl: true },
        },
      },
    });

    return matches.map((m) => ({
      id: m.id,
      phase: m.phase as KnockoutMatch["phase"],
      bracket: m.bracket as KnockoutMatch["bracket"],
      homeTeam: m.homeTeam,
      awayTeam: m.awayTeam,
      startsAt: m.startsAt ? m.startsAt.toISOString() : null,
      status: m.status,
      scoreHome: m.scoreHome ?? undefined,
      scoreAway: m.scoreAway ?? undefined,
      winnerTeamId: m.winnerTeamId,
    }));
  },
  ["knockout-matches"],
  { revalidate: false, tags: ["knockout-matches"] },
);

export async function getKnockoutMatches(): Promise<KnockoutMatch[]> {
  return fetchKnockoutMatches();
}
