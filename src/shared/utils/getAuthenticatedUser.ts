// src/features/auth/utils/getAuthenticatedUser.ts
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export const getAuthenticatedUser = cache(async () => {
  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  if (!authUser) return null;

  const userId = authUser.user_metadata?.user_id;
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      avatarPlayerId: true,
      recoveryKey: true,
      createdAt: true,
    },
  });

  return user;
});
