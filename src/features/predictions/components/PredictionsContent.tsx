"use client";

import { useState, useCallback } from "react";
import type { PredictionPhase } from "../models/types";

import { PhaseTabs } from "./PhaseTabs";
import { GroupTabs } from "./GroupTabs";
import { GroupMatches } from "./GroupMatches";
import { savePrediction } from "../actions/savePrediction";
import { colors, typography } from "@/shared/constants/designSystem";
import type { GroupData } from "@/features/predictions/models/types";

interface PredictionsContentProps {
  userId: string;
  groups: GroupData[];
}

export function PredictionsContent({
  userId,
  groups,
}: PredictionsContentProps) {
  const [activePhase, setActivePhase] = useState<PredictionPhase>("GROUPS");
  const [activeGroup, setActiveGroup] = useState<string>(
    groups[0]?.group || "A",
  );

  const activeGroupIndex = groups.findIndex((g) => g.group === activeGroup);
  const activeGroupData = groups.find((g) => g.group === activeGroup);
  const nextGroup = groups[activeGroupIndex + 1]?.group;
  const prevGroup = groups[activeGroupIndex - 1]?.group;

  const goToGroup = (group: string) => {
    setActiveGroup(group);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAutosave = useCallback(
    async (matchId: string, home: number, away: number) => {
      await savePrediction(userId, matchId, home, away);
    },
    [userId],
  );

  return (
    <div
      className="flex flex-col min-h-full "
      style={{ backgroundColor: colors.background }}
    >
      <PhaseTabs activePhase={activePhase} onSelectPhase={setActivePhase} />

      {activePhase === "GROUPS" && (
        <>
          <GroupTabs
            groups={groups.map((g) => g.group)}
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
