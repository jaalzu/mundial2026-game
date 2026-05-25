"use client";

import { useState } from "react";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { loginWithRecoveryCode } from "@/features/auth/actions/loginWithRecoveryCode";
import { typography } from "@/shared/constants/designSystem";

export function LoginForm() {
  const [recoveryCode, setRecoveryCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    setError("");
    setIsLoading(true);

    const result = await loginWithRecoveryCode(recoveryCode);

    if (!result.success) {
      setError(result.error);
      setIsLoading(false);
    }
    // Si es success, el redirect ya se ejecutó en el server action
  }

  const isValid = recoveryCode.trim().length > 0;

  return (
    <div className="mt-7 flex flex-1 flex-col max-w-md mx-auto">
      <h1
        className="text-3xl md:text-4xl font-bold uppercase mb-4"
        style={{ fontFamily: typography.fontFamily }}
      >
        Iniciar sesión
      </h1>

      <p
        className="text-lg md:text-xl text-[#BCBCBC] mb-8"
        style={{ fontFamily: typography.fontFamily }}
      >
        Ingresá tu código de recuperación para acceder a tu cuenta.
      </p>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Código de recuperación"
          value={recoveryCode}
          onChange={(e) => setRecoveryCode(e.target.value)}
          isCompleted={isValid}
          error={error}
          autoComplete="off"
          disabled={isLoading}
        />
      </div>

      <Button onClick={handleSubmit} disabled={!isValid} isLoading={isLoading}>
        Ingresar
      </Button>
    </div>
  );
}
