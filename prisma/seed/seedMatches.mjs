// prisma/seed/seedMatches.mjs
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const NAME_MAP = {
  "Korea Republic": "South Korea",
  Czechia: "Czech Republic",
  "Bosnia and Herzegovina": "Bosnia & Herzegovina",
  Türkiye: "Turkey",
  "Côte d'Ivoire": "Ivory Coast",
  "IR Iran": "Iran",
  "Cabo Verde": "Cape Verde",
  "Congo DR": "DR Congo",
};

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

export async function seedMatches(fixturesRaw, teamsMap) {
  console.log("\n⚽ Insertando partidos...");
  let insertedCount = 0;
  let skippedCount = 0;

  for (const fixture of fixturesRaw) {
    const homeTeamName = NAME_MAP[fixture.HomeTeam] || fixture.HomeTeam;
    const awayTeamName = NAME_MAP[fixture.AwayTeam] || fixture.AwayTeam;

    if (
      homeTeamName === "To be announced" ||
      awayTeamName === "To be announced"
    ) {
      skippedCount++;
      continue;
    }

    const homeTeamId = teamsMap.get(homeTeamName);
    const awayTeamId = teamsMap.get(awayTeamName);

    if (!homeTeamId || !awayTeamId) {
      console.warn(
        `⚠️  Equipos no encontrados: ${homeTeamName} vs ${awayTeamName}`,
      );
      skippedCount++;
      continue;
    }

    const phase = getMatchPhase(fixture.RoundNumber);
    const group = fixture.Group ?? null;

    await prisma.match.upsert({
      where: { externalId: `wc2026-${fixture.MatchNumber}` },
      update: { group, phase, status: "SCHEDULED" },
      create: {
        externalId: `wc2026-${fixture.MatchNumber}`,
        homeTeamId,
        awayTeamId,
        group,
        phase,
        status: "SCHEDULED",
        startsAt: new Date(fixture.DateUtc),
      },
    });

    insertedCount++;
  }

  console.log(`✅ ${insertedCount} partidos insertados`);
  console.log(`⏭️  ${skippedCount} partidos omitidos`);
  await prisma.$disconnect();
}
