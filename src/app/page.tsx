"use client";

import Link from "next/link";
import { Play } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden">
      {/* ============= HERO: THE ARTWORK IS THE PAGE ============= */}
      <section className="relative w-full overflow-hidden">
        {/* Main artwork — full composition, never cropped */}
        <div className="relative w-full">
          <img
            src="/images/zuno-game.png"
            alt="ZUNO — enter the arena"
            className="block w-full h-auto object-cover object-[center_top]"
            style={{ maxHeight: "110vh", minHeight: "600px" }}
          />

          {/* Atmospheric overlay for readability — very light, preserves animals */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.35)_0%,rgba(2,6,23,0.08)_18%,rgba(2,6,23,0.10)_55%,rgba(2,6,23,0.75)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,122,0,0.08),transparent_50%)]" />
        </div>

        {/* Floating CTAs — bottom center, minimal, never overlap the logo */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 px-4 z-10">
          <Link
            href="/how-to-play"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border-2 border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black font-russo font-black uppercase tracking-[0.12em] text-sm shadow-[0_0_24px_rgba(255,122,0,0.5),4px_4px_0_#14002e] transition hover:-translate-y-0.5"
          >
            Play Now
          </Link>
          <Link
            href="/ai-operations"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border-2 border-[#00c8ff]/40 bg-[linear-gradient(180deg,rgba(0,200,255,0.18)_0%,rgba(20,0,46,0.82)_100%)] text-white font-russo font-black uppercase tracking-[0.12em] text-sm shadow-[0_0_18px_rgba(0,200,255,0.3)] backdrop-blur-sm transition hover:-translate-y-0.5"
          >
            <Play className="h-4 w-4 fill-current" />
            Watch Trailer
          </Link>
        </div>
      </section>

      {/* ============= WHY PLAY ZUNO ============= */}
      <section className="relative z-10 py-16 md:py-20 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(189,0,255,0.06),transparent_65%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-bangers text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.92] tracking-[0.03em] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] [text-shadow:0_0_18px_rgba(189,0,255,0.35)]">
            WHY PLAY ZUNO
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { t: "Strategic Battles", d: "Unique skills and team combos to win intense battles.", b: "#00c8ff" },
              { t: "AI Powered", d: "Advanced AI adapts to your moves in real-time.", b: "#ff2bd6" },
              { t: "Earn & Upgrade", d: "Earn rewards, upgrade animals, unlock powers.", b: "#ffd21f" },
              { t: "Compete & Rank", d: "Climb ranks and prove you are the champion.", b: "#ff7a00" },
              { t: "Explore the World", d: "Discover stunning arenas and hidden secrets.", b: "#7cff00" },
            ].map((f) => (
              <div key={f.t} className="rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(20,0,46,0.65)_0%,rgba(2,6,23,0.8)_100%)] p-5 text-center transition hover:-translate-y-1" style={{ borderTop: `3px solid ${f.b}`, boxShadow: `0 0 20px ${f.b}18` }}>
                <div className="mx-auto h-10 w-10 rounded-full border border-white/25 flex items-center justify-center" style={{ boxShadow: `0 0 12px ${f.b}40`, color: f.b }}>
                  <div className="h-5 w-5 rounded-full" style={{ backgroundColor: f.b }} />
                </div>
                <h3 className="mt-3 font-russo text-xs uppercase tracking-[0.13em] text-white">{f.t}</h3>
                <p className="mt-2 text-xs text-white/70 font-inter leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= MIDDLE: NATIVE BENCHMARK COMPOSITION (sharp, interactive) ============= */}
      <section className="relative z-10 w-full bg-[#020617] overflow-hidden">
        {/* Background energy atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_40%,rgba(0,200,255,0.09),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_55%,rgba(189,0,255,0.07),transparent_50%)]" />

        <div className="relative max-w-[960px] mx-auto px-4 sm:px-6 py-14 md:py-18">

          {/* Row: Left text + Center gameplay frame */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

            {/* LEFT: gameplay text block */}
            <div className="lg:w-[320px] flex-shrink-0 pt-2">
              <h2 className="font-bangers text-[clamp(2.6rem,7vw,5rem)] leading-[0.92] tracking-[0.04em] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.65)]">
                EPIC ANIMAL
                <span className="block text-[#00c8ff]">BATTLES</span>
              </h2>
              <p className="mt-4 text-white/90 text-sm font-inter leading-relaxed">
                Join fast-paced 3v3 battles in stunning arenas. Build your team, master your strategy, and crush your opponents.
              </p>
              <Link href="/how-to-play" className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#00c8ff]/45 bg-[linear-gradient(180deg,rgba(0,200,255,0.12)_0%,rgba(2,6,23,0.92)_100%)] font-russo text-xs uppercase tracking-[0.13em] text-white shadow-[0_0_14px_rgba(0,200,255,0.22)] backdrop-blur-sm transition hover:-translate-y-0.5">
                Explore Gameplay →
              </Link>
            </div>

            {/* CENTER: sharp gameplay frame (max-width 500px, ~580px max-height) */}
            <div className="relative flex-1 max-w-[500px] mx-auto lg:mx-0">
              {/* Outer glow */}
              <div className="absolute inset-[-4px] rounded-2xl bg-[linear-gradient(120deg,#00c8ff,#ff2bd6)] blur-sm opacity-80" />
              {/* Inner neon border + angled feel */}
              <div className="relative rounded-2xl border-2 border-[#00c8ff] overflow-hidden bg-[#020617] shadow-[0_0_28px_rgba(0,200,255,0.28)]">
                <img
                  src="/images/gameplay-preview.png"
                  alt="ZUNO gameplay preview"
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: "580px" }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.70)_0%,transparent_45%)]" />
              </div>
            </div>

          </div>

          {/* BUILD YOUR TEAM / RULE THE ARENA — tight spacing below */}
          <div className="mt-10 md:mt-12 text-center">
            <h3 className="font-russo text-xl sm:text-2xl uppercase tracking-[0.11em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              BUILD YOUR TEAM.
            </h3>
            <h4 className="mt-1 font-bangers text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.90] tracking-[0.045em] text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffd21f_0%,#ff7a00_45%,#ff2bd6_100%)] drop-shadow-[0_5px_8px_rgba(0,0,0,0.65)]">
              RULE THE ARENA.
            </h4>
          </div>

          {/* Row: Bottom-left animal + PLAY NOW button + Bottom-right animal */}
          <div className="relative mt-6 md:mt-8 flex items-center justify-center">
            {/* Bottom-left hero character */}
            <div className="absolute left-[-10px] md:left-[-24px] bottom-[-6px] w-[90px] md:w-[120px] opacity-90 pointer-events-none select-none">
              <img
                src="/images/character-showcase.png"
                alt=""
                className="w-full h-auto object-contain drop-shadow-[0_0_16px_rgba(255,122,0,0.35)]"
                style={{ transform: "scaleX(-1)" }}
              />
            </div>

            {/* Real clickable PLAY NOW button */}
            <Link
              href="/how-to-play"
              className="relative z-10 inline-flex items-center gap-2 px-12 py-4 rounded-lg border-[2.5px] border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black font-russo font-black uppercase tracking-[0.13em] text-sm shadow-[0_0_28px_rgba(255,122,0,0.55),5px_5px_0_#14002e] transition hover:-translate-y-0.5"
            >
              🐾 Play Zuno Now
            </Link>

            {/* Bottom-right purple cat character */}
            <div className="absolute right-[-10px] md:right-[-24px] bottom-[-4px] w-[90px] md:w-[120px] opacity-90 pointer-events-none select-none">
              <img
                src="/images/character-showcase.png"
                alt=""
                className="w-full h-auto object-contain drop-shadow-[0_0_16px_rgba(189,0,255,0.35)]"
              />
            </div>
          </div>

          {/* Tagline below button */}
          <p className="mt-6 text-center text-white/85 text-sm font-inter max-w-md mx-auto">
            Collect, upgrade, and evolve powerful animals. Your legend starts now.
          </p>

        </div>
      </section>

      {/* ============= STATS ============= */}
      <section className="relative z-10 py-12 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,200,255,0.06),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/8 pt-10 text-center">
            {[
              { v: "1M+", l: "Active Players", c: "#00c8ff" },
              { v: "250+", l: "Unique Animals", c: "#ff2bd6" },
              { v: "50+", l: "Fantasy Arenas", c: "#ffd21f" },
              { v: "24/7", l: "AI Operations", c: "#7cff00" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-russo text-3xl sm:text-4xl" style={{ color: s.c, textShadow: `0 0 14px ${s.c}77` }}>{s.v}</div>
                <div className="mt-1 font-russo text-[10px] sm:text-xs uppercase tracking-[0.13em] text-white/55">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
