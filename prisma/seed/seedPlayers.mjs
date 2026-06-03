import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const POSITION_MAP = {
  Arqueros: "GK",
  Defensores: "DEF",
  Mediocampistas: "MID",
  Delanteros: "FWD",
};

export async function seedPlayers(playersRaw) {
  console.log("\n👤 Insertando jugadores...");

  let total = 0;

  for (const [grupo, equipos] of Object.entries(playersRaw)) {
    for (const [teamName, positions] of Object.entries(equipos)) {
      // Buscar el equipo en la DB por nombre
      const team = await prisma.team.findFirst({
        where: { name: teamName },
        select: { id: true },
      });

      if (!team) {
        console.warn(`  ⚠️  Equipo no encontrado: ${teamName} (${grupo})`);
        continue;
      }

      for (const [posLabel, players] of Object.entries(positions)) {
        const position = POSITION_MAP[posLabel];
        if (!position) continue;

        for (const rawName of players) {
          const name = rawName.trim();
          if (!name) continue;

          await prisma.player.upsert({
            where: { externalId: `${team.id}-${name}` },
            update: { name, position },
            create: {
              externalId: `${team.id}-${name}`,
              teamId: team.id,
              name,
              position,
              photoUrl: null,
            },
          });

          total++;
          console.log(`  ✓ ${name} (${posLabel} — ${teamName})`);
        }
      }
    }
  }

  console.log(`✅ ${total} jugadores insertados`);
  await prisma.$disconnect();
}
