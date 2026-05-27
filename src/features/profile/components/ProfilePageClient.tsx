"use client";

import { Suspense } from "react";
import { ProfileContent } from "./ProfileContent";

type ProfilePageClientProps = {
  userId: string;
  userName: string;
  avatarPlayerId: string | null;
};

export function ProfilePageClient({
  userId,
  userName,
  avatarPlayerId,
}: ProfilePageClientProps) {
  return (
    <Suspense fallback={<div>Cargando perfil...</div>}>
      <ProfileContent
        userId={userId}
        userName={userName}
        avatarPlayerId={avatarPlayerId}
      />
    </Suspense>
  );
}
