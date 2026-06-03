import { SectionCard } from "./SectionCard";
import { DataRow } from "./DataRow";
import type { UserStats } from "../types";

type StatsSectionProps = {
  stats: UserStats | null;
};

export function StatsSection({ stats }: StatsSectionProps) {
  if (!stats) {
    return (
      <SectionCard title="Estadísticas">
        <p style={{ opacity: 0.5, fontSize: 14 }}>
          Todavía no tenés puntos acumulados.
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Estadísticas">
      <DataRow
        label="Posición en la tabla"
        value={
          stats.position != null
            ? `${stats.position} de ${stats.totalPlayers}`
            : `— de ${stats.totalPlayers}`
        }
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
