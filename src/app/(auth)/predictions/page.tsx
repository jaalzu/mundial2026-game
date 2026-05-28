import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/shared/utils/getAuthenticatedUser";
import { PredictionsContent } from "@/features/predictions/components/PredictionsContent";

export const revalidate = 0; // predictions are user-specific, never cache at page level

export default async function PredictionsPage() {
  const currentUser = await getAuthenticatedUser();
  if (!currentUser) redirect("/landing");

  return <PredictionsContent userId={currentUser.id} />;
}
