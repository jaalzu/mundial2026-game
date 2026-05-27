"use client";

import { ProfileSection } from "./ProfileSection";
import { StatsSection } from "./StatsSection";
import { TournamentPredictionsSection } from "./TournamentPredictionsSection";
import { useProfileData } from "../hooks/useProfileData";
import { colors, typography } from "@/shared/constants/designSystem";

type ProfileContentProps = {
  userId: string;
  userName: string;
  avatarPlayerId: string | null;
};

/**
 * Componente que maneja toda la lógica de traer datos via hook.
 * La page.tsx lo llama y pasa el userId.
 *
 * Este componente:
 * - Llama useProfileData() que cachea con TanStack Query
 * - Maneja loading/error states
 * - Renderiza los componentes dumb
 */
export function ProfileContent({
  userId,
  userName,
  avatarPlayerId,
}: ProfileContentProps) {
  const { stats, predictions, recoveryKey, isLoading, error } =
    useProfileData(userId);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
          fontFamily: typography.fontFamily,
          color: colors.text,
        }}
      >
        Cargando perfil...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "16px",
          fontFamily: typography.fontFamily,
          color: colors.secondary,
          fontSize: typography.sizes.sm,
        }}
      >
        Error al cargar perfil. Mostrando datos en caché...
      </div>
    );
  }

  const profileUser = {
    id: userId,
    name: userName,
    avatarPlayerId,
    recoveryKey,
  };

  return (
    <div className="flex flex-col gap-4">
      <ProfileSection user={profileUser} />
      <StatsSection stats={stats} />
      <TournamentPredictionsSection predictions={predictions} />

      <p
        style={{
          fontFamily: typography.fontFamily,
          fontSize: "10px",
          color: colors.text,
          opacity: 0.4,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        para informar sobre bugs o feedback podés comunicarte a este correo:{" "}
        <span style={{ color: colors.primary, opacity: 1 }}>
          javieraizuu@gmail.com
        </span>
      </p>
    </div>
  );
}
