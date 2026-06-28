import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config({ path: ".env.local" });

const prisma = new PrismaClient();

const ROUND_CONFIG = [
  { phase: "ROUND_OF_16", count: 16, hasBracket: true },
  { phase: "ROUND_OF_8", count: 8, hasBracket: true },
  { phase: "QUARTER_FINAL", count: 4, hasBracket: false },
  { phase: "SEMI_FINAL", count: 2, hasBracket: false },
  { phase: "THIRD_PLACE", count: 1, hasBracket: false },
  { phase: "FINAL", count: 1, hasBracket: false },
];

function buildPlaceholders() {
  const rows = [];
  for (const { phase, count, hasBracket } of ROUND_CONFIG) {
    for (let i = 1; i <= count; i++) {
      rows.push({
        phase,
        bracket: hasBracket ? (i <= count / 2 ? 1 : 2) : null,
        status: "SCHEDULED",
        homeTeamId: null,
        awayTeamId: null,
        startsAt: null,
      });
    }
  }
  return rows;
}

async function main() {
  console.log("🌱 Seeding Knockout placeholders.....");

  const existing = await prisma.match.count({
    where: { phase: { not: "GROUP" } },
  });

  if (existing > 0) {
    console.log(
      `⚠️  Ya existen ${existing} partidos de eliminatorias. Abortando para no duplicar.`,
    );
    console.log(
      "   Si querés regenerarlos, borralos manualmente primero (solo en local/branch, nunca en producción).",
    );
    return;
  }

  const rows = buildPlaceholders();
  console.log(`📂 Insertando ${rows.length} partidos de eliminatorias (TBD)`);

  await prisma.match.createMany({ data: rows });

  console.log("\n✨ Knockout seed completado!");
}

main()
  .catch((e) => {
    console.error("❌ Error fatal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
