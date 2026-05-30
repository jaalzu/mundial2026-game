"use client";

import { useState, useRef, useEffect, useId } from "react";
import type { TeamOption } from "../../models/types";
import { Flag } from "@/shared/constants/flags";
import { getTeamNameEs } from "@/shared/utils/teamNames";
import { colors, borders, typography } from "@/shared/constants/designSystem";

interface TeamSelectorProps {
  teams: TeamOption[];
  value: string | null;
  onChange: (teamId: string | null) => void;
  isActive: boolean;
  onActivate: () => void;
}

export function TeamSelector({
  teams,
  value,
  onChange,
  isActive,
  onActivate,
}: TeamSelectorProps) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedTeam = teams.find((t) => t.id === value) ?? null;

  const filtered = query.trim()
    ? teams.filter((t) =>
        getTeamNameEs(t.code, t.name)
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
    : teams;

  // Focus input when card activates
  useEffect(() => {
    if (isActive) inputRef.current?.focus();
  }, [isActive]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isActive) return;
    const handler = (e: MouseEvent) => {
      if (
        !listRef.current?.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isActive]);

  const handleSelect = (team: TeamOption) => {
    onChange(team.id);
    setQuery("");
  };

  const showDropdown = isActive && (query.length > 0 || filtered.length > 0);

  return (
    <div className="relative w-full " onClick={onActivate}>
      {/* Input */}
      <div
        className="flex items-center gap-2 px-2 py-3 "
        style={{
          border: isActive ? borders.light : borders.default,
          backgroundColor: colors.background,
        }}
      >
        {selectedTeam ? (
          <>
            <div
              style={{ width: "32px", height: "22px", flexShrink: 0 }}
              className="flex items-center"
            >
              <Flag
                code={selectedTeam.code}
                className="w-full h-full object-cover block"
              />
            </div>
            <span
              className="flex-1 "
              style={{
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.md,
                color: colors.text,
              }}
            >
              {getTeamNameEs(selectedTeam.code, selectedTeam.name)}
            </span>
            {/* Check */}
            <span
              style={{ color: colors.primary, fontSize: typography.sizes.md }}
            >
              ✓
            </span>
          </>
        ) : (
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar selección..."
            className="flex-1  outline-none bg-transparent"
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.sm,
              color: colors.text,
              caretColor: colors.primary,
            }}
          />
        )}

        {/* Clear selected */}
        {selectedTeam && isActive && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
            style={{ color: colors.mutedText, fontSize: typography.sizes.xs }}
          >
            ✕
          </button>
        )}

        {/* Search icon when selected but not active */}
        {!selectedTeam && !isActive && (
          <span
            style={{ color: colors.mutedText, fontSize: typography.sizes.xs }}
          >
            ↓
          </span>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && !selectedTeam && (
        <div
          ref={listRef}
          className="absolute z-50 w-full overflow-y-auto"
          style={{
            top: "100%",
            left: 0,
            maxHeight: "250px",
            border: borders.light,
            backgroundColor: colors.background,
            scrollbarWidth: "none",
          }}
        >
          {filtered.length === 0 ? (
            <div
              className="px-3 py-2"
              style={{
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.sm,
                color: colors.mutedText,
              }}
            >
              Sin resultados
            </div>
          ) : (
            filtered.map((team) => (
              <button
                key={team.id}
                onClick={() => handleSelect(team)}
                className="flex items-center gap-3 w-full px-3 py-2 text-left transition-opacity hover:opacity-70"
                style={{ backgroundColor: colors.background }}
              >
                <div
                  style={{ width: "24px", height: "17px", flexShrink: 0 }}
                  className="flex items-center"
                >
                  <Flag
                    code={team.code}
                    className="w-full h-full object-cover block"
                  />
                </div>
                <span
                  style={{
                    fontFamily: typography.fontFamily,
                    fontSize: typography.sizes.sm,
                    color: colors.text,
                  }}
                >
                  {getTeamNameEs(team.code, team.name)}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
