import { ProfileSection } from "./ProfileSection";
import { StatsSection } from "./StatsSection";
import { TournamentPredictionsSection } from "./TournamentPredictionsSection";
import { resolveTournamentPredictionDisplay } from "../utils/resolveTournamentPredictionDisplay";
import { getMockStats } from "../data/mockProfileData";
import { colors, typography } from "@/shared/constants/designSystem";
import type { getProfileData } from "../actions/getProfileData";

type ProfileContentProps = {
  userId: string;
  userName: string;
  avatarPlayerId: string | null;
  recoveryKey: string;
  profileData: Awaited<ReturnType<typeof getProfileData>>;
};

export function ProfileContent({
  userId,
  userName,
  avatarPlayerId,
  recoveryKey,
  profileData,
}: ProfileContentProps) {
  const stats = profileData?.stats ?? getMockStats();
  const predictions = resolveTournamentPredictionDisplay(
    profileData?.prediction ?? null,
  );

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
          opacity: 0.7,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        para informar sobre bugs o feedback podés comunicarte a este correo:{" "}
        javieraizuu@gmail.com
      </p>
    </div>
  );
}
