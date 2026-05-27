import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export const getAuthenticatedUser = cache(async () => {
  const supabase = await createClient();

  console.time("auth.getUser");
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  console.timeEnd("auth.getUser");

  if (!authUser) return null;

  const userId = authUser.user_metadata?.user_id;
  if (!userId) return null;

  console.time("prisma.findUser");
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, avatarPlayerId: true, createdAt: true },
  });
  console.timeEnd("prisma.findUser");

  return user;
});
