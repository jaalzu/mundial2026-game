import { LoginForm } from "@/features/auth/components/LoginForm";
import { ScreenContainer } from "@/shared/components/ui/ScreenContainer";
import { Logo } from "@/shared/components/ui/Logo";

export default function LoginPage() {
  return (
    <ScreenContainer padding="spacious">
      <header className="mb-12">
        <Logo />
      </header>

      <LoginForm />
    </ScreenContainer>
  );
}
