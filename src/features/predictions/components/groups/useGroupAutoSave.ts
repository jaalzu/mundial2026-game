// components/groups/useGroupAutosave.ts
import { useEffect } from "react";
import type { UseFormWatch, UseFormSetFocus } from "react-hook-form";
import type { GroupPredictionsFormValues, Match } from "../../models/types";

interface UseGroupAutosaveProps {
  watch: UseFormWatch<GroupPredictionsFormValues>;
  setFocus: UseFormSetFocus<GroupPredictionsFormValues>;
  matches: Match[];
  onAutosave: (matchId: string, home: number, away: number) => void;
  onNavigateNext?: () => void;
  setActiveMatchIndex: (idx: number) => void;
}

export function useGroupAutosave({
  watch,
  setFocus,
  matches,
  onAutosave,
  onNavigateNext,
  setActiveMatchIndex,
}: UseGroupAutosaveProps) {
  useEffect(() => {
    const subscription = watch((values, { name, type }) => {
      console.log("watch fired", { name, type });

      if (!name || type !== "change") {
        console.log("skipped — type:", type);
        return;
      }

      const match = name.match(
        /^matches\.(\d+)\.(predictedHome|predictedAway)$/,
      );
      console.log("regex match:", match);
      if (!match) return;

      const idx = parseInt(match[1], 10);
      const field = match[2] as "predictedHome" | "predictedAway";
      const entry = values.matches?.[idx];

      console.log("field:", field, "entry:", entry);

      const home = parseInt(entry?.predictedHome ?? "", 10);
      const away = parseInt(entry?.predictedAway ?? "", 10);

      console.log("parsed — home:", home, "away:", away);

      if (field === "predictedHome") {
        if (!isNaN(home)) setFocus(`matches.${idx}.predictedAway`);
        return;
      }

      // field === "predictedAway"
      if (isNaN(away)) return;
      if (isNaN(home)) return;

      onAutosave(matches[idx].id, home, away);
      const nextIdx = idx + 1;
      if (nextIdx < matches.length) {
        setActiveMatchIndex(nextIdx);
        setFocus(`matches.${nextIdx}.predictedHome`);
      } else {
        onNavigateNext?.();
      }
    });
    return () => subscription.unsubscribe();
  }, [
    watch,
    onAutosave,
    onNavigateNext,
    matches,
    setFocus,
    setActiveMatchIndex,
  ]);
}
