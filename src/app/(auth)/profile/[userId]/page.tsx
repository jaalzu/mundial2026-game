import { getProfileData } from "@/features/profile/actions/getProfileData";
import { getAuthenticatedUser } from "@/shared/utils/getAuthenticatedUser";
import { ProfileContent } from "@/features/profile/components/ProfileContent";
import { ScreenContainer } from "@/shared/components/ui/ScreenContainer";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const [currentUser, targetUser, profileData] = await Promise.all([
    getAuthenticatedUser(),
    prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, avatarPlayerId: true },
    }),
    getProfileData(userId),
  ]);

  if (!currentUser) redirect("/landing");
  if (!targetUser) redirect("/leaderboard");

  // Si es tu propio perfil, redirigí al perfil normal
  if (currentUser.id === userId) redirect("/profile");

  return (
    <ScreenContainer>
      <ProfileContent
        userId={targetUser.id}
        userName={targetUser.name}
        avatarPlayerId={targetUser.avatarPlayerId}
        recoveryKey={null}
        profileData={profileData}
        isPublic
      />
    </ScreenContainer>
  );
}
