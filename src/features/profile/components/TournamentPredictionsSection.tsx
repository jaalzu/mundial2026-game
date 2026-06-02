import { SectionCard } from "./SectionCard";
import { DataRow } from "./DataRow";
import type { TournamentPredictions } from "../types";

type TournamentPredictionsSectionProps = {
  predictions: TournamentPredictions;
};

export function TournamentPredictionsSection({
  predictions,
}: TournamentPredictionsSectionProps) {
  return (
    <SectionCard title="Predicciones del torneo">
      <DataRow label="Campeon" value={predictions.champion} valueHighlight />
      <DataRow label="Subcampeon" value={predictions.runnerUp} valueHighlight />
      <DataRow
        label="Equipo Sorpresa"
        value={predictions.surprise}
        valueHighlight
      />
      <DataRow
        label="Equipo Decepcion"
        value={predictions.disappointment}
        valueHighlight
      />
      <DataRow label="MVP" value={predictions.mvp} valueHighlight />
      <DataRow
        label="Bota de oro"
        value={predictions.goldenBoot}
        valueHighlight
      />
      <DataRow
        label="Mejor Arquero"
        value={predictions.bestGoalkeeper}
        valueHighlight
      />
      <DataRow
        label="Revelacion"
        value={predictions.revelation}
        valueHighlight
      />
    </SectionCard>
  );
}
