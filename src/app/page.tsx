"use client";

import Link from "next/link";
import { Shield, Cpu, Coins, Swords, Globe, Play, ArrowRight } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      title: "Strategic Battles",
      desc: "Use unique skills and team combos to win intense battles.",
      icon: <Shield className="h-6 w-6 text-[#00c8ff]" />,
      topBorder: "border-t-[#00c8ff]",
      glow: "shadow-[0_0_24px_rgba(0,200,255,0.25)]",
      badge: "border-[#00c8ff] bg-[#00c8ff]/10",
    },
    {
      title: "AI Powered",
      desc: "Advanced AI systems adapt to your moves in real-time.",
      icon: <Cpu className="h-6 w-6 text-[#ff2bd6]" />,
      topBorder: "border-t-[#ff2bd6]",
      glow: "shadow-[0_0_24px_rgba(255,43,214,0.2)]",
      badge: "border-[#ff2bd6] bg-[#ff2bd6]/10",
    },
    {
      title: "Earn & Upgrade",
      desc: "Earn rewards, upgrade your animals, and unlock new powers.",
      icon: <Coins className="h-6 w-6 text-[#ffd21f]" />,
      topBorder: "border-t-[#ffd21f]",
      glow: "shadow-[0_0_24px_rgba(255,210,31,0.2)]",
      badge: "border-[#ffd21f] bg-[#ffd21f]/10",
    },
    {
      title: "Compete & Rank",
      desc: "Climb the ranks and prove you’re the ultimate champion.",
      icon: <Swords className="h-6 w-6 text-[#ff7a00]" />,
      topBorder: "border-t-[#ff7a00]",
      glow: "shadow-[0_0_24px_rgba(255,122,0,0.2)]",
      badge: "border-[#ff7a00] bg-[#ff7a00]/10",
    },
    {
      title: "Explore the World",
      desc: "Discover stunning arenas and hidden secrets.",
      icon: <Globe className="h-6 w-6 text-[#7cff00]" />,
      topBorder: "border-t-[#7cff00]",
      glow: "shadow-[0_0_24px_rgba(124,255,0,0.2)]",
      badge: "border-[#7cff00] bg-[#7cff00]/10",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* HERO: immersive poster composition */}
      <section className="relative min-h-[104vh] pt-24 md:pt-28 pb-16 md:pb-24 overflow-hidden border-b border-white/10">
        {/* Artwork benchmark as main composition canvas */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/images/zuno-game.png')" }}
        />

        {/* Cinematic overlays for depth/readability while preserving artwork */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.72)_0%,rgba(2,6,23,0.28)_28%,rgba(2,6,23,0.42)_55%,rgba(2,6,23,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,122,0,0.16),transparent_38%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,200,255,0.16),transparent_44%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(255,43,214,0.18),transparent_46%)]" />

        {/* Light streaks */}
        <div className="absolute -top-20 left-[-25%] h-[220px] w-[65%] rotate-[14deg] bg-[linear-gradient(to_right,transparent,rgba(0,200,255,0.22),transparent)] blur-2xl" />
        <div className="absolute top-[22%] right-[-30%] h-[180px] w-[75%] -rotate-[10deg] bg-[linear-gradient(to_right,transparent,rgba(255,43,214,0.2),transparent)] blur-2xl" />

        {/* Floating character accents */}
        <div className="absolute left-[-30px] md:left-2 bottom-20 w-36 md:w-52 lg:w-60 opacity-90 animate-game-float pointer-events-none">
          <img src="/images/character-showcase.png" alt="ZUNO character left" className="w-full h-auto object-contain drop-shadow-[0_0_24px_rgba(255,122,0,0.45)]" />
        </div>
        <div className="absolute right-[-35px] md:right-2 top-28 w-36 md:w-52 lg:w-60 opacity-90 animate-game-float pointer-events-none [animation-delay:2s]">
          <img src="/images/character-showcase.png" alt="ZUNO character right" className="w-full h-auto object-contain scale-x-[-1] drop-shadow-[0_0_24px_rgba(0,200,255,0.45)]" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-1.5 text-[10px] md:text-xs font-russo uppercase tracking-[0.2em] text-white/90 shadow-[0_0_14px_rgba(255,255,255,0.12)]">
            ZUNO GAME UNIVERSE
          </div>

          <h1 className="mt-6 font-bangers text-[clamp(4.2rem,12vw,12rem)] leading-[0.86] tracking-[0.04em] text-white [text-shadow:0_6px_0_rgba(0,0,0,0.65),0_0_26px_rgba(255,43,214,0.36),0_0_26px_rgba(0,200,255,0.32)]">
            ZUNO
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-sm md:text-base text-white/92 font-inter font-semibold leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            Enter a cinematic animal battle world where strategy, speed, and AI collide.
            Build your team. Master your powers. Rule the arena.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/how-to-play"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md border-2 border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black font-russo font-black uppercase tracking-[0.12em] text-xs shadow-[0_0_22px_rgba(255,122,0,0.42),4px_4px_0_#14002e] hover:translate-y-[-1px] transition"
            >
              <span>🐾 Play Now</span>
            </Link>

            <Link
              href="/ai-operations"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md border-2 border-[#00c8ff] bg-[linear-gradient(180deg,rgba(0,200,255,0.23)_0%,rgba(20,0,46,0.86)_100%)] text-white font-russo font-black uppercase tracking-[0.12em] text-xs shadow-[0_0_20px_rgba(0,200,255,0.35)] hover:translate-y-[-1px] transition"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Watch Trailer</span>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY PLAY ZUNO */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-14">
        <div className="jagged-console-container p-6 md:p-8 lg:p-10 bg-[linear-gradient(180deg,rgba(20,0,46,0.9)_0%,rgba(2,6,23,0.9)_100%)] border border-white/10">
          <div className="text-center relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,43,214,0.55),transparent)]" />
            <span className="relative inline-block px-5 py-1 border border-[#ff2bd6]/50 bg-[#020617] font-russo text-xs uppercase tracking-[0.18em] text-[#ff2bd6]">
              WHY PLAY ZUNO
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {features.map((feat) => (
              <div
                key={feat.title}
                className={`rounded-xl border border-white/15 border-t-4 ${feat.topBorder} bg-[linear-gradient(180deg,rgba(20,0,46,0.72)_0%,rgba(2,6,23,0.86)_100%)] p-5 text-center ${feat.glow}`}
              >
                <div className={`mx-auto h-12 w-12 rounded-full border flex items-center justify-center ${feat.badge} shadow-[0_0_16px_currentColor]`}>
                  {feat.icon}
                </div>
                <h3 className="mt-4 font-russo text-xs uppercase tracking-[0.13em] text-white">
                  {feat.title}
                </h3>
                <p className="mt-2 text-xs text-white/72 font-inter leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EPIC ANIMAL BATTLES */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-5">
            <h2 className="font-bangers text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.9] tracking-[0.04em] text-white [text-shadow:0_4px_0_rgba(0,0,0,0.7),0_0_16px_rgba(0,200,255,0.35)]">
              EPIC ANIMAL
              <span className="block text-[#00c8ff]">BATTLES</span>
            </h2>
            <p className="mt-4 text-white/84 text-sm md:text-base font-inter leading-relaxed max-w-lg">
              Join fast-paced 3v3 battles in stunning arenas. Build your team, master your strategy, and crush your opponents.
            </p>
            <Link
              href="/how-to-play"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-md border border-[#00c8ff] bg-[linear-gradient(180deg,rgba(0,200,255,0.2)_0%,rgba(2,6,23,0.92)_100%)] font-russo text-xs uppercase tracking-[0.14em] text-white shadow-[0_0_16px_rgba(0,200,255,0.32)]"
            >
              Explore Gameplay
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="lg:col-span-7 relative group">
            <div className="absolute inset-[-4px] rounded-2xl bg-[linear-gradient(90deg,#00c8ff,#ff2bd6,#00c8ff)] blur-[5px] opacity-80" />
            <div className="relative rounded-2xl border-2 border-[#00c8ff] overflow-hidden bg-[#020617]">
              <img
                src="/images/gameplay-preview.png"
                alt="ZUNO gameplay preview"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.82)_0%,transparent_48%)]" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full border border-[#00c8ff] bg-black/70 text-white font-russo text-xs tracking-[0.08em] shadow-[0_0_12px_rgba(0,200,255,0.35)]">
                01:30
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUILD YOUR TEAM */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-14 overflow-visible">
        <div className="relative border-y border-white/10 py-12 text-center bg-[radial-gradient(circle_at_center,rgba(255,43,214,0.10)_0%,transparent_62%)]">
          <div className="absolute left-[-22px] md:left-0 bottom-[-12px] hidden md:block w-36 lg:w-44 opacity-95 animate-game-float pointer-events-none">
            <img src="/images/character-showcase.png" alt="Leopard warrior" className="w-full h-auto object-contain drop-shadow-[0_0_14px_rgba(255,122,0,0.4)]" />
          </div>
          <div className="absolute right-[-22px] md:right-0 top-[-14px] hidden md:block w-36 lg:w-44 opacity-95 animate-game-float pointer-events-none [animation-delay:2.5s]">
            <img src="/images/character-showcase.png" alt="Shadow cat" className="w-full h-auto object-contain scale-x-[-1] drop-shadow-[0_0_14px_rgba(189,0,255,0.4)]" />
          </div>

          <h2 className="font-russo text-3xl sm:text-4xl uppercase tracking-[0.1em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            BUILD YOUR TEAM.
          </h2>
          <h3 className="mt-1 font-bangers text-[clamp(2.9rem,8vw,6.5rem)] leading-[0.9] tracking-[0.05em] text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffd21f_0%,#ff7a00_40%,#ff2bd6_100%)] [text-shadow:0_5px_0_rgba(0,0,0,0.65)]">
            RULE THE ARENA.
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-white/84 text-sm md:text-base font-inter leading-relaxed">
            Collect, upgrade, and evolve powerful animals. Your legend starts now.
          </p>

          <Link
            href="/how-to-play"
            className="mt-7 inline-flex items-center gap-2 px-10 py-4 rounded-md border-2 border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black font-russo font-black uppercase tracking-[0.14em] text-sm shadow-[0_0_24px_rgba(255,122,0,0.45),5px_5px_0_#14002e]"
          >
            🐾 Play Zuno Now
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/12 pt-10 text-center">
          <div>
            <div className="font-russo text-3xl sm:text-4xl text-[#00c8ff] [text-shadow:0_0_12px_rgba(0,200,255,0.45)]">1M+</div>
            <div className="mt-1 font-russo text-[10px] sm:text-xs uppercase tracking-[0.13em] text-white/55">Active Players</div>
          </div>
          <div>
            <div className="font-russo text-3xl sm:text-4xl text-[#ff2bd6] [text-shadow:0_0_12px_rgba(255,43,214,0.45)]">250+</div>
            <div className="mt-1 font-russo text-[10px] sm:text-xs uppercase tracking-[0.13em] text-white/55">Unique Animals</div>
          </div>
          <div>
            <div className="font-russo text-3xl sm:text-4xl text-[#ffd21f] [text-shadow:0_0_12px_rgba(255,210,31,0.45)]">50+</div>
            <div className="mt-1 font-russo text-[10px] sm:text-xs uppercase tracking-[0.13em] text-white/55">Fantasy Arenas</div>
          </div>
          <div>
            <div className="font-russo text-3xl sm:text-4xl text-[#7cff00] [text-shadow:0_0_12px_rgba(124,255,0,0.45)]">24/7</div>
            <div className="mt-1 font-russo text-[10px] sm:text-xs uppercase tracking-[0.13em] text-white/55">AI Operations</div>
          </div>
        </div>
      </section>
    </div>
  );
}
