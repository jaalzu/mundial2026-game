// PredictionsLoader
import { getAuthenticatedUser } from "@/shared/utils/getAuthenticatedUser";
import { getMatches } from "@/shared/data/getMatches";
import { getPlayers } from "@/shared/data/getPlayers";
import { getTeams } from "@/shared/data/getTeams";
import { getUserPredictions } from "@/features/predictions/actions/getUserPredictions";
import { getTournamentPrediction } from "@/features/predictions/actions/getTournamentPrediction";
import { PredictionsContent } from "@/features/predictions/components/PredictionsContent";
import { redirect } from "next/navigation";

export async function PredictionsLoader() {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/landing");

  const [groups, players, teams, predictionsResult, tournamentResult] =
    await Promise.all([
      getMatches(),
      getPlayers(),
      getTeams(),
      getUserPredictions(user.id),
      getTournamentPrediction(user.id),
    ]);

  const initialPredictions = predictionsResult.success
    ? predictionsResult.data
    : {};

  const initialTournament = tournamentResult.success
    ? tournamentResult.data
    : null;

  return (
    <PredictionsContent
      userId={user.id}
      groups={groups}
      initialPredictions={initialPredictions}
      initialTournament={initialTournament}
      teams={teams}
      players={players}
    />
  );
}
