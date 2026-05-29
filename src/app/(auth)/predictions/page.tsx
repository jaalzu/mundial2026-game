// src/app/(auth)/predictions/page.tsx
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/shared/utils/getAuthenticatedUser";
import { getMatches } from "@/features/matches/actions/getMatches";
import { PredictionsContent } from "@/features/predictions/components/PredictionsContent";

export default async function PredictionsPage() {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/landing");

  const groups = await getMatches();
  return <PredictionsContent groups={groups} userId={user.id} />;
}
