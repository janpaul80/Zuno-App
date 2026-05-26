"use client";

import Link from "next/link";
import { Play } from "lucide-react";

export default function HowToPlayPage() {
  return (
    <div className="relative overflow-x-hidden">

      {/* ============= THE ARTWORK IS THE PAGE ============= */}
      <section className="relative w-full overflow-hidden">
        {/* Full-bleed cinematic artwork — the entire visual experience */}
        <div className="relative w-full">
          <img
            src="/how to play.png"
            alt="ZUNO — turn your phone sideways to enter battle"
            className="block w-full h-auto object-cover object-[center_center]"
            style={{ maxHeight: "110vh", minHeight: "600px" }}
          />

          {/* Atmospheric overlays — preserve artwork, add depth */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.30)_0%,rgba(2,6,23,0.05)_25%,rgba(2,6,23,0.05)_60%,rgba(2,6,23,0.80)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(189,0,255,0.06),transparent_55%)]" />
        </div>

        {/* Bottom CTAs — floating over artwork, minimal */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 px-4 z-10">
          <Link
            href="#controls"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border-2 border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black font-russo font-black uppercase tracking-[0.12em] text-sm shadow-[0_0_24px_rgba(255,122,0,0.5),4px_4px_0_#14002e] transition hover:-translate-y-0.5"
          >
            Learn the Controls
          </Link>
          <Link
            href="/weapons"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border-2 border-[#00c8ff]/40 bg-[linear-gradient(180deg,rgba(0,200,255,0.18)_0%,rgba(20,0,46,0.82)_100%)] text-white font-russo font-black uppercase tracking-[0.12em] text-sm shadow-[0_0_18px_rgba(0,200,255,0.3)] backdrop-blur-sm transition hover:-translate-y-0.5"
          >
            <Play className="h-4 w-4 fill-current" />
            Watch Trailer
          </Link>
        </div>
      </section>

      {/* ============= COMBAT SYSTEM — CLEAN, POWERFUL ============= */}
      <section id="controls" className="relative z-10 w-full bg-[#020617] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_40%,rgba(0,200,255,0.09),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_55%,rgba(189,0,255,0.07),transparent_50%)]" />

        <div className="relative max-w-[960px] mx-auto px-4 sm:px-6 py-14 md:py-18">

          {/* Row: Left text + Right gameplay HUD */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

            {/* LEFT: combat system text */}
            <div className="lg:w-[340px] flex-shrink-0 pt-2">
              <h2 className="font-bangers text-[clamp(2.6rem,7vw,5rem)] leading-[0.92] tracking-[0.04em] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.65)]">
                SWIPE. STRIKE.
                <span className="block text-[#ff7a00]">DOMINATE.</span>
              </h2>
              <p className="mt-4 text-white/90 text-sm font-inter leading-relaxed">
                Turn your phone sideways and enter real-time combat. Every swipe controls movement. Every tap unleashes attacks. Perfect your dodge timing to trigger devastating counters.
              </p>
              <Link href="/weapons" className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#ff7a00]/45 bg-[linear-gradient(180deg,rgba(255,122,0,0.12)_0%,rgba(2,6,23,0.92)_100%)] font-russo text-xs uppercase tracking-[0.13em] text-white shadow-[0_0_14px_rgba(255,122,0,0.22)] backdrop-blur-sm transition hover:-translate-y-0.5">
                Explore Weapons →
              </Link>
            </div>

            {/* RIGHT: Live HUD frame */}
            <div className="relative flex-1 max-w-[500px] mx-auto lg:mx-0">
              {/* Outer glow */}
              <div className="absolute inset-[-4px] rounded-2xl bg-[linear-gradient(120deg,#ff7a00,#ff2bd6)] blur-sm opacity-80" />
              {/* Inner frame */}
              <div className="relative rounded-2xl border-2 border-[#ff7a00] overflow-hidden bg-[#020617] shadow-[0_0_28px_rgba(255,122,0,0.28)]">
                {/* HUD Content */}
                <div className="p-5 md:p-6">
                  {/* Match header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border-2 border-[#00c8ff] bg-[#00c8ff]/10" />
                      <div>
                        <p className="font-russo text-xs uppercase tracking-[0.13em] text-[#00c8ff]">Rayo</p>
                        <div className="w-24 h-2.5 rounded-full bg-white/10 overflow-hidden mt-1">
                          <div className="h-full w-[82%] rounded-full bg-[linear-gradient(90deg,#00c8ff,#00ff88)]" />
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-bangers text-lg tracking-wider text-white">01:30</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-russo text-xs uppercase tracking-[0.13em] text-[#ff2bd6]">Bambo</p>
                        <div className="w-24 h-2.5 rounded-full bg-white/10 overflow-hidden mt-1">
                          <div className="h-full w-[58%] rounded-full bg-[linear-gradient(90deg,#ff2bd6,#ff7a00)]" />
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-[#ff2bd6] bg-[#ff2bd6]/10" />
                    </div>
                  </div>

                  {/* Arena zone */}
                  <div className="relative rounded-xl border border-white/10 bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.08),rgba(189,0,255,0.05),transparent_70%)] min-h-[200px] md:min-h-[260px] flex items-end justify-center pb-6">
                    {/* Character silhouettes */}
                    <div className="absolute left-6 bottom-8 w-16 h-24 md:w-20 md:h-32 rounded-t-full rounded-b-xl border-2 border-[#00c8ff]/40 bg-[linear-gradient(180deg,rgba(0,200,255,0.15),rgba(0,200,255,0.03))] shadow-[0_0_20px_rgba(0,200,255,0.15)]" />
                    <div className="absolute right-6 bottom-6 w-18 h-28 md:w-22 md:h-36 rounded-t-full rounded-b-xl border-2 border-[#ff2bd6]/40 bg-[linear-gradient(180deg,rgba(255,43,214,0.15),rgba(255,43,214,0.03))] shadow-[0_0_20px_rgba(255,43,214,0.15)]" />
                    <p className="font-bangers text-sm tracking-[0.15em] text-[#ffd21f]/60">ARENA ACTIVE</p>
                  </div>

                  {/* Action buttons row */}
                  <div className="mt-4 flex items-center justify-between">
                    {/* D-pad */}
                    <div className="w-14 h-14 rounded-full border-2 border-white/20 bg-white/5 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-white/15 border border-white/25" />
                    </div>
                    {/* Ability buttons */}
                    <div className="flex items-center gap-2.5">
                      {[
                        { c: "#ff7a00", label: "ATK" },
                        { c: "#00c8ff", label: "DEF" },
                        { c: "#ff2bd6", label: "ULT" },
                        { c: "#ffd21f", label: "SPL" },
                      ].map((b) => (
                        <div key={b.label} className="relative">
                          <div
                            className="w-11 h-11 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center"
                            style={{ borderColor: b.c, backgroundColor: `${b.c}15`, boxShadow: `0 0 12px ${b.c}40` }}
                          >
                            <span className="font-russo text-[8px] uppercase tracking-wider text-white/80">{b.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-[linear-gradient(to_top,rgba(2,6,23,0.6)_0%,transparent_100%)]" />
              </div>
            </div>

          </div>

          {/* MASTER YOUR HERO — tight spacing below, matches homepage */}
          <div className="mt-10 md:mt-12 text-center">
            <h3 className="font-russo text-xl sm:text-2xl uppercase tracking-[0.11em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              LEARN THE MOVES.
            </h3>
            <h4 className="mt-1 font-bangers text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.90] tracking-[0.045em] text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffd21f_0%,#ff7a00_45%,#ff2bd6_100%)] drop-shadow-[0_5px_8px_rgba(0,0,0,0.65)]">
              OWN THE ARENA.
            </h4>
          </div>

          {/* Central CTA with character flanks — matches homepage pattern */}
          <div className="relative mt-6 md:mt-8 flex items-center justify-center">
            <div className="absolute left-[-10px] md:left-[-24px] bottom-[-6px] w-[90px] md:w-[120px] opacity-90 pointer-events-none select-none">
              <img
                src="/images/character-showcase.png"
                alt=""
                className="w-full h-auto object-contain drop-shadow-[0_0_16px_rgba(255,122,0,0.35)]"
                style={{ transform: "scaleX(-1)" }}
              />
            </div>

            <Link
              href="/weapons"
              className="relative z-10 inline-flex items-center gap-2 px-12 py-4 rounded-lg border-[2.5px] border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black font-russo font-black uppercase tracking-[0.13em] text-sm shadow-[0_0_28px_rgba(255,122,0,0.55),5px_5px_0_#14002e] transition hover:-translate-y-0.5"
            >
              Explore Weapons
            </Link>

            <div className="absolute right-[-10px] md:right-[-24px] bottom-[-4px] w-[90px] md:w-[120px] opacity-90 pointer-events-none select-none">
              <img
                src="/images/character-showcase.png"
                alt=""
                className="w-full h-auto object-contain drop-shadow-[0_0_16px_rgba(189,0,255,0.35)]"
              />
            </div>
          </div>

          <p className="mt-6 text-center text-white/85 text-sm font-inter max-w-md mx-auto">
            Master every control. Perfect your timing. Rise through the ranks and become a ZUNO legend.
          </p>

        </div>
      </section>

      {/* ============= STATS — matches homepage ============= */}
      <section className="relative z-10 py-12 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,200,255,0.06),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/8 pt-10 text-center">
            {[
              { v: "5", l: "Combat Controls", c: "#00c8ff" },
              { v: "3v3", l: "Real-Time Battles", c: "#ff2bd6" },
              { v: "5", l: "Elemental Types", c: "#ffd21f" },
              { v: "∞", l: "Combo Possibilities", c: "#7cff00" },
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
