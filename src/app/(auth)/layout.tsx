// app/(protected)/layout.tsx
export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/shared/utils/getAuthenticatedUser";
import { Nav } from "@/shared/components/layout/Nav";
import { BottomTabs } from "@/shared/components/layout/BottomTabs";
import { colors } from "@/shared/constants/designSystem";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/landing");

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <Nav userName={user.name} />
      <main className="pb-24" style={{ minHeight: "calc(100vh - 80px)" }}>
        {children}
      </main>
      <BottomTabs />
    </div>
  );
}
