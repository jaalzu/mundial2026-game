// prisma/seed.mjs
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding World Cup 2026 data...");

  const fixturesPath = path.join(
    process.cwd(),
    "prisma/seed/data/fixtures.json",
  );
  const teamsPath = path.join(process.cwd(), "prisma/seed/data/teams.json");

  if (!fs.existsSync(fixturesPath))
    throw new Error(`❌ fixtures.json no encontrado en ${fixturesPath}`);
  if (!fs.existsSync(teamsPath))
    throw new Error(`❌ teams.json no encontrado en ${teamsPath}`);

  const fixturesRaw = JSON.parse(fs.readFileSync(fixturesPath, "utf-8"));
  const teamsRaw = JSON.parse(fs.readFileSync(teamsPath, "utf-8"));

  console.log(`📂 Fixtures: ${fixturesRaw.length} partidos`);
  console.log(`📂 Teams: ${teamsRaw.length} equipos`);

  const nameMap = {
    "Korea Republic": "South Korea",
    Czechia: "Czech Republic",
    "Bosnia and Herzegovina": "Bosnia & Herzegovina",
    Türkiye: "Turkey",
    "Côte d'Ivoire": "Ivory Coast",
    "IR Iran": "Iran",
    "Cabo Verde": "Cape Verde",
    "Congo DR": "DR Congo",
  };

  // 1. Insertar equipos
  console.log("\n🏳️  Insertando equipos...");
  const teamsMap = new Map();

  for (const team of teamsRaw) {
    const upsertedTeam = await prisma.team.upsert({
      where: { code: team.fifa_code },
      update: {
        code: team.iso_code ?? team.fifa_code,
      },
      create: {
        code: team.iso_code ?? team.fifa_code,
        name: team.name,
        region: team.confed || "UNKNOWN",
        flagUrl: "",
      },
    });
    teamsMap.set(team.name, upsertedTeam.id);
    console.log(`  ✓ ${team.name}`);
  }

  console.log(`✅ ${teamsMap.size} equipos insertados`);

  // 2. Insertar fixtures
  console.log("\n⚽ Insertando partidos...");
  let insertedCount = 0;
  let skippedCount = 0;

  for (const fixture of fixturesRaw) {
    let homeTeam = nameMap[fixture.HomeTeam] || fixture.HomeTeam;
    let awayTeam = nameMap[fixture.AwayTeam] || fixture.AwayTeam;

    if (homeTeam === "To be announced" || awayTeam === "To be announced") {
      skippedCount++;
      continue;
    }

    const homeTeamId = teamsMap.get(homeTeam);
    const awayTeamId = teamsMap.get(awayTeam);

    if (!homeTeamId || !awayTeamId) {
      console.warn(`⚠️  Equipos no encontrados: ${homeTeam} vs ${awayTeam}`);
      skippedCount++;
      continue;
    }

    const phase = getMatchPhase(fixture.RoundNumber);

    await prisma.match.upsert({
      where: { externalId: `wc2026-${fixture.MatchNumber}` },
      update: {},
      create: {
        externalId: `wc2026-${fixture.MatchNumber}`,
        homeTeamId,
        awayTeamId,
        group: fixture.Group ?? null,
        phase,
        status: "SCHEDULED",
        startsAt: new Date(fixture.DateUtc),
      },
    });

    insertedCount++;
  }

  console.log(`✅ ${insertedCount} partidos insertados`);
  console.log(
    `⏭️  ${skippedCount} partidos omitidos (sin equipos confirmados)`,
  );
  console.log("\n✨ Seed completado!");
}

function getMatchPhase(roundNumber) {
  const phaseMap = {
    1: "GROUP",
    2: "GROUP",
    3: "GROUP",
    4: "ROUND_OF_16",
    5: "QUARTER_FINAL",
    6: "SEMI_FINAL",
    7: "THIRD_PLACE",
    8: "FINAL",
  };
  return phaseMap[roundNumber] || "GROUP";
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error fatal:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
