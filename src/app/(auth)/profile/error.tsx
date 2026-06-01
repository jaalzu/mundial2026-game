"use client";

export default function ProfileError({
  error,
  unstable_retry,
}: {
  error: Error;
  unstable_retry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <p style={{ color: "#BCBCBC", fontFamily: "monospace" }}>
        Error cargando el perfil
      </p>
      <p
        style={{
          color: "#BCBCBC",
          fontFamily: "monospace",
          fontSize: "12px",
          opacity: 0.5,
        }}
      >
        {error.message}
      </p>
      <button
        onClick={unstable_retry}
        style={{
          border: "1px solid #3CAC3B",
          color: "#3CAC3B",
          padding: "8px 20px",
          fontFamily: "monospace",
          background: "none",
          cursor: "pointer",
        }}
      >
        REINTENTAR
      </button>
    </div>
  );
}
