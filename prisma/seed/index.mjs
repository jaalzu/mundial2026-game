import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { seedTeams } from "./seedTeams.mjs";
import { seedMatches } from "./seedMatches.mjs";
import { seedPlayers } from "./seedPlayers.mjs";

dotenv.config({ path: ".env.local" });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  console.log("🌱 Seeding World Cup 2026.....");

  const fixturesPath = path.join(__dirname, "data/fixtures.json");
  const teamsPath = path.join(__dirname, "data/teams.json");
  const playersPath = path.join(__dirname, "data/players.json");

  if (!fs.existsSync(fixturesPath))
    throw new Error(`❌ fixtures.json no encontrado`);
  if (!fs.existsSync(teamsPath)) throw new Error(`❌ teams.json no encontrado`);
  if (!fs.existsSync(playersPath))
    throw new Error(`❌ players.json no encontrado`);

  const fixturesRaw = JSON.parse(fs.readFileSync(fixturesPath, "utf-8"));
  const teamsRaw = JSON.parse(fs.readFileSync(teamsPath, "utf-8"));
  const playersRaw = JSON.parse(fs.readFileSync(playersPath, "utf-8"));

  console.log(`📂 ${fixturesRaw.length} partidos | ${teamsRaw.length} equipos`);

  const teamsMap = await seedTeams(teamsRaw);
  await seedMatches(fixturesRaw, teamsMap);
  await seedPlayers(playersRaw);

  console.log("\n✨ Seed completado!");
}

main().catch((e) => {
  console.error("❌ Error fatal:", e);
  process.exit(1);
});
