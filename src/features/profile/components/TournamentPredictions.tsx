import { SectionCard } from "./SectionCard";
import { DataRow } from "./DataRow";
import type { TournamentPredictions } from "../types";

type TournamentPredictionsProps = {
  predictions: TournamentPredictions;
};

export function TournamentPredictions({
  predictions,
}: TournamentPredictionsProps) {
  return (
    <SectionCard title="Predicciones del torneo">
      <DataRow label="Campeon" value={predictions.champion} valueHighlight />
      <DataRow label="Subcampeon" value={predictions.runnerUp} valueHighlight />
      <DataRow
        label="Bota de oro"
        value={predictions.goldenBoot}
        valueHighlight
      />
      <DataRow label="MVP" value={predictions.mvp} valueHighlight />
      <DataRow
        label="Jugador joven"
        value={predictions.youngPlayer}
        valueHighlight
      />
      <DataRow
        label="Equipo Decepcion"
        value={predictions.disappointmentTeam}
        valueHighlight
      />
      <DataRow
        label="Equipo revelacion"
        value={predictions.revelationTeam}
        valueHighlight
      />
      <DataRow
        label="Guante de oro"
        value={predictions.goldenGlove}
        valueHighlight
      />
    </SectionCard>
  );
}
