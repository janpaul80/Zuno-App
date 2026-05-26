"use client";

import Link from "next/link";

export default function RewardsCoinsPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* ===== FULL-SCREEN CINEMATIC ARTWORK ===== */}
      {/* The artwork IS the page — covers the entire viewport */}

      {/* Artwork as full-viewport background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/rewards-coins.png')" }}
      />

      {/* Atmospheric overlays — cinematic depth */}
      {/* Top fade — navbar breathes into artwork */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.5)_0%,rgba(2,6,23,0)_18%)]" />
      {/* Bottom fade — grounds the artwork, text legibility */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.92)_0%,rgba(2,6,23,0.55)_22%,rgba(2,6,23,0)_50%)]" />
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(2,6,23,0.45)_100%)]" />
      {/* Warm ambient glow from the coins/treasure */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_bottom,rgba(255,210,31,0.1),transparent_55%)]" />

      {/* ===== HERO TEXT — floating at the bottom third ===== */}
      <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-0 right-0 z-10 text-center px-4">
        <p className="font-russo text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#ffd21f] drop-shadow-[0_0_12px_rgba(255,210,31,0.6)] animate-pulse">
          Rewards Command Center
        </p>

        <h1 className="mt-3 font-bangers text-[clamp(3rem,10vw,7rem)] leading-[0.85] tracking-[0.04em] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
          EARN. UPGRADE.{" "}
          <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffd21f,#ff7a00,#ff2bd6)]">
            DOMINATE.
          </span>
        </h1>

        <p className="mt-4 text-white/70 text-sm md:text-base font-inter max-w-lg mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Play, complete challenges, and climb the ranks. Every victory earns you valuable rewards.
        </p>

        <Link
          href="/how-to-play"
          className="mt-6 inline-flex items-center justify-center gap-2.5 px-10 py-4 rounded-lg border-[2.5px] border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black font-russo font-black uppercase tracking-[0.13em] text-sm shadow-[0_0_32px_rgba(255,122,0,0.55),5px_5px_0_#14002e] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,122,0,0.7),6px_6px_0_#14002e]"
        >
          🎮 Play & Earn Now
        </Link>
      </div>
    </div>
  );
}
