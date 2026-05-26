import { Logo } from "@/shared/components/ui/Logo";
import { getAuthenticatedUser } from "@/features/auth/utils/getAuthenticatedUser";
import { typography } from "@/shared/constants/designSystem";

export async function Nav() {
  const user = await getAuthenticatedUser();

  return (
    <header className="flex items-center justify-between px-6 py-4 md:px-8 md:py-6">
      <Logo />

      {user && (
        <p
          className="text-base md:text-lg text-white font-bold"
          style={{ fontFamily: typography.fontFamily }}
        >
          {user.name}
        </p>
      )}
    </header>
  );
}
