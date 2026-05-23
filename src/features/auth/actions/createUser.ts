"use server";

import { v4 as uuid } from "uuid";

import { prisma } from "@/lib/prisma";

import {
  createUserSchema,
  type CreateUserInput,
} from "@/features/auth/schemas/createUserSchema";

export async function createUser(input: CreateUserInput) {
  const parsed = createUserSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      name: parsed.data.username,
    },
  });

  if (existingUser) {
    return {
      success: false,
    };
  }

  const user = await prisma.user.create({
    data: {
      id: uuid(),

      name: parsed.data.username,

      recoveryKey: parsed.data.recoveryCode,
    },
  });

  return {
    success: true,
    user,
  };
}
