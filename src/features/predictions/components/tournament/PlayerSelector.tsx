"use client";

import { useState, useRef, useEffect, useId, useMemo } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import type { PlayerOption, PlayerPosition } from "../../models/types";
import { Flag } from "@/shared/constants/flags";
import { colors, borders, typography } from "@/shared/constants/designSystem";

const POSITION_LABEL: Record<PlayerPosition, string> = {
  GOALKEEPER: "POR",
  DEFENDER: "DEF",
  MIDFIELDER: "MED",
  FORWARD: "DEL",
};

interface PlayerSelectorProps {
  players: PlayerOption[];
  value: string | null;
  onChange: (playerId: string | null) => void;
  isActive: boolean;
  onActivate: () => void;
  /** When provided, only shows players of this position */
  filterPosition?: PlayerPosition;
}

export function PlayerSelector({
  players,
  value,
  onChange,
  isActive,
  onActivate,
  filterPosition,
}: PlayerSelectorProps) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 200);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedPlayer = players.find((p) => p.id === value) ?? null;

  const filtered = useMemo(() => {
    let pool = filterPosition
      ? players.filter((p) => p.position === filterPosition)
      : players;

    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      pool = pool.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.team.name.toLowerCase().includes(q) ||
          p.team.code.toLowerCase().includes(q),
      );
    }

    return pool;
  }, [players, filterPosition, debouncedQuery]);

  useEffect(() => {
    if (isActive) inputRef.current?.focus();
  }, [isActive]);

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

  const handleSelect = (player: PlayerOption) => {
    onChange(player.id);
    setQuery("");
  };

  const showDropdown = isActive && !selectedPlayer;

  return (
    <div className="relative w-full" onClick={onActivate}>
      {/* Input row */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{
          border: isActive ? borders.light : borders.default,
          backgroundColor: colors.background,
        }}
      >
        {selectedPlayer ? (
          <>
            <div style={{ width: "24px", height: "17px", flexShrink: 0 }}>
              <Flag
                code={selectedPlayer.team.code}
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="flex-1 truncate"
              style={{
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.sm,
                color: colors.text,
              }}
            >
              {selectedPlayer.name}
            </span>
            <span
              style={{
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.xs,
                color: colors.mutedText,
              }}
            >
              {POSITION_LABEL[selectedPlayer.position]}
            </span>
            {/* Check */}
            <span
              style={{ color: colors.primary, fontSize: typography.sizes.sm }}
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
            placeholder={
              filterPosition
                ? `Buscar ${POSITION_LABEL[filterPosition]}...`
                : "Buscar jugador..."
            }
            className="flex-1 outline-none bg-transparent"
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.sm,
              color: colors.text,
              caretColor: colors.primary,
            }}
          />
        )}

        {selectedPlayer && isActive && (
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

        {!selectedPlayer && !isActive && (
          <span
            style={{ color: colors.mutedText, fontSize: typography.sizes.xs }}
          >
            ↓
          </span>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={listRef}
          className="absolute z-50 w-full overflow-y-auto"
          style={{
            top: "100%",
            left: 0,
            maxHeight: "200px",
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
            filtered.map((player) => (
              <button
                key={player.id}
                onClick={() => handleSelect(player)}
                className="flex items-center gap-2 w-full px-3 py-2 text-left transition-opacity hover:opacity-70"
                style={{ backgroundColor: colors.background }}
              >
                <div style={{ width: "24px", height: "17px", flexShrink: 0 }}>
                  <Flag
                    code={player.team.code}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className="flex-1 truncate"
                  style={{
                    fontFamily: typography.fontFamily,
                    fontSize: typography.sizes.sm,
                    color: colors.text,
                  }}
                >
                  {player.name}
                </span>
                <span
                  style={{
                    fontFamily: typography.fontFamily,
                    fontSize: typography.sizes.xs,
                    color: colors.mutedText,
                  }}
                >
                  {player.team.code} · {POSITION_LABEL[player.position]}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
