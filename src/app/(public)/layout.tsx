import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/shared/utils/getAuthenticatedUser";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export default async function PublicLayout({ children }: PublicLayoutProps) {
  const user = await getAuthenticatedUser();

  if (user) {
    redirect("/leaderboard");
  }

  return <>{children}</>;
}
