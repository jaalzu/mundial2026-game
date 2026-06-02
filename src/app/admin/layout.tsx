import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/shared/utils/getAuthenticatedUser";
import { colors } from "@/shared/constants/designSystem";

const ADMIN_USER_IDS =
  process.env.ADMIN_USER_IDS?.split(",").map((id) => id.trim()) ?? [];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();

  if (!user || !ADMIN_USER_IDS.includes(user.id)) {
    redirect("/landing");
  }

  return (
    <div
      className="min-h-screen p-4"
      style={{ backgroundColor: colors.background }}
    >
      {children}
    </div>
  );
}
