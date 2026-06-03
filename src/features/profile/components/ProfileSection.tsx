import { SectionCard } from "./SectionCard";
import { DataRow } from "./DataRow";
import { RecoveryCodeRow } from "./RecoveryCodeRow";
import type { ProfileUser } from "../types";
import { getAvatarPlayer } from "@/shared/constants/avatarPlayers";

type ProfileSectionProps = {
  user: ProfileUser;
};

export function ProfileSection({ user }: ProfileSectionProps) {
  const avatarDisplayName = getAvatarPlayer(user.avatarPlayerId)?.name ?? "—";

  return (
    <SectionCard title="Perfil">
      <DataRow label="Username" value={user.name} />
      <DataRow label="Avatar" value={avatarDisplayName} />
      <RecoveryCodeRow code={user.recoveryKey} />
    </SectionCard>
  );
}
