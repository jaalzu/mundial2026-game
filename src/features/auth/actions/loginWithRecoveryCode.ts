"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function loginWithRecoveryCode(recoveryCode: string) {
  if (!recoveryCode || recoveryCode.trim().length === 0) {
    return {
      success: false,
      error: "Recovery code is required",
    };
  }

  // Buscar usuario por recovery key
  const user = await prisma.user.findUnique({
    where: { recoveryKey: recoveryCode.trim() },
  });

  if (!user) {
    return {
      success: false,
      error: "Invalid recovery code",
    };
  }

  const supabase = await createClient();

  // Crear sesión anónima vinculada al user_id
  const { data: authData, error: authError } =
    await supabase.auth.signInAnonymously({
      options: {
        data: {
          user_id: user.id,
          username: user.name,
        },
      },
    });

  if (authError || !authData.user) {
    console.error("Supabase Auth error:", authError);
    return {
      success: false,
      error: "Failed to create session",
    };
  }

  // Redirect automático (la sesión ya está en la cookie)
  redirect("/leaderboard");
}
