import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/shared/utils/getAuthenticatedUser";
import { Nav } from "@/shared/components/layout/Nav";
import { BottomTabs } from "@/shared/components/layout/BottomTabs";
import { WelcomeBanner } from "@/shared/components/layout/WelcomeBanner";
import { colors } from "@/shared/constants/designSystem";
import { getNextMatch } from "@/shared/data/getNextMatch";
import { getLeaderboard } from "@/features/leaderboard/actions/getLeaderboard";

type ProtectedLayoutProps = {
  children: React.ReactNode;
};

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const [user, nextMatch, leaderboard] = await Promise.all([
    getAuthenticatedUser(),
    getNextMatch(),
    getLeaderboard(),
  ]);
  if (!user) redirect("/landing");

  const winner = leaderboard[0];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      {/* Columna centrada, ancho fijo tipo mobile en desktop */}
      <div
        className="mx-auto w-full max-w-[800px] border-x"
        style={{ borderColor: "rgba(128,128,128,0.12)" }}
      >
        <Nav nextMatch={nextMatch} />
        {winner && <WelcomeBanner winnerName={winner.username} />}

        <main className="pb-24" style={{ minHeight: "calc(100vh - 80px)" }}>
          {children}
        </main>
      </div>

      <BottomTabs />
    </div>
  );
}
