"use client";

import { useState, useCallback, useEffect } from "react";
import type {
  PredictionPhase,
  PredictionsMap,
  TournamentPredictionData,
  TeamOption,
  PlayerOption,
} from "../models/types";
import type { GroupData, KnockoutMatch } from "../models/types";
import { usePredictionStore } from "../store/usePredictionStore";
import { PhaseTabs } from "./shared/PhaseTabs";
import { GroupTabs } from "./groups/GroupTabs";
import { GroupMatches } from "./groups/GroupMatches";
import { TournamentPredictions } from "./tournament/TournamentPredictions";
import { savePrediction } from "../actions/savePrediction";
import { colors } from "@/shared/constants/designSystem";
import type { KnockoutPredictionsMap } from "../models/types";
import { KnockoutMatches } from "./knockout/KnockoutMatches";
import { saveKnockoutPrediction } from "../../admin/actions/saveKnockoutPrediction";
import { useSearchParams } from "next/navigation";
interface PredictionsContentProps {
  userId: string;
  groups: GroupData[];
  initialPredictions: PredictionsMap;
  knockoutMatches: KnockoutMatch[];
  initialKnockoutPredictions: KnockoutPredictionsMap;

  initialTournament: TournamentPredictionData | null;
  teams: TeamOption[];
  players: PlayerOption[];
}

export function PredictionsContent({
  userId,
  groups,
  initialPredictions,
  knockoutMatches,
  initialKnockoutPredictions,
  initialTournament,
  teams,
  players,
}: PredictionsContentProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activePhase, setActivePhase] = useState<PredictionPhase>(
    tabParam === "groups"
      ? "GROUPS"
      : tabParam === "tournament"
        ? "TOURNAMENT"
        : "KNOCKOUT",
  );
  const [activeGroup, setActiveGroup] = useState<string>(
    groups[0]?.group ?? "A",
  );

  const [knockoutPredictions, setKnockoutPredictions] =
    useState<KnockoutPredictionsMap>(initialKnockoutPredictions);

  const { predictions, hydrate, setPrediction } = usePredictionStore();

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

      {activePhase === "TOURNAMENT" && (
        <TournamentPredictions
          userId={userId}
          initialData={initialTournament}
          teams={teams}
          players={players}
        />
      )}

      {activePhase === "KNOCKOUT" && (
        <KnockoutMatches
          userId={userId}
          matches={knockoutMatches}
          predictions={knockoutPredictions}
          onAutosave={async (matchId, home, away, penaltyWinnerId) => {
            setKnockoutPredictions((prev) => ({
              ...prev,
              [matchId]: {
                matchId,
                predictedHome: home,
                predictedAway: away,
                predictedPenaltyWinnerId: penaltyWinnerId,
              },
            }));
            await saveKnockoutPrediction(
              userId,
              matchId,
              home,
              away,
              penaltyWinnerId,
            );
          }}
        />
      )}
    </div>
  );
}
