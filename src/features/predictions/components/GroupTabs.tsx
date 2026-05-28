"use client";

import { useRef } from "react";
import { colors, borders, typography } from "@/shared/constants/designSystem";

interface GroupTabsProps {
  groups: string[];
  activeGroup: string;
  onSelectGroup: (group: string) => void;
}

export function GroupTabs({
  groups,
  activeGroup,
  onSelectGroup,
}: GroupTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSelect = (group: string) => {
    onSelectGroup(group);
    const el = scrollRef.current?.querySelector(`[data-group="${group}"]`);
    el?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto gap-4 mx-3 mb-4"
      style={{ scrollbarWidth: "none" }}
    >
      {groups.map((group) => {
        const isActive = activeGroup === group;
        return (
          <button
            key={group}
            data-group={group}
            onClick={() => handleSelect(group)}
            className="flex-shrink-0 px-3 py-1 transition-all "
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.md,
              fontWeight: isActive ? 700 : 400,
              color: isActive ? colors.text : colors.mutedText,
              border: isActive ? "2px solid #3CAC3B" : "2px solid #666666",

              backgroundColor: colors.background,
            }}
          >
            Grupo {group}
          </button>
        );
      })}
    </div>
  );
}
