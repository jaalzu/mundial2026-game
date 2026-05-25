"use server";

import { v4 as uuid } from "uuid";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

import {
  createUserSchema,
  type CreateUserInput,
} from "@/features/auth/schemas/createUserSchema";

export async function createUser(input: CreateUserInput) {
  const parsed = createUserSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { name: parsed.data.username },
  });

  if (existingUser) {
    return {
      success: false,
      error: { username: ["Username already taken"] },
    };
  }

  const userId = uuid();
  const supabase = await createClient();

  // Crear usuario anónimo en Supabase Auth
  const { error: authError } = await supabase.auth.signInAnonymously({
    options: {
      data: {
        user_id: userId,
        username: parsed.data.username,
      },
    },
  });

  if (authError) {
    console.error("Supabase Auth error:", authError);
    return {
      success: false,
      error: { _form: ["Failed to create session"] },
    };
  }

  // Crear usuario en DB
  try {
    await prisma.user.create({
      data: {
        id: userId,
        name: parsed.data.username,
        recoveryKey: parsed.data.recoveryCode,
        avatarPlayerId: parsed.data.avatar || null,
      },
    });

    redirect("/leaderboard");
  } catch (error) {
    console.error("DB error:", error);

    return {
      success: false,
      error: { _form: ["Failed to create user"] },
    };
  }
}
