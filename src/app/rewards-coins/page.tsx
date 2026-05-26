"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

/* ─── animated counter hook ─── */
function useCounter(target: number, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [target, duration]);
  return val;
}

/* ─── animated progress bar ─── */
function AnimatedBar({ pct, color, delay = 0 }: { pct: number; color: string; delay?: number }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 300 + delay); return () => clearTimeout(t); }, [pct, delay]);
  return (
    <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-[1500ms] ease-out"
        style={{ width: `${w}%`, background: `linear-gradient(90deg, ${color}, ${color}99)`, boxShadow: `0 0 8px ${color}50` }}
      />
    </div>
  );
}

export default function RewardsCoinsPage() {
  const [hoveredChest, setHoveredChest] = useState<string | null>(null);
  const [hoveredSkin, setHoveredSkin] = useState<string | null>(null);

  const zunoCoins = useCounter(128450);
  const riftCrystals = useCounter(2840);
  const energyOrbs = useCounter(9220);

  return (
    <div className="relative overflow-x-hidden">
      {/* ═══════ CONTINUOUS AMBIENT CANVAS ═══════ */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[120%] h-[25%] bg-[radial-gradient(ellipse_at_center,rgba(255,210,31,0.03),transparent_60%)]" />
        <div className="absolute top-[50%] right-0 w-[50%] h-[20%] bg-[radial-gradient(circle_at_right,rgba(255,43,214,0.04),transparent_60%)]" />
        <div className="absolute top-[65%] left-0 w-[50%] h-[20%] bg-[radial-gradient(circle_at_left,rgba(0,200,255,0.03),transparent_60%)]" />
        <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[80%] h-[15%] bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.04),transparent_55%)]" />
      </div>

      {/* ═══════ HERO — CINEMATIC FULL-WIDTH ═══════ */}
      <section className="relative w-full min-h-[90vh] md:min-h-[85vh] overflow-hidden">
        {/* Background artwork — fills entire hero */}
        <div className="absolute inset-0">
          <img
            src="/rewards-coins.png"
            alt="ZUNO Rewards Command Center"
            className="w-full h-full object-cover object-[center_20%]"
          />
          {/* Top fade for navbar blend */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.7)_0%,rgba(2,6,23,0)_25%)]" />
          {/* Bottom dissolve into content */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,1)_0%,rgba(2,6,23,0.8)_15%,rgba(2,6,23,0)_45%)]" />
          {/* Left text area darken for legibility */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(2,6,23,0.7)_0%,rgba(2,6,23,0.3)_35%,transparent_55%)]" />
        </div>

        {/* Hero content — LEFT aligned text, artwork on RIGHT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-[10rem] pb-20 flex items-end min-h-[90vh] md:min-h-[85vh]">
          <div className="max-w-xl">
            <p className="font-russo text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#7cff00] drop-shadow-[0_0_10px_rgba(124,255,0,0.5)]">
              Rewards Command Center
            </p>

            <h1 className="mt-4 font-bangers leading-[0.88] tracking-[0.03em] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              <span className="block text-[clamp(2.8rem,7vw,5rem)]">EARN. UPGRADE.</span>
              <span className="block text-[clamp(4rem,11vw,8rem)] text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffffff,#ffd21f)]">
                DOMINATE.
              </span>
            </h1>

            <p className="mt-5 text-white/70 text-sm md:text-base font-inter leading-relaxed max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Play, complete challenges, and climb the ranks. Every victory earns you valuable rewards.
            </p>

            <Link
              href="/how-to-play"
              className="mt-6 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg border-2 border-[#ff7a00] bg-[rgba(255,122,0,0.08)] backdrop-blur-sm text-white font-russo uppercase tracking-[0.12em] text-sm shadow-[0_0_20px_rgba(255,122,0,0.2)] transition-all duration-300 hover:bg-[rgba(255,122,0,0.15)] hover:shadow-[0_0_30px_rgba(255,122,0,0.35)] hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21 6H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-1 10H4V8h16v8zM6.5 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm5 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
              Play & Earn Now
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ CURRENCIES — holographic HUD cards ═══════ */}
      <div className="relative z-10 -mt-8 pb-16 md:pb-20">
        {/* Section divider */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-[#ffd21f]/30" />
          <p className="font-russo text-[11px] uppercase tracking-[0.3em] text-[#ffd21f]/70">
            ✦ Currencies ✦
          </p>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-[#ffd21f]/30" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid gap-5 md:grid-cols-3">
          {[
            {
              name: "ZUNO Coins", icon: "Z", value: zunoCoins, gain: "+12,450", color: "#ffd21f",
              desc: "The main currency of the ZUNO universe. Earn coins by winning battles, completing missions, and ranking up.",
              pct: 74, iconBg: "from-amber-500/30 to-amber-700/10"
            },
            {
              name: "Rift Crystals", icon: "◆", value: riftCrystals, gain: "+560", color: "#b44aff",
              desc: "Rare crystals from the Rift. Use them to unlock legendary skins, heroes, and powerful items.",
              pct: 74, iconBg: "from-purple-500/30 to-purple-700/10"
            },
            {
              name: "Energy Orbs", icon: "●", value: energyOrbs, gain: "+2,120", color: "#00d4ff",
              desc: "Fuel for battle and progression. Use orbs to power up abilities, enter events, and more.",
              pct: 74, iconBg: "from-cyan-500/30 to-cyan-700/10"
            },
          ].map((c, i) => (
            <div
              key={c.name}
              className="group relative rounded-2xl backdrop-blur-md p-6 transition-all duration-500 hover:-translate-y-1.5"
              style={{
                background: `linear-gradient(160deg, ${c.color}06, rgba(2,6,23,0.65), ${c.color}04)`,
                border: `1px solid ${c.color}18`,
                boxShadow: `0 0 25px ${c.color}08, inset 0 1px 0 ${c.color}10`,
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `0 0 50px ${c.color}15, inset 0 0 25px ${c.color}06` }} />

              {/* Icon + Title row */}
              <div className="relative flex items-center gap-4 mb-4">
                <div className="relative flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bangers"
                    style={{
                      background: `radial-gradient(circle, ${c.color}25, ${c.color}08)`,
                      boxShadow: `0 0 20px ${c.color}20`,
                      color: c.color,
                    }}
                  >
                    {c.icon}
                  </div>
                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-xl animate-ping opacity-10"
                    style={{ border: `1.5px solid ${c.color}` }} />
                </div>
                <h3 className="font-russo text-sm uppercase tracking-[0.12em] text-white">{c.name}</h3>
              </div>

              {/* Description */}
              <p className="text-[11px] text-white/40 font-inter leading-relaxed mb-5">{c.desc}</p>

              {/* Value */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-bangers text-3xl tracking-wider" style={{ color: c.color, textShadow: `0 0 12px ${c.color}40` }}>
                  {c.value.toLocaleString()}
                </span>
              </div>

              {/* Weekly gain + progress */}
              <div className="flex items-center justify-between text-[10px] font-russo uppercase tracking-wider text-white/35 mb-2">
                <span>Weekly Gain <span className="text-[#7cff00] ml-1">{c.gain}</span></span>
                <span>{c.pct}%</span>
              </div>
              <AnimatedBar pct={c.pct} color={c.color} delay={i * 200} />
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ CHESTS + SKINS — side by side ═══════ */}
      <div className="relative z-10 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid gap-6 lg:grid-cols-2">

          {/* REWARD CHESTS */}
          <div
            className="relative rounded-2xl backdrop-blur-md p-6 overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(255,122,0,0.04), rgba(2,6,23,0.55))",
              border: "1px solid rgba(255,122,0,0.12)",
              boxShadow: "0 0 30px rgba(255,122,0,0.05)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-[#ff7a00]/30 to-transparent" />
              <h2 className="font-bangers text-lg tracking-[0.06em] text-[#ff7a00]">✦ REWARD CHESTS ✦</h2>
              <div className="h-px flex-1 bg-gradient-to-l from-[#ff7a00]/30 to-transparent" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "Bronze", rarity: "Common", status: "Ready to Claim", progress: "Claim", color: "#cd7f32", rarityColor: "#a0b4c8", ready: true, pct: 100 },
                { name: "Silver", rarity: "Rare", status: "2 Wins Left", progress: "2/4", color: "#a0b4c8", rarityColor: "#00c8ff", ready: false, pct: 50 },
                { name: "Gold", rarity: "Epic", status: "4 Wins Left", progress: "1/5", color: "#ffd21f", rarityColor: "#b44aff", ready: false, pct: 20 },
                { name: "Prism", rarity: "Legendary", status: "7 Wins Left", progress: "0/7", color: "#ff2bd6", rarityColor: "#ff7a00", ready: false, pct: 0 },
              ].map((ch) => (
                <div
                  key={ch.name}
                  className="group relative rounded-xl p-4 text-center cursor-pointer transition-all duration-400 hover:-translate-y-1.5"
                  style={{
                    background: `linear-gradient(180deg, ${ch.color}06, rgba(2,6,23,0.7))`,
                    border: `1px solid ${ch.color}20`,
                    boxShadow: hoveredChest === ch.name ? `0 0 35px ${ch.color}25` : `0 0 10px ${ch.color}06`,
                  }}
                  onMouseEnter={() => setHoveredChest(ch.name)}
                  onMouseLeave={() => setHoveredChest(null)}
                >
                  {/* Shimmer sweep */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `linear-gradient(120deg, transparent 20%, ${ch.color}12 50%, transparent 80%)` }} />

                  {/* Chest glow */}
                  <div className="relative mx-auto w-16 h-16 mb-3">
                    <div className="absolute inset-0 rounded-full opacity-50 group-hover:opacity-80 transition-opacity"
                      style={{ background: `radial-gradient(circle, ${ch.color}30, transparent 70%)`, filter: "blur(8px)" }} />
                    <div
                      className="relative w-16 h-16 rounded-xl border-2 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
                      style={{
                        borderColor: `${ch.color}40`,
                        background: `radial-gradient(circle, ${ch.color}18, transparent 70%)`,
                        boxShadow: `0 0 16px ${ch.color}18`,
                      }}
                    >
                      <div className="w-6 h-6 rotate-45 rounded-sm" style={{ backgroundColor: ch.color, boxShadow: `0 0 10px ${ch.color}60` }} />
                    </div>
                  </div>

                  <p className="font-russo text-[10px] uppercase tracking-wider text-white mb-0.5">{ch.name} Chest</p>
                  <p className="text-[9px] uppercase tracking-wider font-russo" style={{ color: ch.rarityColor }}>{ch.rarity}</p>

                  {ch.ready ? (
                    <button className="mt-3 w-full rounded-md py-1.5 text-[9px] font-russo uppercase tracking-wider text-black bg-[linear-gradient(90deg,#7cff00,#00c8ff)] shadow-[0_0_10px_rgba(124,255,0,0.3)] hover:shadow-[0_0_18px_rgba(124,255,0,0.5)] transition-shadow cursor-pointer">
                      Claim
                    </button>
                  ) : (
                    <div className="mt-3">
                      <p className="text-[9px] text-white/40 font-inter mb-1.5">{ch.status}</p>
                      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${ch.pct}%`, background: `linear-gradient(90deg, ${ch.color}, ${ch.color}88)`, boxShadow: `0 0 5px ${ch.color}40` }} />
                      </div>
                      <p className="text-[8px] text-white/25 font-russo mt-1 tracking-wider">{ch.progress}</p>
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
              background: "linear-gradient(180deg, rgba(255,43,214,0.04), rgba(2,6,23,0.55))",
              border: "1px solid rgba(255,43,214,0.12)",
              boxShadow: "0 0 30px rgba(255,43,214,0.05)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-[#ff2bd6]/30 to-transparent" />
              <h2 className="font-bangers text-lg tracking-[0.06em] text-[#ff2bd6]">✦ UNLOCKABLE SKINS ✦</h2>
              <div className="h-px flex-1 bg-gradient-to-l from-[#ff2bd6]/30 to-transparent" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "Neon Warden", rarity: "Epic", cost: 900, color: "#b44aff" },
                { name: "Solar Viper", rarity: "Legendary", cost: 1800, color: "#ffd21f" },
                { name: "Rift Marauder", rarity: "Rare", cost: 450, color: "#00c8ff" },
                { name: "Pulse Striker", rarity: "Common", cost: 120, color: "#a0b4c8" },
                { name: "Arc Sentinel", rarity: "Epic", cost: 750, color: "#b44aff" },
                { name: "Abyss Runner", rarity: "Legendary", cost: 2100, color: "#ffd21f" },
              ].map((s) => (
                <div
                  key={s.name}
                  className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-400 hover:-translate-y-1.5"
                  style={{
                    border: `1px solid ${s.color}18`,
                    boxShadow: hoveredSkin === s.name ? `0 0 30px ${s.color}22` : `0 0 6px ${s.color}06`,
                  }}
                  onMouseEnter={() => setHoveredSkin(s.name)}
                  onMouseLeave={() => setHoveredSkin(null)}
                >
                  {/* Character atmosphere */}
                  <div className="relative h-28 md:h-32 overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-130"
                      style={{ background: `radial-gradient(ellipse at 50% 70%, ${s.color}22, ${s.color}06 45%, transparent 75%)` }} />
                    {/* Energy wisp */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-20 opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                      style={{ background: `linear-gradient(to top, ${s.color}30, transparent)`, filter: "blur(8px)" }} />
                    {/* Animated border glow */}
                    <div className="absolute inset-0 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ boxShadow: `inset 0 0 20px ${s.color}12` }} />
                    {/* Rarity badge */}
                    <div className="absolute top-2 right-2">
                      <span className="text-[7px] font-russo uppercase tracking-wider px-2 py-0.5 rounded-sm"
                        style={{ color: s.color, backgroundColor: `${s.color}12`, border: `1px solid ${s.color}22` }}>
                        {s.rarity}
                      </span>
                    </div>
                  </div>

                  {/* Skin info */}
                  <div className="relative p-3" style={{ background: `linear-gradient(180deg, ${s.color}05, rgba(2,6,23,0.85))` }}>
                    <p className="font-russo text-[9px] uppercase tracking-wider text-white truncate">{s.name}</p>
                    <p className="text-[9px] font-inter mt-0.5" style={{ color: s.color }}>⚡ {s.cost.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ DAILY STREAK + BATTLE PASS — side by side ═══════ */}
      <div className="relative z-10 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid gap-6 lg:grid-cols-2">

          {/* DAILY REWARD STREAK */}
          <div
            className="relative rounded-2xl backdrop-blur-md p-6 overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(0,200,255,0.04), rgba(2,6,23,0.55))",
              border: "1px solid rgba(0,200,255,0.12)",
              boxShadow: "0 0 30px rgba(0,200,255,0.05)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bangers text-lg tracking-[0.06em] text-[#00c8ff]">✦ DAILY REWARD STREAK</h2>
              <span className="rounded-full px-3.5 py-1 font-russo text-[8px] uppercase tracking-wider text-[#ff7a00]"
                style={{ background: "rgba(255,122,0,0.1)", border: "1px solid rgba(255,122,0,0.25)" }}>
                Streak: 6 Days
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { day: 1, reward: "100 Coins", done: true },
                { day: 2, reward: "2 Energy Orbs", done: true },
                { day: 3, reward: "Small Chest", done: true },
                { day: 4, reward: "150 Coins", done: true },
                { day: 5, reward: "5 Energy Orbs", done: true },
                { day: 6, reward: "Rift Crystal x50", done: true },
                { day: 7, reward: "Epic Chest", done: false },
              ].map((d) => (
                <div
                  key={d.day}
                  className={`relative rounded-lg p-2.5 text-center transition-all duration-300 hover:-translate-y-0.5 ${d.day === 7 ? "col-span-4 sm:col-span-1" : ""}`}
                  style={{
                    background: d.done ? "rgba(0,200,255,0.06)" : d.day === 7 ? "rgba(255,210,31,0.06)" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${d.done ? "rgba(0,200,255,0.18)" : d.day === 7 ? "rgba(255,210,31,0.22)" : "rgba(255,255,255,0.06)"}`,
                    boxShadow: d.day === 7 ? "0 0 18px rgba(255,210,31,0.08)" : "none",
                  }}
                >
                  <p className="font-russo text-[8px] uppercase tracking-wider text-white/35">Day {d.day}</p>
                  <div className="mx-auto mt-2 w-6 h-6 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: d.done ? "rgba(0,200,255,0.15)" : d.day === 7 ? "rgba(255,210,31,0.12)" : "rgba(255,255,255,0.04)",
                      border: `1.5px solid ${d.done ? "#00c8ff" : d.day === 7 ? "#ffd21f" : "rgba(255,255,255,0.1)"}`,
                      boxShadow: d.done ? "0 0 8px rgba(0,200,255,0.3)" : d.day === 7 ? "0 0 8px rgba(255,210,31,0.2)" : "none",
                    }}
                  >
                    {d.done && <div className="w-2.5 h-2.5 rounded-full bg-[#00c8ff]" style={{ boxShadow: "0 0 6px #00c8ff" }} />}
                    {d.day === 7 && !d.done && <div className="w-2.5 h-2.5 rounded-full bg-[#ffd21f]/50" />}
                  </div>
                  <p className="mt-2 text-[8px] font-inter text-white/50 leading-tight">{d.reward}</p>
                </div>
              ))}
            </div>
          </div>

          {/* BATTLE PASS TIERS */}
          <div
            className="relative rounded-2xl backdrop-blur-md p-6 overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(255,43,214,0.04), rgba(2,6,23,0.55))",
              border: "1px solid rgba(255,43,214,0.12)",
              boxShadow: "0 0 30px rgba(255,43,214,0.05)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-bangers text-lg tracking-[0.06em] text-[#ff2bd6]">✦ BATTLE PASS TIERS</h2>
              </div>
            </div>

            <div className="space-y-2.5">
              {[
                { tier: 1, free: "Coins x200", premium: "Rift Crystal x100", pct: 100, color: "#ffd21f", done: true },
                { tier: 5, free: "Energy Orb x8", premium: "Rare Skin", pct: 100, color: "#00c8ff", done: false },
                { tier: 10, free: "Prism Chest", premium: "Void Lance", pct: 70, color: "#ff7a00", done: false },
                { tier: 15, free: "Coins x500", premium: "Epic Emote", pct: 35, color: "#ff2bd6", done: false },
                { tier: 20, free: "Rift Crystal x250", premium: "Legendary Skin", pct: 0, color: "#ffd21f", done: false },
              ].map((t) => (
                <div
                  key={t.tier}
                  className="group relative rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "rgba(2,6,23,0.45)",
                    border: `1px solid ${t.done ? `${t.color}30` : "rgba(255,255,255,0.06)"}`,
                  }}
                >
                  {/* Progress fill behind content */}
                  <div className="absolute inset-0 pointer-events-none transition-all duration-1000"
                    style={{ width: `${t.pct}%`, background: `linear-gradient(90deg, ${t.color}08, transparent)` }} />

                  <div className="relative flex items-center gap-3 p-3">
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center font-russo text-[10px] flex-shrink-0"
                      style={{
                        color: t.color,
                        background: t.done ? `${t.color}15` : `${t.color}08`,
                        border: `1px solid ${t.done ? `${t.color}45` : `${t.color}18`}`,
                        boxShadow: t.done ? `0 0 10px ${t.color}20` : "none",
                      }}
                    >
                      {t.tier}
                    </div>

                    <div className="flex-1 min-w-0 grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[7px] font-russo uppercase tracking-wider text-[#00c8ff]/60 block">Free</span>
                        <span className="text-[9px] font-inter text-white/70 truncate block">{t.free}</span>
                      </div>
                      <div>
                        <span className="text-[7px] font-russo uppercase tracking-wider text-[#ff2bd6]/60 block">Premium</span>
                        <span className="text-[9px] font-inter text-white/70 truncate block">{t.premium}</span>
                      </div>
                    </div>

                    {/* Status icon */}
                    <div className="flex-shrink-0">
                      {t.done ? (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#7cff00]/15 border border-[#7cff00]/40">
                          <div className="w-2 h-2 rounded-full bg-[#7cff00]" style={{ boxShadow: "0 0 6px #7cff00" }} />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-white/10" />
                      )}
                    </div>
                  </div>

                  {/* Thin progress bar */}
                  <div className="h-0.5 bg-white/4">
                    <div className="h-full transition-all duration-1500"
                      style={{ width: `${t.pct}%`, background: `linear-gradient(90deg, ${t.color}, ${t.color}80)` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ HOW TO EARN — cinematic split ═══════ */}
      <div className="relative z-10 pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* Left — headline + illustration area */}
            <div className="lg:w-[380px] flex-shrink-0 pt-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-[#ff7a00]/30" />
                <h2 className="font-bangers text-lg tracking-[0.06em] text-[#ff7a00]">✦ HOW TO EARN ✦</h2>
                <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-[#ff7a00]/30" />
              </div>

              <h3 className="font-bangers text-[clamp(2.2rem,6vw,4rem)] leading-[0.90] tracking-[0.03em] text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                FIGHT HARDER.
                <span className="block text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffd21f,#ff7a00)]">EARN MORE.</span>
              </h3>

              <p className="mt-4 text-white/60 text-sm font-inter leading-relaxed">
                Every battle fills your vault. Win arena matches, complete daily challenges, climb ranked ladders, and watch your rewards multiply.
              </p>

              <Link href="/how-to-play"
                className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-russo text-xs uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(180deg, rgba(255,210,31,0.1), rgba(2,6,23,0.8))", border: "1px solid rgba(255,210,31,0.25)", boxShadow: "0 0 15px rgba(255,210,31,0.1)" }}>
                Learn to Play →
              </Link>
            </div>

            {/* Right — earning methods */}
            <div className="relative flex-1 max-w-[520px] mx-auto lg:mx-0">
              <div
                className="rounded-2xl backdrop-blur-md p-6 space-y-3"
                style={{
                  background: "linear-gradient(180deg, rgba(255,210,31,0.03), rgba(2,6,23,0.55))",
                  border: "1px solid rgba(255,210,31,0.12)",
                  boxShadow: "0 0 30px rgba(255,210,31,0.05)",
                }}
              >
                {[
                  { method: "Win Battles", reward: "Earn Coins & Orbs", color: "#ffd21f" },
                  { method: "Complete Missions", reward: "Get Crystals & Chests", color: "#00c8ff" },
                  { method: "Rank Up", reward: "Unlock Bigger Rewards", color: "#ff2bd6" },
                  { method: "Participate in Events", reward: "Exclusive Prizes", color: "#ff7a00" },
                ].map((e) => (
                  <div key={e.method}
                    className="group flex items-center justify-between rounded-lg px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-125"
                        style={{ backgroundColor: e.color, boxShadow: `0 0 8px ${e.color}50` }} />
                      <span className="font-russo text-[11px] uppercase tracking-wider text-white">{e.method}</span>
                    </div>
                    <span className="text-[10px] font-inter" style={{ color: e.color }}>{e.reward}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ FINAL CTA — cinematic close ═══════ */}
      <div className="relative z-10 pt-8 pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Stats ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 border-t border-white/6 pt-10 text-center mb-16">
            {[
              { v: "3", l: "Currencies", c: "#ffd21f" },
              { v: "4", l: "Chest Rarities", c: "#ff7a00" },
              { v: "20", l: "Battle Pass Tiers", c: "#ff2bd6" },
              { v: "7", l: "Daily Streaks", c: "#00c8ff" },
            ].map((s) => (
              <div key={s.l} className="group">
                <div className="font-bangers text-4xl sm:text-5xl transition-transform duration-300 group-hover:scale-110"
                  style={{ color: s.c, textShadow: `0 0 18px ${s.c}45` }}>{s.v}</div>
                <div className="mt-1.5 font-russo text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-white/40">{s.l}</div>
              </div>
            ))}
          </div>

          {/* CTA block */}
          <div className="text-center">
            <h2 className="font-bangers text-[clamp(2rem,6vw,4rem)] leading-[0.92] tracking-[0.04em] text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffd21f_0%,#ff7a00_45%,#ff2bd6_100%)]">
              THE MORE YOU PLAY, THE MORE YOU EARN.
            </h2>
            <p className="mt-3 font-russo text-[10px] uppercase tracking-[0.2em] text-white/40">
              Jump in, claim rewards, and become a legend.
            </p>
            <Link
              href="/how-to-play"
              className="mt-8 inline-flex items-center gap-2.5 px-12 py-4 rounded-lg border-[2.5px] border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black font-russo font-black uppercase tracking-[0.13em] text-sm shadow-[0_0_32px_rgba(255,122,0,0.5),5px_5px_0_#14002e] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,122,0,0.65),6px_6px_0_#14002e]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21 6H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zm-1 10H4V8h16v8zM6.5 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm5 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
              Play ZUNO Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
