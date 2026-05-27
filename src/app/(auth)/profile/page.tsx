import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/features/auth/utils/getAuthenticatedUser";
import { ScreenContainer } from "@/shared/components/ui/ScreenContainer";
import { ProfilePageClient } from "@/features/profile/components/ProfilePageClient";

export default async function ProfilePage() {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/landing");

  return (
    <ScreenContainer>
      <div className="py-4">
        <ProfilePageClient
          userId={user.id}
          userName={user.name}
          avatarPlayerId={user.avatarPlayerId}
        />
      </div>
    </ScreenContainer>
  );
}
