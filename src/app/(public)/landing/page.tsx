import { ScreenContainer } from "@/shared/components/ui/ScreenContainer";
import { Logo } from "@/shared/components/ui/Logo";
import { HeroSection } from "@/features/landing/components/HeroSection";
import { FeatureCard } from "@/features/landing/components/FeatureCard";
import { CTASection } from "@/features/landing/components/CTASection";
import { spacing, typography } from "@/shared/constants/designSystem";
import Link from "next/link";

export default function LandingPage() {
  return (
    <ScreenContainer padding="minimal">
      {/* Header with Logo */}
      <header className="mb-10 flex items-center justify-between">
        <Logo />
        <Link
          href="/login"
          className="text-base md:text-lg text-[#BCBCBC] hover:text-white transition-colors underline"
          style={{ fontFamily: typography.fontFamily }}
        >
          Iniciar sesión
        </Link>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section style={{ marginTop: spacing.xl, marginBottom: spacing.xl }}>
        <FeatureCard step={1} title="Crea tu usuario en tres simples pasos." />
        <FeatureCard step={2} title="Anota tus predicciones para el mundial" />
        <FeatureCard
          step={3}
          title="Competí contra otros expertos en la tabla general."
        />
      </section>

      {/* CTA Section */}
      <CTASection />
    </ScreenContainer>
  );
}
