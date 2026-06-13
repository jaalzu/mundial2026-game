import { useEffect } from "react";
import type { UseFormWatch } from "react-hook-form";
import type { GroupPredictionsFormValues, Match } from "../../models/types";

interface UseGroupAutosaveProps {
  watch: UseFormWatch<GroupPredictionsFormValues>;
  matches: Match[];
  onAutosave: (matchId: string, home: number, away: number) => void;
}

export function useGroupAutosave({
  watch,
  matches,
  onAutosave,
}: UseGroupAutosaveProps) {
  useEffect(() => {
    const subscription = watch((values, { name, type }) => {
      if (!name || type !== "change") return;

      const match = name.match(
        /^matches\.(\d+)\.(predictedHome|predictedAway)$/,
      );
      if (!match) return;

      const idx = parseInt(match[1], 10);
      const entry = values.matches?.[idx];

      const home = parseInt(entry?.predictedHome ?? "", 10);
      const away = parseInt(entry?.predictedAway ?? "", 10);

      if (isNaN(home) || isNaN(away)) return;

      onAutosave(matches[idx].id, home, away);
    });
    return () => subscription.unsubscribe();
  }, [watch, onAutosave, matches]);
}
