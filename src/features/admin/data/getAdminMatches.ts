"use server";

import { prisma } from "@/lib/prisma";

export interface AdminMatch {
  id: string;
  group: string;
  startsAt: string;
  status: "SCHEDULED" | "FINISHED";
  scoreHome: number | null;
  scoreAway: number | null;
  homeTeam: { id: string; name: string; code: string };
  awayTeam: { id: string; name: string; code: string };
}

export interface AdminGroupData {
  group: string;
  matches: AdminMatch[];
}

export async function getAdminMatches(): Promise<AdminGroupData[]> {
  const matches = await prisma.match.findMany({
    where: { phase: "GROUP" },
    orderBy: { startsAt: "asc" },
    select: {
      id: true,
      group: true,
      status: true,
      startsAt: true,
      scoreHome: true,
      scoreAway: true,
      homeTeam: { select: { id: true, name: true, code: true } },
      awayTeam: { select: { id: true, name: true, code: true } },
    },
  });

  const groupMap = new Map<string, AdminGroupData>();

  for (const match of matches) {
    const groupValue = match.group as string | null;
    if (!groupValue) continue;
    const group = groupValue.replace("Group", "").trim();
    if (!group) continue;

    if (!groupMap.has(group)) groupMap.set(group, { group, matches: [] });

    groupMap.get(group)!.matches.push({
      id: match.id,
      group,
      status: match.status,
      startsAt: match.startsAt.toISOString(),
      scoreHome: match.scoreHome,
      scoreAway: match.scoreAway,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
    });
  }

  return Array.from(groupMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, data]) => data);
}
