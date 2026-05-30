"use client";

import { useState, useCallback, useEffect } from "react";
import type { PredictionPhase, PredictionsMap } from "../models/types";
import type { GroupData } from "../models/types";
import { usePredictionsStore } from "../store/usePredictionStore";
import { PhaseTabs } from "./shared/PhaseTabs";
import { GroupTabs } from "./groups/GroupTabs";
import { GroupMatches } from "./groups/GroupMatches";
import { savePrediction } from "../actions/savePrediction";
import { colors, typography } from "@/shared/constants/designSystem";

interface PredictionsContentProps {
  userId: string;
  groups: GroupData[];
  initialPredictions: PredictionsMap;
}

export function PredictionsContent({
  userId,
  groups,
  initialPredictions,
}: PredictionsContentProps) {
  const [activePhase, setActivePhase] = useState<PredictionPhase>("GROUPS");
  const [activeGroup, setActiveGroup] = useState<string>(
    groups[0]?.group ?? "A",
  );

  const { predictions, hydrate, setPrediction } = usePredictionsStore();

  useEffect(() => {
    hydrate(initialPredictions);
  }, [hydrate, initialPredictions]);

  const activeGroupIndex = groups.findIndex((g) => g.group === activeGroup);
  const activeGroupData = groups[activeGroupIndex];
  const nextGroup = groups[activeGroupIndex + 1]?.group;
  const prevGroup = groups[activeGroupIndex - 1]?.group;

  const goToGroup = useCallback((group: string) => {
    setActiveGroup(group);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleAutosave = useCallback(
    async (matchId: string, home: number, away: number) => {
      setPrediction({ matchId, predictedHome: home, predictedAway: away });
      await savePrediction(userId, matchId, home, away);
    },
    [userId, setPrediction],
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
            groups={groups.map((g) => g.group)}
            activeGroup={activeGroup}
            onSelectGroup={goToGroup}
          />
          {activeGroupData && (
            <GroupMatches
              key={activeGroup}
              groupData={activeGroupData}
              initialPredictions={predictions}
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
