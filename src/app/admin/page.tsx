import { getAdminMatches } from "@/features/admin/data/getAdminMatches";
import { getPlayers } from "@/shared/data/getPlayers";
import { getTeams } from "@/shared/data/getTeams";
import { AdminTabs } from "@/features/admin/components/AdminTabs";
import { colors, typography } from "@/shared/constants/designSystem";

export default async function AdminPage() {
  const [groups, players, teams] = await Promise.all([
    getAdminMatches(),
    getPlayers(),
    getTeams(),
  ]);

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

      <AdminTabs groups={groups} teams={teams} players={players} />
    </div>
  );
}
