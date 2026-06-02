import { getAdminMatches } from "@/features/admin/data/getAdminMatches";
import { AdminTabs } from "@/features/admin/components/AdminTabs";
import { MOCK_PLAYERS } from "@/features/predictions/utils/mockTournamentData";
import { colors, typography } from "@/shared/constants/designSystem";

export default async function AdminPage() {
  const groups = await getAdminMatches();

  // Extraer equipos únicos de los partidos — igual que en PredictionsLoader
  const teams = Array.from(
    new Map(
      groups
        .flatMap((g) => g.matches)
        .flatMap((m) => [m.homeTeam, m.awayTeam])
        .map((t) => [
          t.id,
          { id: t.id, name: t.name, code: t.code, flagUrl: "" },
        ]),
    ).values(),
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col gap-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between py-2">
        <span
          style={{
            fontFamily: typography.fontFamily,
            fontSize: typography.sizes.xl,
            fontWeight: 700,
            color: colors.text,
            letterSpacing: "-0.03em",
          }}
        >
          Admin
        </span>
      </div>

      <AdminTabs groups={groups} teams={teams} players={MOCK_PLAYERS} />
    </div>
  );
}
