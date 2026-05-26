import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/features/auth/utils/getAuthenticatedUser";
import { ScreenContainer } from "@/shared/components/ui/ScreenContainer";
import { colors, typography } from "@/shared/constants/designSystem";
import { ProfileSection } from "@/features/profile/components/ProfileSection";
import { StatsSection } from "@/features/profile/components/StatsSection";
import { TournamentPredictions } from "@/features/profile/components/TournamentPredictions";
import {
  getMockStats,
  getMockTournamentPredictions,
  MOCK_RECOVERY_CODE,
} from "@/features/profile/data/mockProfileData";

export default async function ProfilePage() {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/landing");

  // TODO: reemplazar con queries reales
  // const stats = await getUserStats(user.id);
  // const predictions = await getTournamentPredictions(user.id);
  // const recoveryCode = await getRecoveryCode(user.id);
  const stats = getMockStats();
  const predictions = getMockTournamentPredictions();

  const profileUser = {
    id: user.id,
    name: user.name,
    avatarPlayerId: user.avatarPlayerId,
    recoveryCode: MOCK_RECOVERY_CODE,
  };

  return (
    <ScreenContainer>
      <div className="flex flex-col gap-4 ">
        <ProfileSection user={profileUser} />
        <StatsSection stats={stats} />
        <TournamentPredictions predictions={predictions} />

        <p
          style={{
            fontFamily: typography.fontFamily,
            fontSize: "11px",
            color: colors.text,
            opacity: 0.8,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          para informar sobre bugs o feedback podés comunicarte a este correo:{" "}
          javieraizuu@gmail.com
        </p>
      </div>
    </ScreenContainer>
  );
}
