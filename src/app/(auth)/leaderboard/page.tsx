import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/features/auth/utils/getAuthenticatedUser";
import { LeaderboardContent } from "@/features/leaderboard/components/LeaderboardContent";

export default async function LeaderboardPage() {
  const currentUser = await getAuthenticatedUser();
  if (!currentUser) redirect("/landing");

  return <LeaderboardContent currentUserId={currentUser.id} />;
}
