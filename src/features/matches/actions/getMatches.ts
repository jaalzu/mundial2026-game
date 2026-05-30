// src/features/matches/actions/getMatches.ts
"use server";

import { prisma } from "@/lib/prisma";
import type { GroupData } from "@/features/predictions/models/types";

export async function getMatches(): Promise<GroupData[]> {
  const matches = await prisma.match.findMany({
    where: { phase: "GROUP" },
    orderBy: { startsAt: "asc" },
    select: {
      id: true,
      group: true,
      phase: true,
      status: true,
      startsAt: true,
      scoreHome: true,
      scoreAway: true,
      homeTeam: {
        select: { id: true, name: true, code: true, flagUrl: true },
      },
      awayTeam: {
        select: { id: true, name: true, code: true, flagUrl: true },
      },
    },
  });

  // Agrupar por grupo
  const groupMap = new Map<string, GroupData>();

  for (const match of matches) {
    const groupValue = match.group as string | null;
    if (!groupValue) continue;

    const group = groupValue.replace("Group", "").trim();
    if (!group) continue;

    if (!groupMap.has(group)) {
      groupMap.set(group, { group, matches: [] });
    }

    groupMap.get(group)!.matches.push({
      id: match.id,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      phase: match.phase,
      status: match.status,
      startsAt: match.startsAt.toISOString(),
      group,
      scoreHome: match.scoreHome ?? undefined,
      scoreAway: match.scoreAway ?? undefined,
    });
  }

  // Ordenar grupos A-L
  return Array.from(groupMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, data]) => data);
}
