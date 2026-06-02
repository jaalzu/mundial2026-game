import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  TournamentPredictionData,
  TournamentPredictionField,
} from "../models/types";

const EMPTY: TournamentPredictionData = {
  championTeamId: null,
  runnerUpTeamId: null,
  // finalHomeTeamId: null,
  // finalAwayTeamId: null,
  surpriseTeamId: null,
  disappointmentTeamId: null,
  mvpPlayerId: null,
  goldenBootPlayerId: null,
  bestGoalkeeperPlayerId: null,
  revelationPlayerId: null,
};

interface TournamentPredictionsStore {
  data: TournamentPredictionData;
  hydrate: (initial: TournamentPredictionData | null) => void;
  setField: (field: TournamentPredictionField, value: string | null) => void;
}

export const useTournamentPredictionsStore =
  create<TournamentPredictionsStore>()(
    persist(
      (set) => ({
        data: EMPTY,

        hydrate: (initial) =>
          set((state) => ({
            // Local optimistic updates win over server data
            data: { ...EMPTY, ...state.data, ...initial },
          })),

        setField: (field, value) =>
          set((state) => ({
            data: { ...state.data, [field]: value },
          })),
      }),
      { name: "tournament-predictions-store" },
    ),
  );
