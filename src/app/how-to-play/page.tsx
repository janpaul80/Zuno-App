"use client";

import Link from "next/link";

export default function HowToPlayPage() {
  return (
    <div className="relative overflow-x-hidden">

      {/* ============= HERO: THE ARTWORK IS THE PAGE ============= */}
      {/* pt-20 clears the fixed navbar so "SIDEWAYS" headline is fully visible */}
      <section className="relative w-full overflow-hidden bg-[#020617]">
        <div className="relative w-full pt-[10rem]">
          <img
            src="/how to play.png"
            alt="ZUNO — turn your phone sideways to enter battle"
            className="block w-full h-auto object-cover object-[center_center]"
            style={{ maxHeight: "100vh", minHeight: "500px" }}
          />

          {/* Atmospheric overlays — preserve artwork, add depth */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.25)_0%,rgba(2,6,23,0.03)_20%,rgba(2,6,23,0.03)_55%,rgba(2,6,23,0.85)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(189,0,255,0.05),transparent_55%)]" />
        </div>

        {/* Bottom CTAs — floating over artwork, minimal */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 px-4 z-10">
          <Link
            href="#combat"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border-2 border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black font-russo font-black uppercase tracking-[0.12em] text-sm shadow-[0_0_24px_rgba(255,122,0,0.5),4px_4px_0_#14002e] transition hover:-translate-y-0.5"
          >
            See It In Action
          </Link>
          <Link
            href="/weapons"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border-2 border-[#00c8ff]/40 bg-[linear-gradient(180deg,rgba(0,200,255,0.18)_0%,rgba(20,0,46,0.82)_100%)] text-white font-russo font-black uppercase tracking-[0.12em] text-sm shadow-[0_0_18px_rgba(0,200,255,0.3)] backdrop-blur-sm transition hover:-translate-y-0.5"
          >
            Explore Weapons
          </Link>
        </div>
      </section>

      {/* ============= CINEMATIC VIDEO SECTION ============= */}
      {/* Full-width immersive video — no player chrome, no controls, just atmosphere */}
      <section id="combat" className="relative z-10 w-full bg-[#020617] overflow-hidden">
        {/* Atmospheric radials behind video */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,122,0,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(189,0,255,0.06),transparent_50%)]" />

        <div className="relative max-w-[1100px] mx-auto px-0 sm:px-4 py-12 md:py-16">

          {/* Subtle section label */}
          <p className="text-center font-russo text-xs uppercase tracking-[0.2em] text-white/40 mb-6">
            Real-Time Combat
          </p>

          {/* Video container — cinematic framing with edge blending */}
          <div className="relative w-full overflow-hidden rounded-none sm:rounded-2xl">
            {/* Top edge gradient — blends into dark bg */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-[linear-gradient(to_bottom,#020617_0%,transparent_100%)] z-10 pointer-events-none" />

            {/* Video — autoplay, muted, loop, no controls */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-cover"
              style={{ maxHeight: "70vh", minHeight: "280px" }}
            >
              <source src="/swipe-video.mp4" type="video/mp4" />
            </video>

            {/* Bottom edge gradient — blends into dark bg */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-[linear-gradient(to_top,#020617_0%,transparent_100%)] z-10 pointer-events-none" />

            {/* Side edge gradients for extra immersion */}
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-[linear-gradient(to_right,#020617_0%,transparent_100%)] z-10 pointer-events-none hidden sm:block" />
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-[linear-gradient(to_left,#020617_0%,transparent_100%)] z-10 pointer-events-none hidden sm:block" />

            {/* Minimal overlay text — bottom center, inside the video */}
            <div className="absolute bottom-10 left-0 right-0 z-20 text-center px-4">
              <h2 className="font-bangers text-[clamp(2rem,6vw,4rem)] leading-[0.92] tracking-[0.04em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] [text-shadow:0_0_20px_rgba(255,122,0,0.3)]">
                SWIPE. STRIKE. DOMINATE.
              </h2>
            </div>
          </div>

          {/* Single line below video — minimal */}
          <p className="mt-8 text-center text-white/70 text-sm font-inter max-w-lg mx-auto leading-relaxed px-4">
            Turn your phone sideways and enter real-time combat. Every swipe controls movement. Every tap unleashes attacks.
          </p>

          {/* Single CTA */}
          <div className="mt-6 text-center">
            <Link
              href="/weapons"
              className="inline-flex items-center gap-2 px-10 py-3.5 rounded-lg border-[2.5px] border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black font-russo font-black uppercase tracking-[0.13em] text-sm shadow-[0_0_28px_rgba(255,122,0,0.5),5px_5px_0_#14002e] transition hover:-translate-y-0.5"
            >
              Explore Weapons
            </Link>
          </div>

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
              { v: "\u221E", l: "Combo Possibilities", c: "#7cff00" },
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
