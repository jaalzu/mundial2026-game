"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import {
  createUserSchema,
  type CreateUserInput,
} from "@/features/auth/schemas/createUserSchema";

export function useOnboardingForm() {
  return useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),

    defaultValues: {
      username: "",
      avatar: "",
      recoveryCode: "",
    },

    mode: "onChange",
  });
}
