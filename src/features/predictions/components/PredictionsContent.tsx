"use client";

import { useState, useCallback } from "react";
import type { PredictionPhase } from "../types";
import { MOCK_GROUPS, ALL_GROUPS } from "../mockData";
import { PhaseTabs } from "./PhaseTabs";
import { GroupTabs } from "./GroupTabs";
import { GroupMatches } from "./GroupMatches";
import { colors, typography } from "@/shared/constants/designSystem";

interface PredictionsContentProps {
  userId: string;
}

export function PredictionsContent({ userId }: PredictionsContentProps) {
  const [activePhase, setActivePhase] = useState<PredictionPhase>("GROUPS");
  const [activeGroup, setActiveGroup] = useState<string>(ALL_GROUPS[0]);

  const activeGroupIndex = ALL_GROUPS.indexOf(activeGroup);
  const activeGroupData = MOCK_GROUPS.find((g) => g.group === activeGroup);
  const nextGroup = ALL_GROUPS[activeGroupIndex + 1];
  const prevGroup = ALL_GROUPS[activeGroupIndex - 1];

  const goToGroup = (group: string) => {
    setActiveGroup(group);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAutosave = useCallback(
    (matchId: string, home: number, away: number) => {
      // TODO: server action
      console.log("[autosave]", { userId, matchId, home, away });
    },
    [userId],
  );

  return (
    <div
      className="flex flex-col min-h-full"
      style={{ backgroundColor: colors.background }}
    >
      <PhaseTabs activePhase={activePhase} onSelectPhase={setActivePhase} />

      {activePhase === "GROUPS" && (
        <>
          <GroupTabs
            groups={ALL_GROUPS}
            activeGroup={activeGroup}
            onSelectGroup={goToGroup}
          />
          {activeGroupData && (
            <GroupMatches
              key={activeGroup}
              groupData={activeGroupData}
              nextGroupLabel={nextGroup}
              prevGroupLabel={prevGroup}
              onNavigateNext={
                nextGroup ? () => goToGroup(nextGroup) : undefined
              }
              onNavigatePrev={
                prevGroup ? () => goToGroup(prevGroup) : undefined
              }
              onAutosave={handleAutosave}
            />
          )}
        </>
      )}

      {(activePhase === "TOURNAMENT" || activePhase === "KNOCKOUT") && (
        <div className="flex flex-1 items-center justify-center min-h-48">
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.sm,
              color: colors.mutedText,
              letterSpacing: "0.06em",
            }}
          >
            {activePhase === "TOURNAMENT" ? "Campeonato" : "Eliminatorias"} —
            próximamente
          </span>
        </div>
      )}
    </div>
  );
}
