import { SectionCard } from "./SectionCard";
import { DataRow } from "./DataRow";
import { RecoveryCodeRow } from "./RecoveryCodeRow";
import type { ProfileUser } from "../types";

type ProfileSectionProps = {
  user: ProfileUser;
};

export function ProfileSection({ user }: ProfileSectionProps) {
  // TODO: resolver nombre display del avatar desde avatarPlayerId
  const avatarDisplayName = user.avatarPlayerId ?? "—";

  return (
    <SectionCard title="Perfil">
      <DataRow label="Username" value={user.name} />
      <DataRow label="Avatar" value={avatarDisplayName} />
      <RecoveryCodeRow code={user.recoveryCode} />
    </SectionCard>
  );
}
