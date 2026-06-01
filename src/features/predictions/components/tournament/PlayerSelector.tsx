"use client";

import { useState, useRef, useEffect, useId, useMemo } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import type { PlayerOption } from "../../models/types";
import { Flag } from "@/shared/constants/flags";
import { SelectorInput } from "./SelectorInput";
import { colors, borders, typography } from "@/shared/constants/designSystem";

interface PlayerSelectorProps {
  players: PlayerOption[];
  value: string | null;
  onChange: (playerId: string | null) => void;
  isActive: boolean;
  onActivate: () => void;
}

export function PlayerSelector({
  players,
  value,
  onChange,
  isActive,
  onActivate,
}: PlayerSelectorProps) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 200);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedPlayer = players.find((p) => p.id === value) ?? null;

  const filtered = useMemo(() => {
    if (!debouncedQuery.trim()) return players;
    const q = debouncedQuery.toLowerCase();
    return players.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.team.name.toLowerCase().includes(q) ||
        p.team.code.toLowerCase().includes(q),
    );
  }, [players, debouncedQuery]);

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

  return (
    <div className="relative w-full" onClick={onActivate}>
      <SelectorInput
        isActive={isActive}
        hasValue={!!selectedPlayer}
        onClear={() => onChange(null)}
        input={
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar jugador..."
            className="flex-1 outline-none bg-transparent"
            style={{
              fontFamily: typography.fontFamily,
              fontSize: typography.sizes.sm,
              color: colors.text,
              caretColor: colors.primary,
            }}
          />
        }
      >
        {selectedPlayer && (
          <>
            <div
              style={{ width: "32px", height: "22px", flexShrink: 0 }}
              className="flex items-center"
            >
              <Flag
                code={selectedPlayer.team.code}
                className="w-full h-full object-cover block"
              />
            </div>
            <span
              className="flex-1 truncate"
              style={{
                fontFamily: typography.fontFamily,
                fontSize: typography.sizes.md,
                color: colors.text,
              }}
            >
              {selectedPlayer.name}
            </span>
            <span
              style={{ color: colors.primary, fontSize: typography.sizes.md }}
            >
              ✓
            </span>
          </>
        )}
      </SelectorInput>

      {isActive && !selectedPlayer && (
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
            filtered.map((player) => (
              <button
                key={player.id}
                onClick={() => {
                  onChange(player.id);
                  setQuery("");
                }}
                className="flex items-center gap-3 w-full px-3 py-2 text-left transition-opacity hover:opacity-70"
                style={{ backgroundColor: colors.background }}
              >
                <div
                  style={{ width: "24px", height: "17px", flexShrink: 0 }}
                  className="flex items-center"
                >
                  <Flag
                    code={player.team.code}
                    className="w-full h-full object-cover block"
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
                  {player.team.code}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
