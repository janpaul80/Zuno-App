"use client";

import Link from "next/link";

export default function RewardsCoinsPage() {
  return (
    <div className="relative overflow-x-hidden">
      {/* ============= HEADER ============= */}
      <section className="relative z-10 pt-32 pb-12 md:pt-40 md:pb-16 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,210,31,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(189,0,255,0.06),transparent_50%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-russo text-xs uppercase tracking-[0.2em] text-[#ffd21f] drop-shadow-[0_0_8px_rgba(255,210,31,0.5)]">
            Rewards Command Center
          </p>
          <h1 className="mt-4 font-bangers text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.90] tracking-[0.04em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
            CURRENCIES & <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffd21f,#ff7a00)]">REWARDS</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-white/70 text-sm font-inter leading-relaxed">
            Track all currencies, claim reward chests, unlock skins, power up weapons, and progress through daily and seasonal reward tracks.
          </p>
          <div className="mt-5 inline-block rounded-lg border border-[#ff2bd6]/40 bg-[rgba(20,0,46,0.6)] px-5 py-2 font-russo text-xs uppercase tracking-[0.13em] text-[#ff2bd6] shadow-[0_0_12px_rgba(255,43,214,0.2)]">
            Season: Neon Rift — 19 Days Remaining
          </div>
        </div>
      </section>

      {/* ============= 3 CURRENCIES ============= */}
      <section className="relative z-10 py-12 md:py-16 bg-[#020617]">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { name: "ZUNO Coins", value: "128,450", icon: "🪙", color: "#ffd21f", border: "#ffd21f", glow: "rgba(255,210,31,0.2)", uses: ["Upgrades", "Armor", "Abilities", "Arena Unlocks"] },
              { name: "Rift Crystals", value: "2,840", icon: "💎", color: "#ff2bd6", border: "#ff2bd6", glow: "rgba(255,43,214,0.2)", uses: ["Legendary Skins", "Rare Summons", "Mystical Upgrades"] },
              { name: "Energy Orbs", value: "9,220", icon: "🔮", color: "#00c8ff", border: "#00c8ff", glow: "rgba(0,200,255,0.2)", uses: ["Temporary Boosts", "Power Abilities", "AI Enhancements"] },
            ].map((c) => (
              <div
                key={c.name}
                className="rounded-xl border bg-[linear-gradient(180deg,rgba(20,0,46,0.65)_0%,rgba(2,6,23,0.85)_100%)] p-6 transition hover:-translate-y-1"
                style={{ borderColor: `${c.border}44`, boxShadow: `0 0 28px ${c.glow}` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-full border-[3px] flex items-center justify-center text-2xl"
                    style={{ borderColor: c.border, backgroundColor: `${c.color}15`, boxShadow: `0 0 20px ${c.glow}` }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <h3 className="font-russo text-xs uppercase tracking-[0.13em]" style={{ color: c.color }}>{c.name}</h3>
                    <p className="font-bangers text-2xl text-white tracking-wider">{c.value}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {c.uses.map((u) => (
                    <div key={u} className="flex items-center gap-2 text-xs text-white/60 font-inter">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.color }} />
                      {u}
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="flex justify-between text-[10px] uppercase text-white/50 font-russo tracking-wider mb-1.5">
                    <span>Weekly Gain</span><span>74%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-3/4 rounded-full" style={{ background: `linear-gradient(90deg, ${c.color}, ${c.border})` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ============= CHESTS & SKINS ============= */}
      <section className="relative z-10 py-12 md:py-16 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,rgba(255,122,0,0.05),transparent_50%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 grid gap-6 lg:grid-cols-2">
          {/* Chests */}
          <div className="rounded-xl border border-[#ff7a00]/30 bg-[linear-gradient(180deg,rgba(20,0,46,0.65)_0%,rgba(2,6,23,0.85)_100%)] p-6 shadow-[0_0_24px_rgba(255,122,0,0.12)]">
            <h3 className="font-bangers text-xl tracking-[0.05em] text-[#ff7a00]">REWARD CHESTS</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { name: "Bronze Chest", rarity: "Common", status: "Ready", color: "#ff7a00" },
                { name: "Prism Chest", rarity: "Rare", status: "2 Wins Left", color: "#00c8ff" },
                { name: "Nova Chest", rarity: "Epic", status: "4 Wins Left", color: "#ff2bd6" },
                { name: "Apex Vault", rarity: "Legendary", status: "Locked", color: "#ffd21f" },
              ].map((ch) => (
                <div key={ch.name} className="rounded-lg border border-white/10 bg-[#020617] p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md animate-pulse" style={{ backgroundColor: ch.color }} />
                    <div>
                      <p className="font-russo text-xs text-white">{ch.name}</p>
                      <span className="text-[10px] uppercase tracking-wider" style={{ color: ch.color }}>{ch.rarity}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] text-white/50 font-inter">{ch.status}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Skins */}
          <div className="rounded-xl border border-[#ff2bd6]/30 bg-[linear-gradient(180deg,rgba(20,0,46,0.65)_0%,rgba(2,6,23,0.85)_100%)] p-6 shadow-[0_0_24px_rgba(255,43,214,0.12)]">
            <h3 className="font-bangers text-xl tracking-[0.05em] text-[#ff2bd6]">UNLOCKABLE SKINS</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { name: "Neon Warden", rarity: "Epic", cost: "900 Crystals", color: "#ff2bd6" },
                { name: "Solar Viper", rarity: "Legendary", cost: "1800 Crystals", color: "#ffd21f" },
                { name: "Rift Marauder", rarity: "Rare", cost: "450 Crystals", color: "#00c8ff" },
                { name: "Pulse Striker", rarity: "Common", cost: "120 Crystals", color: "#ff7a00" },
                { name: "Arc Sentinel", rarity: "Epic", cost: "750 Crystals", color: "#ff2bd6" },
                { name: "Abyss Runner", rarity: "Legendary", cost: "2100 Crystals", color: "#ffd21f" },
              ].map((s) => (
                <div key={s.name} className="rounded-lg border border-white/10 bg-[#020617] p-3">
                  <p className="font-russo text-xs text-white">{s.name}</p>
                  <p className="text-[10px] text-white/50 font-inter">{s.cost}</p>
                  <span className="mt-1 inline-block text-[10px] uppercase tracking-wider" style={{ color: s.color }}>{s.rarity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ============= DAILY STREAK & BATTLE PASS ============= */}
      <section className="relative z-10 py-12 md:py-16 bg-[#020617]">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 grid gap-6 lg:grid-cols-2">
          {/* Daily streak */}
          <div className="rounded-xl border border-[#00c8ff]/30 bg-[linear-gradient(180deg,rgba(20,0,46,0.65)_0%,rgba(2,6,23,0.85)_100%)] p-6 shadow-[0_0_24px_rgba(0,200,255,0.12)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bangers text-xl tracking-[0.05em] text-[#00c8ff]">DAILY REWARD STREAK</h3>
              <span className="rounded-full border border-[#00c8ff]/40 bg-[#00c8ff]/10 px-3 py-1 font-russo text-[10px] uppercase tracking-wider text-[#00c8ff]">Streak: 6 Days</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["100 Coins","2 Energy Orbs","Small Chest","150 Coins","5 Energy Orbs","Rift Crystal x50","Epic Chest"].map((r, i) => (
                <div key={r} className={`rounded-lg border p-3 text-center ${i < 6 ? "border-[#00c8ff]/30 bg-[#00c8ff]/5" : "border-[#ffd21f]/30 bg-[#ffd21f]/5"}`}>
                  <p className="font-russo text-[9px] uppercase tracking-wider text-white/50">Day {i + 1}</p>
                  <p className="mt-1 text-xs font-inter text-white/80">{r}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Battle pass */}
          <div className="rounded-xl border border-[#ff2bd6]/30 bg-[linear-gradient(180deg,rgba(20,0,46,0.65)_0%,rgba(2,6,23,0.85)_100%)] p-6 shadow-[0_0_24px_rgba(255,43,214,0.12)]">
            <h3 className="font-bangers text-xl tracking-[0.05em] text-[#ff2bd6]">BATTLE PASS TIERS</h3>
            <div className="mt-4 space-y-3">
              {[
                { tier: 1, free: "Coins x200", premium: "Rift Crystal x100" },
                { tier: 5, free: "Energy Orb x8", premium: "Rare Skin" },
                { tier: 10, free: "Prism Chest", premium: "Void Lance" },
                { tier: 15, free: "Coins x500", premium: "Epic Emote" },
                { tier: 20, free: "Rift Crystal x250", premium: "Legendary Skin" },
              ].map((t) => (
                <div key={t.tier} className="rounded-lg border border-white/10 bg-[#020617] p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-russo text-xs text-white">Tier {t.tier}</span>
                    <span className="text-[10px] uppercase tracking-wider text-[#ff2bd6]">Premium Track</span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 text-[11px] font-inter">
                    <p className="rounded border border-[#00c8ff]/20 bg-[#00c8ff]/5 px-2 py-1 text-[#00c8ff]">Free: {t.free}</p>
                    <p className="rounded border border-[#ff2bd6]/20 bg-[#ff2bd6]/5 px-2 py-1 text-[#ff2bd6]">Premium: {t.premium}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ============= LEVEL PROGRESSION + CTA ============= */}
      <section className="relative z-10 py-12 md:py-16 bg-[#020617]">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-center font-bangers text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] tracking-[0.04em] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
            LEVEL <span className="text-[#7cff00]">PROGRESSION</span>
          </h2>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              { lvl: 5, reward: "300 Coins", color: "#ff7a00" },
              { lvl: 10, reward: "Prism Chest", color: "#00c8ff" },
              { lvl: 15, reward: "Energy Booster x5", color: "#00c8ff" },
              { lvl: 20, reward: "Epic Skin Token", color: "#ff2bd6" },
              { lvl: 25, reward: "Rift Crystals x300", color: "#ff2bd6" },
              { lvl: 30, reward: "Inferno Splitter", color: "#ffd21f" },
            ].map((l) => (
              <div key={l.lvl} className="rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(20,0,46,0.5)_0%,rgba(2,6,23,0.75)_100%)] p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-russo text-xs text-white">Level {l.lvl}</span>
                  <span className="text-[10px] uppercase tracking-wider" style={{ color: l.color }}>★</span>
                </div>
                <p className="text-sm text-white/70 font-inter">{l.reward}</p>
                <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(l.lvl / 30) * 100}%`, background: `linear-gradient(90deg, #7cff00, ${l.color})` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= CTA ============= */}
      <section className="relative z-10 py-16 md:py-20 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,122,0,0.08),transparent_55%)]" />
        <div className="relative text-center">
          <h2 className="font-bangers text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.92] tracking-[0.04em] text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffd21f_0%,#ff7a00_45%,#ff2bd6_100%)]">
            COLLECT EVERYTHING
          </h2>
          <p className="mt-4 text-white/70 text-sm font-inter max-w-md mx-auto">
            Battle, earn, upgrade. Your legend starts now.
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
