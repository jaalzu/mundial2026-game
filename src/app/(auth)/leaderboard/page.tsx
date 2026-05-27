import { getAuthenticatedUser } from "@/features/auth/utils/getAuthenticatedUser";
import { getLeaderboard } from "@/features/leaderboard/actions/getLeaderboard";
import { LeaderboardContent } from "@/features/leaderboard/components/LeaderboardContent";
import { redirect } from "next/navigation";
export const revalidate = 300;
export default async function LeaderboardPage() {
  const [currentUser, leaderboard] = await Promise.all([
    getAuthenticatedUser(),
    getLeaderboard(),
  ]);

  if (!currentUser) redirect("/landing");

  return (
    <LeaderboardContent entries={leaderboard} currentUserId={currentUser.id} />
  );
}
