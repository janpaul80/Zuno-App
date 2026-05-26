"use client";

import Link from "next/link";

const tiers = [
  {
    tier: "Beginner", color: "#7cff00", glow: "rgba(124,255,0,0.12)",
    levels: [
      { name: "Grasslands of Origin", enemies: "Snarling Pups, Vine Crawlers", reward: "200 Coins", desc: "Rolling green fields where rookies learn the basics. Low danger, high lessons.", color: "#7cff00" },
      { name: "Crystal River Canyon", enemies: "River Sprites, Crystal Bats", reward: "350 Coins + Shard", desc: "Glittering blue waterways carve through crystal formations. Watch for ambushes at the falls.", color: "#00c8ff" },
      { name: "Sky Canyon Bridges", enemies: "Wind Hawks, Cloud Golems", reward: "500 Coins + Bronze Chest", desc: "Narrow bridges over endless sky. One wrong step and you fall — but the loot is worth it.", color: "#ffd21f" },
    ],
  },
  {
    tier: "Medium", color: "#ff7a00", glow: "rgba(255,122,0,0.12)",
    levels: [
      { name: "Ember Volcano", enemies: "Magma Beasts, Fire Wraiths", reward: "800 Coins + Rift Crystal x20", desc: "Rivers of lava cut through obsidian halls. The heat alone drains HP — move fast or burn.", color: "#ff7a00" },
      { name: "Shadow Temple Ruins", enemies: "Phantom Guards, Void Spiders", reward: "1000 Coins + Prism Chest", desc: "Ancient temple consumed by darkness. Enemies phase through walls. Trust nothing you see.", color: "#ff2bd6" },
      { name: "Frozen Rift Caverns", enemies: "Frost Giants, Ice Wraiths", reward: "1200 Coins + Epic Weapon Token", desc: "Sub-zero caverns where the rift bleeds cold. Freeze resistance is mandatory equipment.", color: "#00c8ff" },
    ],
  },
  {
    tier: "Hard", color: "#ff2bd6", glow: "rgba(255,43,214,0.12)",
    levels: [
      { name: "Chaos Dimension", enemies: "Chaos Beasts, Reality Shards", reward: "2000 Coins + Legendary Token", desc: "Reality fractures here. Gravity shifts, time warps, enemies multiply. Only legends survive.", color: "#ff2bd6" },
      { name: "Neon Abyss", enemies: "Neon Predators, Glitch Horrors", reward: "2500 Coins + Nova Chest", desc: "A digital nightmare of corrupted code made physical. Every surface pulses with lethal energy.", color: "#00c8ff" },
      { name: "Titan Arena", enemies: "World Boss: TITAN OVERLORD", reward: "5000 Coins + Apex Vault + Title", desc: "The final arena. One boss. One chance. Defeat the Titan Overlord to prove you are ZUNO.", color: "#ffd21f" },
    ],
  },
];

export default function LevelsPage() {
  return (
    <div className="relative overflow-x-hidden">
      {/* HEADER */}
      <section className="relative z-10 pt-32 pb-12 md:pt-40 md:pb-16 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(124,255,0,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,43,214,0.06),transparent_50%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-russo text-xs uppercase tracking-[0.2em] text-[#7cff00] drop-shadow-[0_0_8px_rgba(124,255,0,0.5)]">ZUNO World Map</p>
          <h1 className="mt-4 font-bangers text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.90] tracking-[0.04em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
            LEVELS & <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#7cff00,#00c8ff)]">WORLDS</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/70 text-sm font-inter leading-relaxed">
            9 unique worlds across 3 difficulty tiers. Each world has its own enemies, atmosphere, and legendary rewards.
          </p>
        </div>
      </section>

      {/* ============= TIER MAP ============= */}
      {tiers.map((t, ti) => (
        <section key={t.tier} className="relative z-10 py-12 md:py-16 bg-[#020617]">
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at ${ti % 2 === 0 ? "30%" : "70%"} 50%, ${t.glow}, transparent 55%)` }} />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full border-[3px] flex items-center justify-center font-bangers text-xl text-white" style={{ borderColor: t.color, backgroundColor: `${t.color}15`, boxShadow: `0 0 16px ${t.glow}` }}>
                {ti + 1}
              </div>
              <div>
                <h2 className="font-bangers text-2xl tracking-[0.04em]" style={{ color: t.color }}>{t.tier.toUpperCase()} TIER</h2>
                <p className="text-[10px] text-white/50 font-russo uppercase tracking-[0.15em]">3 Worlds • Increasing Difficulty</p>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {t.levels.map((l) => (
                <div
                  key={l.name}
                  className="rounded-xl border bg-[linear-gradient(180deg,rgba(20,0,46,0.65)_0%,rgba(2,6,23,0.85)_100%)] overflow-hidden transition hover:-translate-y-1"
                  style={{ borderColor: `${l.color}33`, boxShadow: `0 0 24px ${l.color}12` }}
                >
                  {/* Level banner */}
                  <div className="h-28 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${l.color}25, ${l.color}08)` }}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(0,0,0,0.3),transparent)]" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="font-bangers text-lg tracking-[0.04em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">{l.name}</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-white/60 font-inter leading-relaxed">{l.desc}</p>
                    <div className="rounded-lg border border-white/10 bg-[#020617] p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="font-russo text-[9px] uppercase tracking-wider text-[#ff2bd6] mt-0.5 shrink-0">Enemies</span>
                        <span className="text-[11px] text-white/50 font-inter">{l.enemies}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-russo text-[9px] uppercase tracking-wider text-[#ffd21f] mt-0.5 shrink-0">Reward</span>
                        <span className="text-[11px] text-white/70 font-inter">{l.reward}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-russo text-[10px] uppercase tracking-wider" style={{ color: t.color }}>{t.tier}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-russo border" style={{ color: l.color, borderColor: `${l.color}55` }}>Enter World</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
      {/* ============= CTA ============= */}
      <section className="relative z-10 py-16 md:py-20 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,122,0,0.08),transparent_55%)]" />
        <div className="relative text-center">
          <h2 className="font-bangers text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.92] tracking-[0.04em] text-transparent bg-clip-text bg-[linear-gradient(90deg,#7cff00_0%,#00c8ff_45%,#ff2bd6_100%)]">
            CONQUER EVERY WORLD
          </h2>
          <p className="mt-4 text-white/70 text-sm font-inter max-w-md mx-auto">
            From rolling grasslands to the Titan Arena. Your journey through the ZUNO universe starts now.
          </p>
          <Link
            href="/how-to-play"
            className="mt-8 inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg border-[2.5px] border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black font-russo font-black uppercase tracking-[0.13em] text-sm shadow-[0_0_28px_rgba(255,122,0,0.55),5px_5px_0_#14002e] transition hover:-translate-y-0.5"
          >
            🐾 Play Zuno Now
          </Link>
        </div>
      </section>
    </div>
  );
}
