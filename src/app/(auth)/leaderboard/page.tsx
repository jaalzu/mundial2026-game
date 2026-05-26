import { getLeaderboard } from "@/features/leaderboard/queries/getLeaderboard";
import { getAuthenticatedUser } from "@/features/auth/utils/getAuthenticatedUser";
import { LeaderboardTable } from "@/features/leaderboard/components/LeaderboardTable";
import { typography } from "@/shared/constants/designSystem";

export default async function LeaderboardPage() {
  const [leaderboard, currentUser] = await Promise.all([
    getLeaderboard(),
    getAuthenticatedUser(),
  ]);

  return (
    <div className=" py-3 max-w-[500px] mx-auto">
      {/* Title */}
      <h1
        className="text-3xl md:text-4xl font-bold uppercase mb-4 px-2"
        style={{ fontFamily: typography.fontFamily }}
      >
        Leaderboard
      </h1>

      {/* Table */}
      <LeaderboardTable entries={leaderboard} currentUserId={currentUser?.id} />
    </div>
  );
}
