"use client";

import { Logo } from "@/shared/components/ui/Logo";
import { typography, colors } from "@/shared/constants/designSystem";
import { useEffect, useState } from "react";

// Mundial arranca el 11 de junio de 2026
const WORLD_CUP_DATE = new Date("2026-06-11T00:00:00-05:00");

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const update = () => {
      const diff = WORLD_CUP_DATE.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("¡Ya empezó!");
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${days}d:${hours}h:${mins}m:${secs}s`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

export function Nav() {
  const countdown = useCountdown();

  return (
    <header className="flex items-center justify-between px-6 py-4 md:px-8 md:py-6">
      <Logo />
      <p
        style={{
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.lg,
          color: colors.primary,
          letterSpacing: "0.04em",
        }}
      >
        {countdown}
      </p>
    </header>
  );
}
