// src/app/admin/test-data/page.tsx
import fs from "fs";
import path from "path";

type Team = {
  name: string;
  fifa_code: string;
  group: string;
  flag_icon: string;
};

type Fixture = {
  MatchNumber: number;
  HomeTeam: string;
  AwayTeam: string;
  DateUtc: string;
  Group: string | null;
  RoundNumber: number;
};

export default function TestDataPage() {
  const fixturesPath = path.join(
    process.cwd(),
    "prisma/seed/data/fixtures.json",
  );
  const teamsPath = path.join(process.cwd(), "prisma/seed/data/teams.json");

  const fixtures: Fixture[] = JSON.parse(
    fs.readFileSync(fixturesPath, "utf-8"),
  );
  const teams: Team[] = JSON.parse(fs.readFileSync(teamsPath, "utf-8"));

  // Agrupar equipos por grupo
  const groupedTeams = teams.reduce(
    (acc, team) => {
      if (!acc[team.group]) acc[team.group] = [];
      acc[team.group].push(team);
      return acc;
    },
    {} as Record<string, Team[]>,
  );

  // Filtrar solo partidos de grupo (RoundNumber 1-3)
  const groupMatches = fixtures.filter((f) => f.RoundNumber <= 3 && f.Group);

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>🌍 Datos Temporales - Mundial 2026</h1>

      {/* Grupos */}
      <section style={{ marginBottom: "40px" }}>
        <h2>📋 Grupos</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          {Object.entries(groupedTeams).map(([group, groupTeams]) => (
            <div
              key={group}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
              }}
            >
              <h3>Grupo {group}</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {groupTeams.map((team) => (
                  <li key={team.fifa_code} style={{ marginBottom: "8px" }}>
                    {team.flag_icon} {team.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Partidos de Grupo */}
      <section>
        <h2>⚽ Partidos de Grupo</h2>
        <div style={{ maxHeight: "600px", overflowY: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "12px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Fecha
                </th>
                <th
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Grupo
                </th>
                <th
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  Partido
                </th>
              </tr>
            </thead>
            <tbody>
              {groupMatches.map((match) => (
                <tr key={match.MatchNumber}>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {new Date(match.DateUtc).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {match.Group}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                    {match.HomeTeam} vs {match.AwayTeam}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Stats */}
      <div
        style={{
          marginTop: "40px",
          padding: "15px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h3>📊 Estadísticas</h3>mj
        <p>Total equipos: {teams.length}</p>
        <p>Total partidos: {fixtures.length}</p>
        <p>Partidos de grupo: {groupMatches.length}</p>
        <p>Grupos: {Object.keys(groupedTeams).join(", ")}</p>
      </div>
    </div>
  );
}
