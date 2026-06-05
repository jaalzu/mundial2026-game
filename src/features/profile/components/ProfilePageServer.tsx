// ProfilePageServer.tsx
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/shared/utils/getAuthenticatedUser";
import { ScreenContainer } from "@/shared/components/ui/ScreenContainer";
import { ProfileContent } from "./ProfileContent";
import { getProfileData } from "../actions/getProfileData";

export async function ProfilePageServer() {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/landing");

  const profileData = await getProfileData(user.id);

  return (
    <ScreenContainer>
      <ProfileContent
        userId={user.id}
        userName={user.name}
        avatarPlayerId={user.avatarPlayerId}
        recoveryKey={user.recoveryKey}
        profileData={profileData}
      />
    </ScreenContainer>
  );
}
