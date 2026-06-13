// reducir-3-horas.mjs
import fs from "fs";
import path from "path";

// Leer el archivo fixtures.json
const fixturesPath = "./fixtures.json"; // Ajusta la ruta si es necesario

console.log("📥 Leyendo fixtures.json...\n");
const fixtures = JSON.parse(fs.readFileSync(fixturesPath, "utf-8"));

console.log(`⏱️  Reduciendo 3 horas a ${fixtures.length} partidos...\n`);

// Restar 3 horas a cada DateUtc
fixtures.forEach((match) => {
  if (match.DateUtc) {
    // Parsear la fecha
    const fecha = new Date(match.DateUtc);
    
    // Restar 3 horas
    fecha.setHours(fecha.getHours() - 3);
    
    // Formatear de nuevo a ISO string
    const horarioAnterior = match.DateUtc;
    match.DateUtc = fecha.toISOString().replace("T", " ").slice(0, -5) + "Z";
    
    console.log(`Match ${match.MatchNumber}: ${match.HomeTeam} vs ${match.AwayTeam}`);
    console.log(`  ${horarioAnterior} → ${match.DateUtc}`);
  }
});

// Guardar el archivo actualizado
const outputPath = "./fixtures_actualizado.json";
fs.writeFileSync(outputPath, JSON.stringify(fixtures, null, 2));

console.log(`\n✅ Listo! Archivo guardado en: ${outputPath}`);
console.log(`📊 Se actualizaron ${fixtures.length} partidos`);
