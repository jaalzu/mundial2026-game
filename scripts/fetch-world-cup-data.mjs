// scripts/fetch-world-cup-data.mjs
// Trae teams, players y fixtures del Mundial 2026 y los guarda como JSON local
// Uso: node scripts/fetch-world-cup-data.mjs

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "../prisma/seed/data");

const API_KEY = process.env.API_FOOTBALL_KEY;
const BASE_URL = "https://v3.football.api-sports.io";
const LEAGUE = 1;
const SEASON = 2026;

if (!API_KEY) {
  console.error("❌ API_FOOTBALL_KEY no está definida en .env.local");
  process.exit(1);
}

// Crear carpeta si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function apiFetch(endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  console.log(`📡 GET ${url}`);

  const res = await fetch(url, {
    headers: {
      "x-apisports-key": API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} en ${url}`);
  }

  const json = await res.json();

  if (json.errors && Object.keys(json.errors).length > 0) {
    throw new Error(`API error: ${JSON.stringify(json.errors)}`);
  }

  console.log(`✅ ${json.results} resultados`);
  return json.response;
}

function saveJSON(filename, data) {
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  console.log(`💾 Guardado: ${filepath}`);
}

async function fetchTeams() {
  console.log("\n🏳️  Trayendo equipos...");
  const data = await apiFetch(`/teams?league=${LEAGUE}&season=${SEASON}`);
  saveJSON("teams.json", data);
  return data;
}

async function fetchFixtures() {
  console.log("\n📅 Trayendo fixture completo...");
  const data = await apiFetch(`/fixtures?league=${LEAGUE}&season=${SEASON}`);
  saveJSON("fixtures.json", data);
  return data;
}

async function fetchPlayers() {
  console.log("\n👤 Trayendo jugadores (paginado)...");

  let page = 1;
  let allPlayers = [];

  while (true) {
    const data = await apiFetch(
      `/players?league=${LEAGUE}&season=${SEASON}&page=${page}`,
    );

    allPlayers = [...allPlayers, ...data];
    console.log(`   Página ${page} - Total acumulado: ${allPlayers.length}`);

    // Si devuelve menos de 20, es la última página
    if (data.length < 20) break;
    page++;
  }

  saveJSON("players.json", allPlayers);
  return allPlayers;
}

async function main() {
  console.log("🌍 Fetch Mundial 2026 - API Football");
  console.log("=====================================");

  try {
    const teams = await fetchTeams();
    console.log(`   → ${teams.length} equipos`);

    const fixtures = await fetchFixtures();
    console.log(`   → ${fixtures.length} partidos`);

    const players = await fetchPlayers();
    console.log(`   → ${players.length} jugadores`);

    console.log("\n✅ Todo guardado en prisma/seed/data/");
    console.log("   Ahora corré: pnpm db:seed");
  } catch (err) {
    console.error("\n❌ Error:", err.message);
    process.exit(1);
  }
}

main();
