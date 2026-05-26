import { borders, colors, typography } from "@/shared/constants/designSystem";

type SectionCardProps = {
  title: string;
  children: React.ReactNode;
};

export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div style={{ border: borders.default, borderRadius: "4px" }}>
      <div
        className="px-4 py-2"
        style={{
          borderBottom: borders.default,
          fontFamily: typography.fontFamily,
          fontSize: typography.sizes.lg,
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
