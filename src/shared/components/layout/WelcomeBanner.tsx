"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "welcome-banner-seen";

type WelcomeBannerProps = {
  winnerName: string;
};

const CONFETTI_COLORS = [
  "#22c55e",
  "#eab308",
  "#ef4444",
  "#3b82f6",
  "#ec4899",
  "#ffffff",
];

const CONFETTI_PIECES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 3,
  duration: 3 + Math.random() * 2,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  size: 6 + Math.random() * 6,
  rotate: Math.random() * 360,
}));

const BALLOONS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: 5 + i * 12 + Math.random() * 6,
  delay: Math.random() * 2,
  duration: 5 + Math.random() * 3,
  emoji: ["🎈", "🎈", "🎉"][i % 3],
}));

export function WelcomeBanner({ winnerName }: WelcomeBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadySeen = localStorage.getItem(STORAGE_KEY);
    if (!alreadySeen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- lectura única de localStorage (no existe en SSR)
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-hidden"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
    >
      {/* Confeti cayendo */}
      {CONFETTI_PIECES.map((piece) => (
        <span
          key={`confetti-${piece.id}`}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            width: piece.size,
            height: piece.size * 0.4,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotate}deg)`,
          }}
        />
      ))}

      {/* Globos subiendo */}
      {BALLOONS.map((balloon) => (
        <span
          key={`balloon-${balloon.id}`}
          className="balloon-piece"
          style={{
            left: `${balloon.left}%`,
            animationDelay: `${balloon.delay}s`,
            animationDuration: `${balloon.duration}s`,
          }}
        >
          {balloon.emoji}
        </span>
      ))}

      <div
        className="relative w-full max-w-sm rounded-2xl px-6 py-8 flex flex-col items-center gap-3 shadow-2xl"
        style={{ backgroundColor: "#000" }}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 bg-red-600 text-white font-bold w-7 h-7 rounded-full flex items-center justify-center text-sm"
          aria-label="Cerrar"
        >
          ✕
        </button>

        <div className="w-36 h-36 flex items-center justify-center">
          <img
            src="/cup.webp"
            alt="Copa del Mundo"
            className="w-full h-full object-contain"
          />
        </div>

        <p className="text-white text-lg font-semibold text-center">
          🎉 ¡Felicitaciones, {winnerName}!
        </p>
        <p className="text-white/70 text-sm text-center">
          Durante 4 años eres la palabra final del futbol.
        </p>
      </div>

      <style jsx global>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(540deg);
            opacity: 0.8;
          }
        }

        .confetti-piece {
          position: absolute;
          top: 0;
          border-radius: 2px;
          animation-name: confetti-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          pointer-events: none;
        }

        @keyframes balloon-float {
          0% {
            transform: translateY(10vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(-50vh) translateX(15px);
          }
          100% {
            transform: translateY(-110vh) translateX(-15px);
            opacity: 0.9;
          }
        }

        .balloon-piece {
          position: absolute;
          bottom: 0;
          font-size: 2rem;
          animation-name: balloon-float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
