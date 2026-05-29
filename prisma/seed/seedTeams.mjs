// prisma/seed/seedTeams.mjs
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedTeams(teamsRaw) {
  console.log("\n🏳️  Insertando equipos...");
  const teamsMap = new Map();

  for (const team of teamsRaw) {
    const code = team.iso_code ?? team.fifa_code;
    const upsertedTeam = await prisma.team.upsert({
      where: { code },
      update: { code, name: team.name, region: team.confed || "UNKNOWN" },
      create: {
        code,
        name: team.name,
        region: team.confed || "UNKNOWN",
        flagUrl: "",
      },
    });
    teamsMap.set(team.name, upsertedTeam.id);
    console.log(`  ✓ ${team.name}`);
  }

  console.log(`✅ ${teamsMap.size} equipos insertados`);
  await prisma.$disconnect();
  return teamsMap;
}
