// ProfilePageServer.tsx
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/features/auth/utils/getAuthenticatedUser";
import { ScreenContainer } from "@/shared/components/ui/ScreenContainer";
import { ProfileContent } from "./ProfileContent";
import { getProfileData } from "../actions/getProfileData";
import { prisma } from "@/lib/prisma";

export async function ProfilePageServer() {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/landing");

  const [dbUser, profileData] = await Promise.all([
    prisma.user.findUnique({
      where: { id: user.id },
      select: { recoveryKey: true },
    }),
    getProfileData(user.id),
  ]);

  return (
    <ScreenContainer>
      <div className="py-4">
        <ProfileContent
          userId={user.id}
          userName={user.name}
          avatarPlayerId={user.avatarPlayerId}
          recoveryKey={dbUser?.recoveryKey || ""}
          profileData={profileData}
        />
      </div>
    </ScreenContainer>
  );
}
