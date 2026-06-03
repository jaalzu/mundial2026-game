// src/shared/data/getTeams.ts
"use server";

import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import type { TeamOption } from "@/features/predictions/models/types";

export const getTeams = unstable_cache(
  async (): Promise<TeamOption[]> => {
    return prisma.team.findMany({
      select: { id: true, name: true, code: true, flagUrl: true },
      orderBy: { name: "asc" },
    });
  },
  ["teams-list"],
  { revalidate: false },
);
