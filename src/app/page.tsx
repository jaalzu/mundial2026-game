import { redirect } from "next/navigation";

export default function Page() {
  const hasSession = false;

  if (hasSession) {
    redirect("/leaderboard");
  }

  redirect("/landing");
}
