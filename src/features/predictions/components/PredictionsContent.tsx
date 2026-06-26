"use client";

import { useState, useCallback, useEffect } from "react";
import type {
  PredictionPhase,
  PredictionsMap,
  TournamentPredictionData,
  TeamOption,
  PlayerOption,
} from "../models/types";
import type { GroupData } from "../models/types";
import { usePredictionStore } from "../store/usePredictionStore";
import { PhaseTabs } from "./shared/PhaseTabs";
import { GroupTabs } from "./groups/GroupTabs";
import { GroupMatches } from "./groups/GroupMatches";
import { TournamentPredictions } from "./tournament/TournamentPredictions";
import { savePrediction } from "../actions/savePrediction";
import { colors } from "@/shared/constants/designSystem";
import type { KnockoutPredictionsMap } from "../models/types";
import { KnockoutMatches } from "./knockout/KnockoutMatches";
import { MOCK_KNOCKOUT_MATCHES } from "@/features/admin/data/mockKnockoutMatches";

interface PredictionsContentProps {
  userId: string;
  groups: GroupData[];
  initialPredictions: PredictionsMap;
  initialTournament: TournamentPredictionData | null;
  teams: TeamOption[];
  players: PlayerOption[];
}

export function PredictionsContent({
  userId,
  groups,
  initialPredictions,
  initialTournament,
  teams,
  players,
}: PredictionsContentProps) {
  const [activePhase, setActivePhase] = useState<PredictionPhase>("GROUPS");
  const [activeGroup, setActiveGroup] = useState<string>(
    groups[0]?.group ?? "A",
  );
  const [knockoutPredictions, setKnockoutPredictions] =
    useState<KnockoutPredictionsMap>({});

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
          matches={MOCK_KNOCKOUT_MATCHES}
          predictions={knockoutPredictions}
          onAutosave={(matchId, home, away, penaltyWinnerId) => {
            // por ahora solo en memoria, sin server action todavía
            setKnockoutPredictions((prev) => ({
              ...prev,
              [matchId]: {
                matchId,
                predictedHome: home,
                predictedAway: away,
                predictedPenaltyWinnerId: penaltyWinnerId,
              },
            }));
          }}
        />
      )}
    </div>
  );
}
