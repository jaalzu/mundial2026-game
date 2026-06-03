"use server";

import { prisma } from "@/lib/prisma";
import type { PlayerOption } from "@/features/predictions/models/types";

export async function getPlayers(): Promise<PlayerOption[]> {
  const players = await prisma.player.findMany({
    select: {
      id: true,
      name: true,
      photoUrl: true,
      position: true,
      team: {
        select: { id: true, name: true, code: true, flagUrl: true },
      },
    },
    orderBy: { name: "asc" },
  });

  return players;
}
