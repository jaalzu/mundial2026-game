"use server";

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { PlayerOption } from "@/features/predictions/models/types";

const fetchPlayers = unstable_cache(
  async (): Promise<PlayerOption[]> => {
    return prisma.player.findMany({
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
  },
  ["players"],
  { revalidate: false },
);

export async function getPlayers(): Promise<PlayerOption[]> {
  return fetchPlayers();
}
