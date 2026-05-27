import { colors, typography } from "@/shared/constants/designSystem";

type DataRowProps = {
  label: string;
  value: string | React.ReactNode;
  valueHighlight?: boolean;
};

export function DataRow({
  label,
  value,
  valueHighlight = false,
}: DataRowProps) {
  return (
    <div
      className="flex items-center gap-2"
      style={{
        fontFamily: typography.fontFamily,
        fontSize: typography.sizes.md,
        color: colors.text,
      }}
    >
      <span style={{ opacity: 0.8 }}>{label}:</span>
      <span
        style={{
          color: valueHighlight ? colors.primary : colors.text,
          fontWeight: valueHighlight ? "bold" : "normal",
        }}
      >
        {value}
      </span>
    </div>
  );
}
