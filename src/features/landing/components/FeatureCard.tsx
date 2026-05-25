import { spacing, typography } from "@/shared/constants/designSystem";

interface FeatureCardProps {
  step: number;
  title: string;
}

export function FeatureCard({ step, title }: FeatureCardProps) {
  return (
    <div
      className="flex items-center gap-4 md:gap-8 pb-1"
      style={{
        marginBottom: spacing.xl,
      }}
    >
      {/* Text content - MÁS GRANDE */}
      <div className="flex-1">
        <p
          className="text-lg md:text-2xl leading-relaxed"
          style={{ fontFamily: typography.fontFamily }}
        >
          <span className="font-bold">{step}.</span> {title}
        </p>
      </div>
    </div>
  );
}
