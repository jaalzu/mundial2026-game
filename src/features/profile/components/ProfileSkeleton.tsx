import { ScreenContainer } from "@/shared/components/ui/ScreenContainer";
import { borders, typography } from "@/shared/constants/designSystem";

function SkeletonRow({
  labelWidth,
  valueWidth,
}: {
  labelWidth: number;
  valueWidth: number;
}) {
  return (
    <div
      className="flex items-center gap-2"
      style={{ fontFamily: typography.fontFamily }}
    >
      <div
        className="h-3 rounded bg-gray-700/40 animate-pulse"
        style={{ width: `${labelWidth}px` }}
      />
      <div
        className="h-3 rounded bg-gray-700/30 animate-pulse"
        style={{ width: `${valueWidth}px` }}
      />
    </div>
  );
}

function SectionCardSkeleton({
  title,
  rows,
}: {
  title: string;
  rows: { label: number; value: number }[];
}) {
  return (
    <div style={{ border: borders.default, borderRadius: "1px" }}>
      <div
        className="px-4 py-2"
        style={{
          borderBottom: borders.default,
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.lg,
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          opacity: 0.9,
        }}
      >
        {title}
      </div>
      <div className="px-4 py-3 flex flex-col gap-5">
        {rows.map((row, i) => (
          <SkeletonRow key={i} labelWidth={row.label} valueWidth={row.value} />
        ))}
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <ScreenContainer>
      <div className="flex flex-col gap-4">
        <SectionCardSkeleton
          title="Perfil"
          rows={[
            { label: 72, value: 80 }, // Username: coldpalmer
            { label: 48, value: 10 }, // Avatar: —
            { label: 96, value: 130 }, // Recovery code: MW26-IX24-29VB + botón
          ]}
        />
        <SectionCardSkeleton
          title="Estadisticas"
          rows={[
            { label: 140, value: 60 }, // Posicion en la tabla: null de 6
            { label: 52, value: 16 }, // Puntos: 0
            { label: 148, value: 16 }, // Predicciones exactas: 0
          ]}
        />
        <SectionCardSkeleton
          title="Predicciones Del Torneo"
          rows={[
            { label: 64, value: 70 }, // Campeon
            { label: 80, value: 48 }, // Subcampeon
            { label: 72, value: 16 }, // Final Home
            { label: 72, value: 16 }, // Final Away
            { label: 112, value: 60 }, // Equipo Sorpresa
            { label: 120, value: 56 }, // Equipo Decepcion
            { label: 36, value: 16 }, // MVP
            { label: 80, value: 70 }, // Bota de oro
            { label: 108, value: 70 }, // Mejor Arquero
            { label: 72, value: 70 }, // Revelacion
          ]}
        />
      </div>
    </ScreenContainer>
  );
}
