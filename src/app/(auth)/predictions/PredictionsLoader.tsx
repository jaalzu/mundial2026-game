import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/shared/utils/getAuthenticatedUser";
import { getMatches } from "@/features/matches/actions/getMatches";
import { getUserPredictions } from "@/features/predictions/actions/getUserPredictions";
import { PredictionsContent } from "@/features/predictions/components/PredictionsContent";

/**
 * Async server component that fetches all predictions data in parallel.
 * Extracted so the parent page can wrap it in <Suspense>.
 */
export async function PredictionsLoader() {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/landing");

  // Fetch matches and existing predictions in parallel
  const [groups, predictionsResult] = await Promise.all([
    getMatches(),
    getUserPredictions(user.id),
  ]);

  const initialPredictions = predictionsResult.success
    ? predictionsResult.data
    : {};

  return (
    <PredictionsContent
      userId={user.id}
      groups={groups}
      initialPredictions={initialPredictions}
    />
  );
}
