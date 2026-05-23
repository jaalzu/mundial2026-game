import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[500px] flex-col items-center justify-center px-6">
        <div className="mb-10 flex flex-col items-center">
          <div className="mb-6 h-20 w-20 border-[3px] border-white" />

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em]">
            <span className="text-[#3CAC3B]">Mundial</span>{" "}
            <span className="text-[#FFFFFF]">2026</span>{" "}
            <span className="text-[#E61D25]">Fantasy</span>
          </p>

          <h1 className="max-w-[320px] text-center text-4xl font-bold uppercase leading-none">
            Competí contra tus amigos para ver quién es el experto en fútbol
          </h1>
        </div>

        <Link
          href="/create-user"
          className="flex h-14 w-full items-center justify-center border-[3px] border-[#3CAC3B] bg-[#3CAC3B] px-6 text-sm font-bold uppercase text-black transition-opacity duration-150 active:opacity-80"
        >
          Comenzar a jugar
        </Link>
      </div>
    </main>
  );
}
