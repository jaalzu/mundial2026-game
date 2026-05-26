import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/features/auth/utils/getAuthenticatedUser";
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

  if (!user) {
    redirect("/landing");
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      <Nav />

      {/* Main content con padding bottom para el BottomTabs */}
      <main
        className="pb-24" // ← Padding bottom para que el contenido no quede tapado por tabs
        style={{
          minHeight: "calc(100vh - 80px)", // Nav height aproximado
        }}
      >
        {children}
      </main>

      <BottomTabs />
    </div>
  );
}
