"use server";

import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/features/auth/utils/getAuthenticatedUser";

export async function getRecoveryKey() {
  const user = await getAuthenticatedUser();
  if (!user) throw new Error("Not authenticated");

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { recoveryKey: true },
  });

  if (!dbUser) throw new Error("User not found");

  return { recoveryKey: dbUser.recoveryKey };
}
