"use server";

import { v4 as uuid } from "uuid";
import { prisma } from "@/lib/prisma";
import {
  createUserSchema,
  type CreateUserInput,
} from "@/features/auth/schemas/createUserSchema";

export async function createUser(input: CreateUserInput) {
  // Validación
  const parsed = createUserSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  // Check duplicado
  const existingUser = await prisma.user.findUnique({
    where: { name: parsed.data.username },
  });

  if (existingUser) {
    return {
      success: false,
      error: { username: ["Username already taken"] },
    };
  }

  // Crear usuario
  const user = await prisma.user.create({
    data: {
      id: uuid(),
      name: parsed.data.username,
      recoveryKey: parsed.data.recoveryCode,
      // 👇 Si tenés más campos en el modelo, podés agregarlos acá
      // avatar: parsed.data.avatar,
    },
  });

  return {
    success: true,
    user,
  };
}
