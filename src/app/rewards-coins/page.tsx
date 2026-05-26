"use client";

import Link from "next/link";
import { useState } from "react";

export default function RewardsCoinsPage() {
  const [hoveredChest, setHoveredChest] = useState<string | null>(null);
  const [hoveredSkin, setHoveredSkin] = useState<string | null>(null);

  return (
    <div className="relative overflow-x-hidden">

      {/* ============= HERO: CINEMATIC REWARDS ============= */}
      <section className="relative w-full overflow-hidden bg-[#020617]">
        <div className="relative w-full pt-[10rem]">
          <img
            src="/rewards-coins.png"
            alt="ZUNO — Earn rewards, collect coins, dominate the arena"
            className="block w-full h-auto object-cover object-[center_top]"
            style={{ maxHeight: "100vh", minHeight: "500px" }}
          />
          {/* Atmospheric overlays */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.25)_0%,rgba(2,6,23,0.03)_20%,rgba(2,6,23,0.03)_55%,rgba(2,6,23,0.85)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,210,31,0.06),transparent_55%)]" />
        </div>

        {/* Floating headline over artwork bottom */}
        <div className="absolute bottom-16 left-0 right-0 z-10 text-center px-4">
          <p className="font-russo text-xs uppercase tracking-[0.2em] text-[#ffd21f] drop-shadow-[0_0_8px_rgba(255,210,31,0.5)]">
            Rewards Command Center
          </p>
          <h1 className="mt-3 font-bangers text-[clamp(2.4rem,7vw,5rem)] leading-[0.90] tracking-[0.04em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            EARN. UPGRADE.{" "}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffd21f,#ff7a00)] [text-shadow:none]">
              DOMINATE.
            </span>
          </h1>
          <p className="mt-3 text-white/75 text-sm font-inter max-w-lg mx-auto">
            Play, complete challenges, and climb the ranks. Every victory earns you valuable rewards.
          </p>
        </div>

        {/* Bottom CTAs */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 px-4 z-10">
          <Link
            href="#currencies"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border-2 border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black font-russo font-black uppercase tracking-[0.12em] text-sm shadow-[0_0_24px_rgba(255,122,0,0.5),4px_4px_0_#14002e] transition hover:-translate-y-0.5"
          >
            Play & Earn Now
          </Link>
          <Link
            href="#battlepass"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border-2 border-[#ff2bd6]/40 bg-[linear-gradient(180deg,rgba(255,43,214,0.18)_0%,rgba(20,0,46,0.82)_100%)] text-white font-russo font-black uppercase tracking-[0.12em] text-sm shadow-[0_0_18px_rgba(255,43,214,0.3)] backdrop-blur-sm transition hover:-translate-y-0.5"
          >
            Battle Pass
          </Link>
        </div>
      </section>

      {/* ============= CURRENCIES ============= */}
      <section id="currencies" className="relative z-10 py-14 md:py-18 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,210,31,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(0,200,255,0.05),transparent_50%)]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-center font-russo text-xs uppercase tracking-[0.2em] text-white/40 mb-8">
            Your Arsenal
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                name: "ZUNO Coins", value: "128,450", color: "#ffd21f",
                desc: "The foundation of your empire. Earn through battles, quests, and daily rewards.",
                uses: ["Hero Upgrades", "Armor Forging", "Ability Boosting", "Arena Unlocks"],
                pct: 74
              },
              {
                name: "Rift Crystals", value: "2,840", color: "#ff2bd6",
                desc: "Rare mystical currency forged in dimensional rifts. Unlock legendary power.",
                uses: ["Legendary Skins", "Rare Summons", "Mystical Upgrades"],
                pct: 42
              },
              {
                name: "Energy Orbs", value: "9,220", color: "#00c8ff",
                desc: "Pure combat energy. Fuel your abilities and supercharge your team.",
                uses: ["Power Boosts", "Combat Abilities", "AI Enhancements"],
                pct: 88
              },
            ].map((c) => (
              <div
                key={c.name}
                className="group relative rounded-xl border bg-[linear-gradient(180deg,rgba(20,0,46,0.65)_0%,rgba(2,6,23,0.85)_100%)] p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_var(--glow)]"
                style={{
                  borderColor: `${c.color}33`,
                  "--glow": `${c.color}30`,
                } as React.CSSProperties}
              >
                {/* Animated glow ring */}
                <div
                  className="absolute -top-px -left-px -right-px -bottom-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 20px ${c.color}20, 0 0 30px ${c.color}15` }}
                />

                <div className="relative flex items-center gap-4 mb-4">
                  {/* Pulsing currency icon */}
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-full border-[3px] flex items-center justify-center"
                      style={{
                        borderColor: c.color,
                        backgroundColor: `${c.color}12`,
                        boxShadow: `0 0 20px ${c.color}30`,
                      }}
                    >
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: c.color, boxShadow: `0 0 12px ${c.color}60` }}
                      />
                    </div>
                    {/* Pulse ring animation */}
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-20"
                      style={{ borderColor: c.color, border: `2px solid ${c.color}` }}
                    />
                  </div>
                  <div>
                    <h3 className="font-russo text-xs uppercase tracking-[0.13em]" style={{ color: c.color }}>{c.name}</h3>
                    <p className="font-bangers text-2xl text-white tracking-wider" style={{ textShadow: `0 0 10px ${c.color}40` }}>{c.value}</p>
                  </div>
                </div>

                <p className="text-xs text-white/50 font-inter leading-relaxed mb-4">{c.desc}</p>

                <div className="space-y-1.5 mb-4">
                  {c.uses.map((u) => (
                    <div key={u} className="flex items-center gap-2 text-xs text-white/60 font-inter">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                      {u}
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="rounded-lg border border-white/8 bg-white/5 p-3">
                  <div className="flex justify-between text-[10px] uppercase text-white/40 font-russo tracking-wider mb-1.5">
                    <span>Weekly Gain</span><span>{c.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${c.pct}%`,
                        background: `linear-gradient(90deg, ${c.color}, ${c.color}cc)`,
                        boxShadow: `0 0 8px ${c.color}50`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= REWARD CHESTS ============= */}
      <section className="relative z-10 py-14 md:py-18 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,122,0,0.06),transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-center font-russo text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
            Collect & Open
          </p>
          <h2 className="text-center font-bangers text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] tracking-[0.04em] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] mb-10">
            REWARD <span className="text-[#ff7a00]">CHESTS</span>
          </h2>

          <div className="grid gap-5 grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Bronze Chest", rarity: "Common", status: "Ready to Open", color: "#cd7f32", glowColor: "rgba(205,127,50,0.3)", items: "3-5 Items" },
              { name: "Silver Chest", rarity: "Rare", status: "2 Wins Left", color: "#c0c0c0", glowColor: "rgba(192,192,192,0.3)", items: "5-8 Items" },
              { name: "Gold Chest", rarity: "Epic", status: "4 Wins Left", color: "#ffd21f", glowColor: "rgba(255,210,31,0.3)", items: "8-12 Items" },
              { name: "Prism Chest", rarity: "Legendary", status: "Season Reward", color: "#ff2bd6", glowColor: "rgba(255,43,214,0.3)", items: "12-20 Items" },
            ].map((ch) => (
              <div
                key={ch.name}
                className="group relative rounded-xl border bg-[linear-gradient(180deg,rgba(20,0,46,0.7)_0%,rgba(2,6,23,0.9)_100%)] p-5 text-center transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                style={{
                  borderColor: `${ch.color}33`,
                  boxShadow: hoveredChest === ch.name ? `0 0 40px ${ch.glowColor}` : `0 0 15px ${ch.glowColor}`,
                }}
                onMouseEnter={() => setHoveredChest(ch.name)}
                onMouseLeave={() => setHoveredChest(null)}
              >
                {/* Chest icon */}
                <div className="relative mx-auto w-16 h-16 mb-4">
                  <div
                    className="w-16 h-16 rounded-lg border-2 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      borderColor: ch.color,
                      backgroundColor: `${ch.color}15`,
                      boxShadow: `0 0 20px ${ch.glowColor}, inset 0 0 10px ${ch.color}10`,
                    }}
                  >
                    {/* Inner chest shimmer */}
                    <div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, transparent 30%, ${ch.color}30 50%, transparent 70%)`,
                      }}
                    />
                    {/* Chest diamond shape */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-6 h-6 rotate-45 rounded-sm"
                        style={{ backgroundColor: ch.color, boxShadow: `0 0 12px ${ch.color}80` }}
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-russo text-xs uppercase tracking-[0.1em] text-white">{ch.name}</h3>
                <p className="mt-1 text-[10px] uppercase tracking-wider font-russo" style={{ color: ch.color }}>{ch.rarity}</p>
                <p className="mt-2 text-[11px] text-white/40 font-inter">{ch.items}</p>
                <p className="mt-1 text-[11px] text-white/60 font-inter">{ch.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= UNLOCKABLE SKINS ============= */}
      <section className="relative z-10 py-14 md:py-18 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(255,43,214,0.05),transparent_50%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-center font-russo text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
            Premium Collection
          </p>
          <h2 className="text-center font-bangers text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] tracking-[0.04em] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] mb-10">
            UNLOCKABLE <span className="text-[#ff2bd6]">SKINS</span>
          </h2>

          <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
            {[
              { name: "Neon Warden", rarity: "Epic", cost: "900 Crystals", color: "#ff2bd6" },
              { name: "Solar Viper", rarity: "Legendary", cost: "1,800 Crystals", color: "#ffd21f" },
              { name: "Rift Marauder", rarity: "Rare", cost: "450 Crystals", color: "#00c8ff" },
              { name: "Pulse Striker", rarity: "Epic", cost: "750 Crystals", color: "#ff7a00" },
              { name: "Arc Sentinel", rarity: "Legendary", cost: "2,100 Crystals", color: "#ffd21f" },
              { name: "Abyss Runner", rarity: "Rare", cost: "380 Crystals", color: "#00c8ff" },
            ].map((s) => (
              <div
                key={s.name}
                className="group relative rounded-xl border bg-[linear-gradient(180deg,rgba(20,0,46,0.7)_0%,rgba(2,6,23,0.9)_100%)] overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                style={{
                  borderColor: `${s.color}33`,
                  boxShadow: hoveredSkin === s.name ? `0 0 35px ${s.color}30` : `0 0 12px ${s.color}15`,
                }}
                onMouseEnter={() => setHoveredSkin(s.name)}
                onMouseLeave={() => setHoveredSkin(null)}
              >
                {/* Skin preview area */}
                <div className="relative h-32 md:h-40 overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `radial-gradient(circle at 50% 60%, ${s.color}20, transparent 65%)`,
                    }}
                  />
                  {/* Character silhouette placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-16 h-20 md:w-20 md:h-24 rounded-t-full rounded-b-xl border-2 transition-all duration-300 group-hover:shadow-[0_0_25px_var(--skin-glow)]"
                      style={{
                        borderColor: `${s.color}50`,
                        backgroundColor: `${s.color}10`,
                        "--skin-glow": `${s.color}40`,
                      } as React.CSSProperties}
                    />
                  </div>
                  {/* Animated border glow */}
                  <div
                    className="absolute inset-0 border-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ borderColor: `${s.color}40` }}
                  />
                </div>

                {/* Skin info */}
                <div className="p-4">
                  <h3 className="font-russo text-xs uppercase tracking-[0.1em] text-white">{s.name}</h3>
                  <p className="mt-1 text-[10px] uppercase tracking-wider font-russo" style={{ color: s.color }}>{s.rarity}</p>
                  <p className="mt-2 text-xs text-white/50 font-inter">{s.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= DAILY STREAK ============= */}
      <section className="relative z-10 py-14 md:py-18 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(0,200,255,0.05),transparent_50%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <p className="font-russo text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                Daily Rewards
              </p>
              <h2 className="font-bangers text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] tracking-[0.04em] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
                DAILY <span className="text-[#00c8ff]">STREAK</span>
              </h2>
            </div>
            <div className="mt-4 sm:mt-0 rounded-full border border-[#00c8ff]/40 bg-[#00c8ff]/10 px-4 py-2 font-russo text-[10px] uppercase tracking-wider text-[#00c8ff] shadow-[0_0_12px_rgba(0,200,255,0.15)]">
              Streak: 6 Days Active
            </div>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {[
              { day: 1, reward: "100 Coins", done: true, color: "#ffd21f" },
              { day: 2, reward: "2 Energy Orbs", done: true, color: "#00c8ff" },
              { day: 3, reward: "Small Chest", done: true, color: "#cd7f32" },
              { day: 4, reward: "150 Coins", done: true, color: "#ffd21f" },
              { day: 5, reward: "5 Energy Orbs", done: true, color: "#00c8ff" },
              { day: 6, reward: "50 Crystals", done: true, color: "#ff2bd6" },
              { day: 7, reward: "Epic Chest", done: false, color: "#ffd21f" },
            ].map((d) => (
              <div
                key={d.day}
                className={`relative rounded-xl border p-3 md:p-4 text-center transition-all duration-300 ${
                  d.done
                    ? "border-[#00c8ff]/30 bg-[#00c8ff]/5"
                    : d.day === 7
                    ? "border-[#ffd21f]/40 bg-[#ffd21f]/5 shadow-[0_0_20px_rgba(255,210,31,0.15)]"
                    : "border-white/10 bg-white/3"
                }`}
              >
                <p className="font-russo text-[9px] md:text-[10px] uppercase tracking-wider text-white/40">Day {d.day}</p>
                <div
                  className="mx-auto mt-2 w-6 h-6 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center"
                  style={{
                    borderColor: d.done ? "#00c8ff" : `${d.color}50`,
                    backgroundColor: d.done ? "#00c8ff20" : `${d.color}08`,
                  }}
                >
                  {d.done ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00c8ff]" />
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: `${d.color}40` }} />
                  )}
                </div>
                <p className="mt-2 text-[9px] md:text-[10px] font-inter text-white/60 leading-tight">{d.reward}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= BATTLE PASS ============= */}
      <section id="battlepass" className="relative z-10 py-14 md:py-18 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,43,214,0.06),transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
            <div>
              <p className="font-russo text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                Season: Neon Rift
              </p>
              <h2 className="font-bangers text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] tracking-[0.04em] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
                BATTLE <span className="text-[#ff2bd6]">PASS</span>
              </h2>
            </div>
            <div className="mt-4 sm:mt-0 rounded-full border border-[#ff2bd6]/40 bg-[#ff2bd6]/10 px-4 py-2 font-russo text-[10px] uppercase tracking-wider text-[#ff2bd6] shadow-[0_0_12px_rgba(255,43,214,0.15)]">
              19 Days Remaining
            </div>
          </div>

          {/* Tier progression rail */}
          <div className="space-y-3">
            {[
              { tier: 1, free: "Coins x200", premium: "Rift Crystal x100", pct: 100, color: "#ffd21f" },
              { tier: 5, free: "Energy Orb x8", premium: "Rare Skin", pct: 100, color: "#00c8ff" },
              { tier: 10, free: "Prism Chest", premium: "Void Lance", pct: 80, color: "#ff7a00" },
              { tier: 15, free: "Coins x500", premium: "Epic Emote", pct: 45, color: "#ff2bd6" },
              { tier: 20, free: "Rift Crystal x250", premium: "Legendary Skin", pct: 0, color: "#ffd21f" },
            ].map((t) => (
              <div key={t.tier} className="relative rounded-xl border border-white/8 bg-[linear-gradient(180deg,rgba(20,0,46,0.5)_0%,rgba(2,6,23,0.75)_100%)] p-4 overflow-hidden">
                {/* Progress background fill */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    width: `${t.pct}%`,
                    background: `linear-gradient(90deg, ${t.color}, transparent)`,
                  }}
                />

                <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-lg border-2 flex items-center justify-center font-russo text-sm"
                      style={{
                        borderColor: t.pct === 100 ? t.color : `${t.color}40`,
                        backgroundColor: t.pct === 100 ? `${t.color}20` : `${t.color}08`,
                        color: t.color,
                        boxShadow: t.pct === 100 ? `0 0 12px ${t.color}30` : "none",
                      }}
                    >
                      {t.tier}
                    </div>
                    <span className="font-russo text-xs text-white uppercase tracking-wider">Tier {t.tier}</span>
                  </div>

                  <div className="flex-1 grid gap-2 sm:grid-cols-2 w-full">
                    <div className="rounded border border-[#00c8ff]/15 bg-[#00c8ff]/5 px-3 py-2 text-[11px] text-[#00c8ff] font-inter">
                      <span className="text-white/30 font-russo text-[9px] uppercase tracking-wider">Free </span>
                      {t.free}
                    </div>
                    <div className="rounded border border-[#ff2bd6]/15 bg-[#ff2bd6]/5 px-3 py-2 text-[11px] text-[#ff2bd6] font-inter">
                      <span className="text-white/30 font-russo text-[9px] uppercase tracking-wider">Premium </span>
                      {t.premium}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="relative mt-3 h-1.5 rounded-full bg-white/8 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${t.pct}%`,
                      background: `linear-gradient(90deg, ${t.color}, ${t.color}aa)`,
                      boxShadow: `0 0 8px ${t.color}50`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= HOW TO EARN ============= */}
      <section className="relative z-10 w-full bg-[#020617] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_40%,rgba(0,200,255,0.07),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_55%,rgba(255,122,0,0.06),transparent_50%)]" />

        <div className="relative max-w-[960px] mx-auto px-4 sm:px-6 py-14 md:py-18">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            <div className="lg:w-[340px] flex-shrink-0 pt-2">
              <h2 className="font-bangers text-[clamp(2.6rem,7vw,5rem)] leading-[0.92] tracking-[0.04em] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.65)]">
                FIGHT HARDER.
                <span className="block text-[#ffd21f]">EARN MORE.</span>
              </h2>
              <p className="mt-4 text-white/90 text-sm font-inter leading-relaxed">
                Every battle fills your vault. Win arena matches, complete daily challenges, climb ranked ladders, and watch your rewards multiply.
              </p>
              <Link href="/how-to-play" className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#ffd21f]/45 bg-[linear-gradient(180deg,rgba(255,210,31,0.12)_0%,rgba(2,6,23,0.92)_100%)] font-russo text-xs uppercase tracking-[0.13em] text-white shadow-[0_0_14px_rgba(255,210,31,0.22)] backdrop-blur-sm transition hover:-translate-y-0.5">
                Learn to Play →
              </Link>
            </div>

            {/* Earn methods */}
            <div className="relative flex-1 max-w-[500px] mx-auto lg:mx-0">
              <div className="absolute inset-[-4px] rounded-2xl bg-[linear-gradient(120deg,#ffd21f,#ff7a00)] blur-sm opacity-60" />
              <div className="relative rounded-2xl border-2 border-[#ffd21f]/50 overflow-hidden bg-[#020617] shadow-[0_0_28px_rgba(255,210,31,0.20)] p-6">
                <div className="space-y-4">
                  {[
                    { method: "Arena Victories", reward: "+50-200 Coins", color: "#ffd21f" },
                    { method: "Daily Challenges", reward: "+100 Coins + Orbs", color: "#00c8ff" },
                    { method: "Ranked Matches", reward: "+Crystals + XP", color: "#ff2bd6" },
                    { method: "Weekly Tournaments", reward: "+Epic Chests", color: "#ff7a00" },
                    { method: "Battle Pass Progress", reward: "+Premium Rewards", color: "#7cff00" },
                  ].map((e) => (
                    <div key={e.method} className="flex items-center justify-between rounded-lg border border-white/8 bg-white/3 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: e.color, boxShadow: `0 0 8px ${e.color}50` }} />
                        <span className="font-russo text-xs uppercase tracking-wider text-white">{e.method}</span>
                      </div>
                      <span className="text-[11px] font-inter" style={{ color: e.color }}>{e.reward}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============= FINAL CTA ============= */}
      <section className="relative z-10 py-16 md:py-20 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,122,0,0.08),transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/8 pt-10 text-center mb-12">
            {[
              { v: "3", l: "Currencies", c: "#ffd21f" },
              { v: "4", l: "Chest Rarities", c: "#ff7a00" },
              { v: "20", l: "Battle Pass Tiers", c: "#ff2bd6" },
              { v: "7", l: "Daily Streaks", c: "#00c8ff" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-russo text-3xl sm:text-4xl" style={{ color: s.c, textShadow: `0 0 14px ${s.c}77` }}>{s.v}</div>
                <div className="mt-1 font-russo text-[10px] sm:text-xs uppercase tracking-[0.13em] text-white/55">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h2 className="font-bangers text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.92] tracking-[0.04em] text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffd21f_0%,#ff7a00_45%,#ff2bd6_100%)] drop-shadow-[0_5px_8px_rgba(0,0,0,0.65)]">
              THE MORE YOU PLAY, THE MORE YOU EARN.
            </h2>
            <p className="mt-4 text-white/70 text-sm font-inter max-w-md mx-auto">
              Every battle, every challenge, every streak — your vault grows. Start earning now.
            </p>

            <div className="relative mt-8 flex items-center justify-center">
              <div className="absolute left-[-10px] md:left-[-24px] bottom-[-6px] w-[90px] md:w-[120px] opacity-90 pointer-events-none select-none">
                <img
                  src="/images/character-showcase.png"
                  alt=""
                  className="w-full h-auto object-contain drop-shadow-[0_0_16px_rgba(255,210,31,0.35)]"
                  style={{ transform: "scaleX(-1)" }}
                />
              </div>

              <Link
                href="/how-to-play"
                className="relative z-10 inline-flex items-center gap-2 px-12 py-4 rounded-lg border-[2.5px] border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black font-russo font-black uppercase tracking-[0.13em] text-sm shadow-[0_0_28px_rgba(255,122,0,0.55),5px_5px_0_#14002e] transition hover:-translate-y-0.5"
              >
                Play Now
              </Link>

              <div className="absolute right-[-10px] md:right-[-24px] bottom-[-4px] w-[90px] md:w-[120px] opacity-90 pointer-events-none select-none">
                <img
                  src="/images/character-showcase.png"
                  alt=""
                  className="w-full h-auto object-contain drop-shadow-[0_0_16px_rgba(255,43,214,0.35)]"
                />
              </div>
            </div>

            <p className="mt-6 text-center text-white/85 text-sm font-inter max-w-md mx-auto">
              Collect, upgrade, and evolve powerful animals. Your legend starts now.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
