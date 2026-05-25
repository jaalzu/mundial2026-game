import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function getAuthenticatedUser() {
  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return null;
  }

  // Obtener user_id del metadata
  const userId = authUser.user_metadata?.user_id;

  if (!userId) {
    return null;
  }

  // Buscar usuario en DB
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      avatarPlayerId: true,
      createdAt: true,
    },
  });

  return user;
}
