"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { borders, typography } from "@/shared/constants/designSystem";

const tabs = [
  { label: "PREDICCIONES", href: "/predictions" },
  { label: "LEADERBOARD", href: "/leaderboard" },
  { label: "PERFIL", href: "/profile" },
];

export function BottomTabs() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0  z-50">
      <div className="mx-auto max-w-[500px] flex ">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex-1 text-center transition-colors"
              style={{
                padding: "20px 0px",
                border: isActive ? "3px solid #3CAC3B" : borders.default,
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.lg,
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "#FFFFFF" : "#BCBCBC",
              }}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
