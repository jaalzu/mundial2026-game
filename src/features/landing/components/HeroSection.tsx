import { colors, typography, spacing } from "@/shared/constants/designSystem";
import { CTAButton } from "./CTAButton";

export function HeroSection() {
  return (
    <section className="text-center pb-6" style={{ marginTop: spacing.xl }}>
      {/* Tournament label - COLORES RGB */}
      <p
        className=" text-base md:text-xl  uppercase"
        style={{ fontFamily: typography.fontFamily, color: colors.mutedText }}
      >
        <span>MUNDIAL 2026 FIXTURE GAME</span>
      </p>

      {/* Main headline */}
      <h2
        className="mb-6 text-3xl md:text-4xl font-bold leading-tight"
        style={{
          fontFamily: typography.fontFamily,
        }}
      >
        Demostrá quién sabe más de fútbol en el torneo más importante del mundo.
      </h2>

      <div className="my-4 text-center">
        <CTAButton />
      </div>
    </section>
  );
}
