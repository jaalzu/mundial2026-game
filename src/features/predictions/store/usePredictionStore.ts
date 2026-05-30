import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PredictionsMap, MatchPredictionValue } from "../models/types";

interface PredictionsStore {
  predictions: PredictionsMap;
  hydrate: (initial: PredictionsMap) => void;
  setPrediction: (value: MatchPredictionValue) => void;
}

export const usePredictionsStore = create<PredictionsStore>()(
  persist(
    (set) => ({
      predictions: {},
      hydrate: (initial) =>
        set((state) => ({
          predictions: { ...initial, ...state.predictions },
        })),
      setPrediction: (value) =>
        set((state) => ({
          predictions: { ...state.predictions, [value.matchId]: value },
        })),
    }),
    {
      name: "predictions-store",
    },
  ),
);
