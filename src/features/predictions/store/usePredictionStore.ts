import { create } from "zustand";
import type { PredictionsMap, MatchPredictionValue } from "../models/types";

interface PredictionsStore {
  predictions: PredictionsMap;
  hydrate: (initial: PredictionsMap) => void;
  setPrediction: (value: MatchPredictionValue) => void;
}

export const usePredictionStore = create<PredictionsStore>((set) => ({
  predictions: {},
  hydrate: (initial) => set({ predictions: initial }),
  setPrediction: (value) =>
    set((state) => ({
      predictions: { ...state.predictions, [value.matchId]: value },
    })),
}));
