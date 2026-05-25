import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/features/auth/utils/getAuthenticatedUser";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export default async function PublicLayout({ children }: PublicLayoutProps) {
  const user = await getAuthenticatedUser();

  // Si ya está logueado, no puede entrar a landing/login
  if (user) {
    redirect("/leaderboard");
  }

  return <>{children}</>;
}
