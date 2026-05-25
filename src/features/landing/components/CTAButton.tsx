"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/Button";

export function CTAButton() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/create-user")}>
      Comenzar a jugar!
      <span className="text-xl">⚽</span>
    </Button>
  );
}
