"use client";

import { useState } from "react";
import type { AdminGroupData } from "../data/getAdminMatches";
import { AdminMatches } from "./matches/AdminMatches";
import { AdminTournament } from "./tournament/AdminTournament";
import type {
  TeamOption,
  PlayerOption,
} from "@/features/predictions/models/types";
import { colors, typography } from "@/shared/constants/designSystem";

type AdminTab = "matches" | "tournament";

const TABS: { id: AdminTab; label: string }[] = [
  { id: "matches", label: "PARTIDOS" },
  { id: "tournament", label: "TORNEO" },
];

interface AdminTabsProps {
  groups: AdminGroupData[];
  teams: TeamOption[];
  players: PlayerOption[];
}

export function AdminTabs({ groups, teams, players }: AdminTabsProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("matches");

  return (
    <div className="flex flex-col">
      {/* Tabs */}
      <div
        className="grid grid-cols-2 mb-6"
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
                fontSize: typography.sizes.lg,
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
      {activeTab === "tournament" && (
        <AdminTournament teams={teams} players={players} />
      )}
    </div>
  );
}
