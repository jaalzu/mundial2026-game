import { getAuthenticatedUser } from "@/shared/utils/getAuthenticatedUser";
import { getMatches } from "@/features/matches/actions/getMatches";
import { getUserPredictions } from "@/features/predictions/actions/getUserPredictions";
import { getTournamentPrediction } from "@/features/predictions/actions/getTournamentPrediction";
import { PredictionsContent } from "@/features/predictions/components/PredictionsContent";
import { MOCK_PLAYERS } from "@/features/predictions/utils/mockTournamentData";
import { redirect } from "next/navigation";

export async function PredictionsLoader() {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/landing");

  const [groups, predictionsResult, tournamentResult] = await Promise.all([
    getMatches(),
    getUserPredictions(user.id),
    getTournamentPrediction(user.id),
  ]);

  const initialPredictions = predictionsResult.success
    ? predictionsResult.data
    : {};

  const initialTournament = tournamentResult.success
    ? tournamentResult.data
    : null;

  // Extraer los 48 equipos únicos de los partidos ya cargados — sin query extra
  const teams = Array.from(
    new Map(
      groups
        .flatMap((g) => g.matches)
        .flatMap((m) => [m.homeTeam, m.awayTeam])
        .map((t) => [t.id, t]),
    ).values(),
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <PredictionsContent
      userId={user.id}
      groups={groups}
      initialPredictions={initialPredictions}
      initialTournament={initialTournament}
      teams={teams}
      players={MOCK_PLAYERS}
    />
  );
}
