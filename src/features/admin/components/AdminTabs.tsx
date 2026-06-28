"use client";

import { useState } from "react";
import type { AdminGroupData } from "../data/getAdminMatches";
import { AdminMatches } from "./matches/AdminMatches";
import { AdminTournament } from "./tournament/AdminTournament";
import { AdminKnockoutMatches } from "./knockout/AdminKnockoutMatches";
// ← borrar el import de MOCK_KNOCKOUT_MATCHES si todavía estaba ahí
import type {
  TeamOption,
  PlayerOption,
  KnockoutMatch, // ← nuevo
} from "@/features/predictions/models/types";
import { colors, typography } from "@/shared/constants/designSystem";
import type { TournamentResultState } from "./tournament/AdminTournament";

type AdminTab = "matches" | "knockout" | "tournament";

const TABS: { id: AdminTab; label: string }[] = [
  { id: "matches", label: "GRUPOS" },
  { id: "knockout", label: "ELIMINATORIAS" },
  { id: "tournament", label: "TORNEO" },
];

interface AdminTabsProps {
  groups: AdminGroupData[];
  teams: TeamOption[];
  players: PlayerOption[];
  initialTournamentResult: TournamentResultState | null;
  knockoutMatches: KnockoutMatch[]; // ← nuevo
}

export function AdminTabs({
  groups,
  teams,
  players,
  initialTournamentResult,
  knockoutMatches, // ← nuevo
}: AdminTabsProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("matches");

  return (
    <div className="flex flex-col">
      <div
        className="grid grid-cols-3 mb-6"
        style={{ border: `2px solid ${colors.border}` }}
      >
        {TABS.map(({ id, label }, i) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="py-2 text-center transition-all"
              style={{
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.md,
                letterSpacing: "-0.03em",
                fontWeight: isActive ? 700 : 400,
                color: isActive ? colors.text : colors.mutedText,
                backgroundColor: colors.background,
                borderLeft: i === 0 ? "none" : `2px solid ${colors.border}`,
                outline: isActive ? `2px solid ${colors.primary}` : "none",
                outlineOffset: "-1px",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {activeTab === "matches" && <AdminMatches groups={groups} />}
      {activeTab === "knockout" && (
        <AdminKnockoutMatches
          initialMatches={knockoutMatches} //
          teams={teams}
        />
      )}
      {activeTab === "tournament" && (
        <AdminTournament
          teams={teams}
          players={players}
          initialResult={initialTournamentResult}
        />
      )}
    </div>
  );
}
