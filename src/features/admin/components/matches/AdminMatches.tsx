import type { AdminGroupData } from "../../data/getAdminMatches";
import { MatchAdminRow } from "./MatchAdminRow";
import { colors, borders, typography } from "@/shared/constants/designSystem";

interface AdminMatchesProps {
  groups: AdminGroupData[];
}

export function AdminMatches({ groups }: AdminMatchesProps) {
  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => (
        <div key={group.group}>
          <div className="px-4 py-2" style={{ borderBottom: borders.default }}>
            <span
              style={{
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.lg,
                fontWeight: 700,
                color: colors.text,
              }}
            >
              Grupo {group.group}
            </span>
          </div>
          <div className="flex flex-col">
            {group.matches.map((match) => (
              <MatchAdminRow key={match.id} match={match} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
