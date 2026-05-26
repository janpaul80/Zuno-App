"use client";

import Link from "next/link";
import { useState } from "react";

export default function RewardsCoinsPage() {
  const [hoveredChest, setHoveredChest] = useState<string | null>(null);
  const [hoveredSkin, setHoveredSkin] = useState<string | null>(null);

  return (
    <div className="relative overflow-x-hidden">
      {/* ===== CONTINUOUS CINEMATIC CANVAS ===== */}
      {/* One single ambient environment that flows through the entire page */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[120%] h-[30%] bg-[radial-gradient(ellipse_at_center,rgba(255,210,31,0.04),transparent_60%)]" />
        <div className="absolute top-[55%] right-0 w-[50%] h-[25%] bg-[radial-gradient(circle_at_right,rgba(255,43,214,0.05),transparent_60%)]" />
        <div className="absolute top-[70%] left-0 w-[50%] h-[25%] bg-[radial-gradient(circle_at_left,rgba(0,200,255,0.04),transparent_60%)]" />
        <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-[80%] h-[15%] bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.06),transparent_55%)]" />
      </div>

      {/* ===== HERO — CINEMATIC ANCHOR ===== */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full pt-[8.5rem]">
          <img
            src="/rewards-coins.png"
            alt="ZUNO Rewards Command Center — characters bursting from treasure chest with coins and crystals"
            className="block w-full h-auto object-cover object-[center_top]"
            style={{ maxHeight: "100vh", minHeight: "500px" }}
          />
          {/* Hero dissolve — warm gold at bottom bleeding into the dark canvas */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.15)_0%,rgba(2,6,23,0)_15%,rgba(2,6,23,0)_50%,rgba(2,6,23,0.7)_80%,rgba(2,6,23,1)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_bottom,rgba(255,210,31,0.08),transparent_50%)]" />
        </div>

        {/* Hero text — floating over artwork lower third */}
        <div className="absolute bottom-20 md:bottom-24 left-0 right-0 z-10 text-center px-4">
          <p className="font-russo text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#ffd21f] drop-shadow-[0_0_10px_rgba(255,210,31,0.5)]">
            Rewards Command Center
          </p>
          <h1 className="mt-3 font-bangers text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.88] tracking-[0.04em] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            EARN. UPGRADE.{" "}
            <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffd21f,#ff7a00)]">
              DOMINATE.
            </span>
          </h1>
          <p className="mt-3 text-white/65 text-sm font-inter max-w-md mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Play, complete challenges, and climb the ranks. Every victory earns you valuable rewards.
          </p>
          <Link
            href="/how-to-play"
            className="mt-5 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border-[2.5px] border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black font-russo font-black uppercase tracking-[0.12em] text-sm shadow-[0_0_28px_rgba(255,122,0,0.5),4px_4px_0_#14002e] transition hover:-translate-y-0.5"
          >
            Play & Earn Now
          </Link>
        </div>
      </section>

      {/* ===== CURRENCIES — holographic HUD panels ===== */}
      {/* No hard section break — flows directly from hero dissolve */}
      <div className="relative z-10 -mt-6 md:-mt-10 pb-16 md:pb-20">
        <p className="text-center font-russo text-[10px] uppercase tracking-[0.3em] text-[#ffd21f]/60 mb-6">
          ✦ Currencies ✦
        </p>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid gap-4 md:grid-cols-3">
          {[
            {
              name: "ZUNO Coins", value: "128,450", gain: "+12,450", color: "#ffd21f",
              desc: "Upgrades · Armor · Abilities · Arena",
              pct: 74
            },
            {
              name: "Rift Crystals", value: "2,840", gain: "+560", color: "#ff2bd6",
              desc: "Legendary Skins · Rare Summons · Mystic Power",
              pct: 42
            },
            {
              name: "Energy Orbs", value: "9,220", gain: "+2,120", color: "#00c8ff",
              desc: "Power Boosts · Combat Abilities · AI Enhancements",
              pct: 88
            },
          ].map((c) => (
            <div
              key={c.name}
              className="group relative rounded-xl backdrop-blur-md p-5 transition-all duration-500 hover:-translate-y-1"
              style={{
                background: `linear-gradient(135deg, ${c.color}08, rgba(2,6,23,0.6), ${c.color}05)`,
                border: `1px solid ${c.color}20`,
                boxShadow: `0 0 20px ${c.color}10, inset 0 1px 0 ${c.color}15`,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `0 0 40px ${c.color}20, inset 0 0 20px ${c.color}08` }}
              />

              <div className="relative flex items-center gap-4 mb-3">
                {/* Currency orb with pulse */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: `radial-gradient(circle, ${c.color}30, ${c.color}08)`,
                      boxShadow: `0 0 16px ${c.color}25`,
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: c.color, boxShadow: `0 0 10px ${c.color}80` }}
                    />
                  </div>
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-15"
                    style={{ border: `1.5px solid ${c.color}` }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-russo text-[10px] uppercase tracking-[0.15em]" style={{ color: c.color }}>{c.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bangers text-xl text-white tracking-wider" style={{ textShadow: `0 0 8px ${c.color}30` }}>{c.value}</span>
                    <span className="text-[10px] font-inter text-[#7cff00]">{c.gain}</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-white/35 font-inter tracking-wide mb-3">{c.desc}</p>

              {/* Progress */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${c.pct}%`,
                      background: `linear-gradient(90deg, ${c.color}, ${c.color}99)`,
                      boxShadow: `0 0 6px ${c.color}40`,
                    }}
                  />
                </div>
                <span className="text-[9px] font-russo tracking-wider text-white/30">{c.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== CHESTS + SKINS — side by side, same environment ===== */}
      <div className="relative z-10 pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid gap-6 lg:grid-cols-2">

          {/* REWARD CHESTS */}
          <div
            className="relative rounded-2xl backdrop-blur-md p-6 overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(255,122,0,0.04), rgba(2,6,23,0.5))",
              border: "1px solid rgba(255,122,0,0.15)",
              boxShadow: "0 0 30px rgba(255,122,0,0.06)",
            }}
          >
            <h2 className="font-bangers text-lg tracking-[0.06em] text-[#ff7a00] mb-1">
              ✦ REWARD CHESTS
            </h2>
            <p className="text-[10px] text-white/30 font-inter mb-5">Collect victories, unlock treasure</p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Bronze", rarity: "Common", status: "Ready", wins: "Claim", color: "#cd7f32", ready: true },
                { name: "Silver", rarity: "Rare", status: "2 Wins Left", wins: "2/4", color: "#a0b4c8", ready: false },
                { name: "Gold", rarity: "Epic", status: "4 Wins Left", wins: "3/7", color: "#ffd21f", ready: false },
                { name: "Prism", rarity: "Legendary", status: "7 Wins Left", wins: "1/8", color: "#ff2bd6", ready: false },
              ].map((ch) => (
                <div
                  key={ch.name}
                  className="group relative rounded-xl p-3.5 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: `linear-gradient(180deg, ${ch.color}08, rgba(2,6,23,0.7))`,
                    border: `1px solid ${ch.color}25`,
                    boxShadow: hoveredChest === ch.name ? `0 0 30px ${ch.color}25` : `0 0 12px ${ch.color}08`,
                  }}
                  onMouseEnter={() => setHoveredChest(ch.name)}
                  onMouseLeave={() => setHoveredChest(null)}
                >
                  {/* Shimmer sweep on hover */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `linear-gradient(120deg, transparent 30%, ${ch.color}15 50%, transparent 70%)`,
                    }}
                  />

                  {/* Chest icon — glowing gem shape */}
                  <div className="relative mx-auto w-10 h-10 mb-2">
                    <div
                      className="w-10 h-10 rounded-lg border transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
                      style={{
                        borderColor: `${ch.color}50`,
                        background: `radial-gradient(circle, ${ch.color}20, transparent)`,
                        boxShadow: `0 0 14px ${ch.color}20`,
                      }}
                    >
                      <div
                        className="w-4 h-4 rotate-45 rounded-sm"
                        style={{ backgroundColor: ch.color, boxShadow: `0 0 8px ${ch.color}70` }}
                      />
                    </div>
                  </div>

                  <p className="font-russo text-[10px] uppercase tracking-wider text-white">{ch.name} Chest</p>
                  <p className="text-[9px] uppercase tracking-wider font-russo mt-0.5" style={{ color: ch.color }}>{ch.rarity}</p>

                  {/* Progress or claim */}
                  {ch.ready ? (
                    <div className="mt-2 rounded-md py-1 text-[9px] font-russo uppercase tracking-wider text-black bg-[linear-gradient(90deg,#7cff00,#00c8ff)] shadow-[0_0_8px_rgba(124,255,0,0.3)]">
                      Claim
                    </div>
                  ) : (
                    <div className="mt-2">
                      <p className="text-[9px] text-white/35 font-inter">{ch.status}</p>
                      <div className="mt-1 h-1 rounded-full bg-white/8 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: ch.wins === "2/4" ? "50%" : ch.wins === "3/7" ? "43%" : "12.5%", background: `linear-gradient(90deg, ${ch.color}, ${ch.color}88)`, boxShadow: `0 0 4px ${ch.color}40` }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* UNLOCKABLE SKINS */}
          <div
            className="relative rounded-2xl backdrop-blur-md p-6 overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(255,43,214,0.04), rgba(2,6,23,0.5))",
              border: "1px solid rgba(255,43,214,0.15)",
              boxShadow: "0 0 30px rgba(255,43,214,0.06)",
            }}
          >
            <h2 className="font-bangers text-lg tracking-[0.06em] text-[#ff2bd6] mb-1">
              ✦ UNLOCKABLE SKINS
            </h2>
            <p className="text-[10px] text-white/30 font-inter mb-5">Premium character collection</p>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { name: "Neon Warden", rarity: "Epic", cost: 900, color: "#8b5cf6", bg: "from-violet-900/40 to-violet-950/20" },
                { name: "Solar Viper", rarity: "Legendary", cost: 1800, color: "#ffd21f", bg: "from-amber-900/30 to-amber-950/15" },
                { name: "Rift Marauder", rarity: "Rare", cost: 450, color: "#00c8ff", bg: "from-cyan-900/30 to-cyan-950/15" },
                { name: "Pulse Striker", rarity: "Common", cost: 120, color: "#a0b4c8", bg: "from-slate-800/30 to-slate-900/15" },
                { name: "Arc Sentinel", rarity: "Epic", cost: 750, color: "#8b5cf6", bg: "from-violet-900/40 to-violet-950/20" },
                { name: "Abyss Runner", rarity: "Legendary", cost: 2100, color: "#ffd21f", bg: "from-amber-900/30 to-amber-950/15" },
              ].map((s) => (
                <div
                  key={s.name}
                  className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{
                    border: `1px solid ${s.color}20`,
                    boxShadow: hoveredSkin === s.name ? `0 0 25px ${s.color}25` : `0 0 8px ${s.color}08`,
                  }}
                  onMouseEnter={() => setHoveredSkin(s.name)}
                  onMouseLeave={() => setHoveredSkin(null)}
                >
                  {/* Character atmosphere — radial glow, no empty box */}
                  <div className="relative h-24 md:h-28 overflow-hidden">
                    <div
                      className="absolute inset-0 transition-transform duration-500 group-hover:scale-125"
                      style={{
                        background: `radial-gradient(ellipse at 50% 70%, ${s.color}25, ${s.color}08 40%, transparent 70%)`,
                      }}
                    />
                    {/* Energy wisps */}
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-16 opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(to top, ${s.color}30, transparent)`,
                        filter: "blur(6px)",
                      }}
                    />
                    {/* Rarity badge */}
                    <div className="absolute top-1.5 right-1.5">
                      <span className="text-[7px] font-russo uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ color: s.color, backgroundColor: `${s.color}15`, border: `1px solid ${s.color}25` }}>
                        {s.rarity}
                      </span>
                    </div>
                    {/* Animated border energy on hover */}
                    <div
                      className="absolute inset-0 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ boxShadow: `inset 0 0 15px ${s.color}15` }}
                    />
                  </div>

                  {/* Skin info */}
                  <div className="relative p-2.5" style={{ background: `linear-gradient(180deg, ${s.color}06, rgba(2,6,23,0.8))` }}>
                    <p className="font-russo text-[9px] uppercase tracking-wider text-white truncate">{s.name}</p>
                    <p className="text-[9px] font-inter text-white/40 mt-0.5">⚡ {s.cost.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== DAILY STREAK + BATTLE PASS — side by side ===== */}
      <div className="relative z-10 pb-16 md:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid gap-6 lg:grid-cols-2">

          {/* DAILY REWARD STREAK */}
          <div
            className="relative rounded-2xl backdrop-blur-md p-6 overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(0,200,255,0.04), rgba(2,6,23,0.5))",
              border: "1px solid rgba(0,200,255,0.15)",
              boxShadow: "0 0 30px rgba(0,200,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bangers text-lg tracking-[0.06em] text-[#00c8ff]">
                ✦ DAILY STREAK
              </h2>
              <span className="rounded-full px-3 py-1 font-russo text-[8px] uppercase tracking-wider text-[#00c8ff]" style={{ background: "rgba(0,200,255,0.1)", border: "1px solid rgba(0,200,255,0.25)" }}>
                6 Days
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 md:gap-2">
              {[
                { day: 1, reward: "100 Coins", done: true },
                { day: 2, reward: "2 Orbs", done: true },
                { day: 3, reward: "Chest", done: true },
                { day: 4, reward: "150 Coins", done: true },
                { day: 5, reward: "5 Orbs", done: true },
                { day: 6, reward: "50 Crystals", done: true },
                { day: 7, reward: "Epic Chest", done: false },
              ].map((d) => (
                <div
                  key={d.day}
                  className={`relative rounded-lg p-2 text-center transition-all duration-300 ${d.day === 7 ? "col-span-4 md:col-span-1" : ""}`}
                  style={{
                    background: d.done ? "rgba(0,200,255,0.06)" : d.day === 7 ? "rgba(255,210,31,0.06)" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${d.done ? "rgba(0,200,255,0.2)" : d.day === 7 ? "rgba(255,210,31,0.25)" : "rgba(255,255,255,0.06)"}`,
                    boxShadow: d.day === 7 ? "0 0 15px rgba(255,210,31,0.1)" : "none",
                  }}
                >
                  <p className="font-russo text-[8px] uppercase tracking-wider text-white/30">Day {d.day}</p>
                  <div className="mx-auto mt-1.5 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: d.done ? "rgba(0,200,255,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${d.done ? "#00c8ff" : "rgba(255,255,255,0.1)"}` }}>
                    {d.done && <div className="w-2 h-2 rounded-full bg-[#00c8ff]" />}
                  </div>
                  <p className="mt-1.5 text-[8px] font-inter text-white/45 leading-tight">{d.reward}</p>
                </div>
              ))}
            </div>
          </div>

          {/* BATTLE PASS */}
          <div
            className="relative rounded-2xl backdrop-blur-md p-6 overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(255,43,214,0.04), rgba(2,6,23,0.5))",
              border: "1px solid rgba(255,43,214,0.15)",
              boxShadow: "0 0 30px rgba(255,43,214,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-bangers text-lg tracking-[0.06em] text-[#ff2bd6]">
                  ✦ BATTLE PASS
                </h2>
                <p className="text-[9px] text-white/30 font-inter">Season: Neon Rift</p>
              </div>
              <span className="rounded-full px-3 py-1 font-russo text-[8px] uppercase tracking-wider text-[#ff2bd6]" style={{ background: "rgba(255,43,214,0.1)", border: "1px solid rgba(255,43,214,0.25)" }}>
                19 Days Left
              </span>
            </div>

            <div className="space-y-2">
              {[
                { tier: 1, free: "200 Coins", premium: "100 Crystals", pct: 100, color: "#ffd21f" },
                { tier: 5, free: "8 Orbs", premium: "Rare Skin", pct: 100, color: "#00c8ff" },
                { tier: 10, free: "Prism Chest", premium: "Void Lance", pct: 80, color: "#ff7a00" },
                { tier: 15, free: "500 Coins", premium: "Epic Emote", pct: 45, color: "#ff2bd6" },
                { tier: 20, free: "250 Crystals", premium: "Legendary Skin", pct: 0, color: "#ffd21f" },
              ].map((t) => (
                <div
                  key={t.tier}
                  className="relative rounded-lg overflow-hidden"
                  style={{
                    background: "rgba(2,6,23,0.4)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Progress fill behind content */}
                  <div className="absolute inset-0 pointer-events-none" style={{ width: `${t.pct}%`, background: `linear-gradient(90deg, ${t.color}08, transparent)` }} />

                  <div className="relative flex items-center gap-2 p-2.5">
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center font-russo text-[10px] flex-shrink-0"
                      style={{
                        color: t.color,
                        background: t.pct === 100 ? `${t.color}18` : `${t.color}08`,
                        border: `1px solid ${t.pct === 100 ? `${t.color}50` : `${t.color}20`}`,
                        boxShadow: t.pct === 100 ? `0 0 8px ${t.color}20` : "none",
                      }}
                    >
                      {t.tier}
                    </div>
                    <div className="flex-1 min-w-0 grid grid-cols-2 gap-1.5">
                      <span className="text-[8px] font-inter text-[#00c8ff] truncate">{t.free}</span>
                      <span className="text-[8px] font-inter text-[#ff2bd6] truncate">{t.premium}</span>
                    </div>
                  </div>

                  {/* Thin progress bar at bottom */}
                  <div className="h-0.5 bg-white/5">
                    <div className="h-full" style={{ width: `${t.pct}%`, background: `linear-gradient(90deg, ${t.color}, ${t.color}88)` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== HOW TO EARN — cinematic split ===== */}
      <div className="relative z-10 pb-16 md:pb-20">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            <div className="lg:w-[340px] flex-shrink-0 pt-2">
              <h2 className="font-bangers text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.90] tracking-[0.04em] text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
                FIGHT HARDER.
                <span className="block text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffd21f,#ff7a00)]">EARN MORE.</span>
              </h2>
              <p className="mt-4 text-white/65 text-sm font-inter leading-relaxed">
                Every battle fills your vault. Win arena matches, complete daily challenges, climb ranked ladders, and watch your rewards multiply.
              </p>
              <Link href="/how-to-play" className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-russo text-xs uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5" style={{ background: "linear-gradient(180deg, rgba(255,210,31,0.12), rgba(2,6,23,0.9))", border: "1px solid rgba(255,210,31,0.3)", boxShadow: "0 0 12px rgba(255,210,31,0.15)" }}>
                Learn to Play →
              </Link>
            </div>

            <div className="relative flex-1 max-w-[500px] mx-auto lg:mx-0">
              <div
                className="rounded-2xl backdrop-blur-md p-5 space-y-2.5"
                style={{
                  background: "linear-gradient(180deg, rgba(255,210,31,0.04), rgba(2,6,23,0.5))",
                  border: "1px solid rgba(255,210,31,0.15)",
                  boxShadow: "0 0 30px rgba(255,210,31,0.08)",
                }}
              >
                {[
                  { method: "Arena Victories", reward: "+50-200 Coins", color: "#ffd21f" },
                  { method: "Daily Challenges", reward: "+100 Coins + Orbs", color: "#00c8ff" },
                  { method: "Ranked Matches", reward: "+Crystals + XP", color: "#ff2bd6" },
                  { method: "Weekly Tournaments", reward: "+Epic Chests", color: "#ff7a00" },
                  { method: "Battle Pass Progress", reward: "+Premium Rewards", color: "#7cff00" },
                ].map((e) => (
                  <div key={e.method} className="flex items-center justify-between rounded-lg px-3.5 py-2.5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: e.color, boxShadow: `0 0 6px ${e.color}50` }} />
                      <span className="font-russo text-[10px] uppercase tracking-wider text-white">{e.method}</span>
                    </div>
                    <span className="text-[10px] font-inter" style={{ color: e.color }}>{e.reward}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FINAL CTA — cinematic close ===== */}
      <div className="relative z-10 pt-6 pb-20 md:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Stats ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/6 pt-8 text-center mb-14">
            {[
              { v: "3", l: "Currencies", c: "#ffd21f" },
              { v: "4", l: "Chest Rarities", c: "#ff7a00" },
              { v: "20", l: "Battle Pass Tiers", c: "#ff2bd6" },
              { v: "7", l: "Daily Streaks", c: "#00c8ff" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-russo text-3xl sm:text-4xl" style={{ color: s.c, textShadow: `0 0 14px ${s.c}55` }}>{s.v}</div>
                <div className="mt-1 font-russo text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-white/40">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h2 className="font-bangers text-[clamp(2rem,6vw,4rem)] leading-[0.92] tracking-[0.04em] text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffd21f_0%,#ff7a00_45%,#ff2bd6_100%)]">
              THE MORE YOU PLAY, THE MORE YOU EARN.
            </h2>
            <p className="mt-4 text-white/55 text-sm font-inter max-w-md mx-auto">
              Every battle, every challenge, every streak — your vault grows.
            </p>
            <Link
              href="/how-to-play"
              className="mt-8 inline-flex items-center gap-2 px-12 py-4 rounded-lg border-[2.5px] border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black font-russo font-black uppercase tracking-[0.13em] text-sm shadow-[0_0_28px_rgba(255,122,0,0.55),5px_5px_0_#14002e] transition hover:-translate-y-0.5"
            >
              Play Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
