import { SectionCard } from "./SectionCard";
import { DataRow } from "./DataRow";
import type { TournamentPredictions } from "../types";

type TournamentPredictionsSectionProps = {
  predictions: TournamentPredictions | null;
};

export function TournamentPredictionsSection({
  predictions,
}: TournamentPredictionsSectionProps) {
  if (!predictions) {
    return (
      <SectionCard title="Predicciones del torneo">
        <p style={{ opacity: 0.5, fontSize: 14 }}>
          Todavía no hiciste tus predicciones del torneo.
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Predicciones del torneo">
      <DataRow label="Campeón" value={predictions.champion} valueHighlight />
      <DataRow label="Subcampeón" value={predictions.runnerUp} valueHighlight />
      <DataRow
        label="Equipo Sorpresa"
        value={predictions.surprise}
        valueHighlight
      />
      <DataRow
        label="Equipo Decepción"
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
        label="Revelación"
        value={predictions.revelation}
        valueHighlight
      />
    </SectionCard>
  );
}
