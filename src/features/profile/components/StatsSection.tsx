import { SectionCard } from "./SectionCard";
import { DataRow } from "./DataRow";
import type { UserStats } from "../types";

type StatsSectionProps = {
  stats: UserStats;
};

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <SectionCard title="Estadisticas">
      <DataRow
        label="Posicion en la tabla"
        value={`${stats.position} de ${stats.totalPlayers}`}
        valueHighlight
      />
      <DataRow
        label="Puntos"
        value={String(stats.totalPoints)}
        valueHighlight
      />
      <DataRow
        label="Predicciones exactas"
        value={String(stats.exactPredictions)}
        valueHighlight
      />
    </SectionCard>
  );
}
