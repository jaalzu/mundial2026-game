import { borders, colors, typography } from "@/shared/constants/designSystem";

type SectionCardProps = {
  title: string;
  children: React.ReactNode;
};

export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div style={{ border: borders.light, borderRadius: "4px" }}>
      <div
        className="px-4 py-3"
        style={{
          borderBottom: borders.light,
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.md,
          fontWeight: "bold",
          color: colors.text,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </div>
      <div className="px-4 py-3 flex flex-col gap-3">{children}</div>
    </div>
  );
}
