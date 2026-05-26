"use client";

import { useState } from "react";
import Link from "next/link";

const animals = [
  {
    key: "wolf", name: "Wolf", title: "Arctic Pack Hunter", emoji: "🐺", color: "#00c8ff",
    weapons: [
      { name: "Frost Blade", rarity: "Epic", element: "Ice", stats: "+92 Slash • +25 Chill Burst", status: "Unlocked", path: ["Shard Edge","Glacier Fang","Frost Blade","Absolute Zero","Winter Reign"] },
      { name: "Thunder Claws", rarity: "Legendary", element: "Electric", stats: "+81 Combo • +40 Chain Shock", status: "Unlocked", path: ["Static Nails","Volt Talons","Thunder Claws","Storm Hunt","Skybreaker"] },
      { name: "Ice Armor", rarity: "Rare", element: "Ice", stats: "+140 Shield • +18 Freeze Reflect", status: "Locked", path: ["Frozen Hide","Crystal Guard","Ice Armor","Polar Aegis","Tundra Fortress"] },
    ],
  },
  {
    key: "fox", name: "Fox Hero", title: "Blaze Speed Tactician", emoji: "🦊", color: "#ff7a00",
    weapons: [
      { name: "Inferno Gauntlets", rarity: "Legendary", element: "Fire", stats: "+105 Impact • +35 Burn Stack", status: "Unlocked", path: ["Spark Knuckles","Flare Grips","Inferno Gauntlets","Solar Smash","Phoenix Core"] },
      { name: "Jet Dash Boots", rarity: "Epic", element: "Electric", stats: "+28 Movement • +22 Dash Strike", status: "Unlocked", path: ["Pulse Steps","Turbo Soles","Jet Dash Boots","Mach Surge","Lightning Trail"] },
      { name: "Plasma Goggles", rarity: "Rare", element: "Fire", stats: "+20 Crit • +30 Scan Range", status: "Locked", path: ["Heat Lens","Plasma Sight","Plasma Goggles","Nova Scope","Sunflare Vision"] },
    ],
  },
  {
    key: "cat", name: "Purple Cat", title: "Void Ambush Caster", emoji: "🐱", color: "#ff2bd6",
    weapons: [
      { name: "Shadow Daggers", rarity: "Epic", element: "Rift", stats: "+74 Pierce • +32 Backstab", status: "Unlocked", path: ["Dusk Blades","Night Fangs","Shadow Daggers","Eclipse Twin","Abyss Reaver"] },
      { name: "Rift Energy Staff", rarity: "Legendary", element: "Rift", stats: "+88 Arcane • +45 Rift Burst", status: "Unlocked", path: ["Warp Rod","Singularity Cane","Rift Energy Staff","Void Crown","Event Horizon"] },
      { name: "Void Teleport", rarity: "Rare", element: "Rift", stats: "+3 Blink • +26 Escape Speed", status: "Locked", path: ["Blur Step","Phase Shift","Void Teleport","Rift Gate","Omni Blink"] },
    ],
  },
  {
    key: "panda", name: "Panda", title: "Titan Defense Vanguard", emoji: "🐼", color: "#7cff00",
    weapons: [
      { name: "Titan Gloves", rarity: "Epic", element: "Nature", stats: "+99 Heavy • +22 Stun Force", status: "Unlocked", path: ["Stone Wraps","Granite Fists","Titan Gloves","Colossus Grip","Mountain Breaker"] },
      { name: "Earthquake Slam", rarity: "Legendary", element: "Nature", stats: "+120 Area • +30 Knockdown", status: "Unlocked", path: ["Ground Pound","Seismic Drop","Earthquake Slam","Faultline Crash","Worldsplitter"] },
      { name: "Iron Defense Armor", rarity: "Rare", element: "Nature", stats: "+180 Armor • +20 Guard Regen", status: "Locked", path: ["Steel Vest","Fortified Shell","Iron Defense Armor","Bulwark Mode","Titan Citadel"] },
    ],
  },
];

const rarityColor: Record<string, string> = { Common: "#ff7a00", Rare: "#00c8ff", Epic: "#ff2bd6", Legendary: "#ffd21f" };
const elementColor: Record<string, string> = { Fire: "#ff7a00", Ice: "#00c8ff", Nature: "#7cff00", Rift: "#bd00ff", Electric: "#ffd21f" };

export default function WeaponsPage() {
  const [selected, setSelected] = useState("wolf");
  const hero = animals.find((a) => a.key === selected) ?? animals[0];

  return (
    <div className="relative overflow-x-hidden">
      {/* HEADER */}
      <section className="relative z-10 pt-32 pb-12 md:pt-40 md:pb-16 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(189,0,255,0.08),transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-russo text-xs uppercase tracking-[0.2em] text-[#ff2bd6] drop-shadow-[0_0_8px_rgba(255,43,214,0.5)]">ZUNO Armory</p>
          <h1 className="mt-4 font-bangers text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.90] tracking-[0.04em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
            WEAPONS & <span className="text-[#ff2bd6]">UPGRADES</span>
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-white/70 text-sm font-inter">Select a hero and inspect weapons, abilities, and upgrade routes.</p>
        </div>
      </section>

      {/* ============= HERO SELECTOR ============= */}
      <section className="relative z-10 py-6 bg-[#020617]">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {animals.map((a) => {
              const active = a.key === selected;
              return (
                <button
                  key={a.key}
                  onClick={() => setSelected(a.key)}
                  className={`rounded-xl border p-4 text-left transition hover:-translate-y-0.5 ${
                    active
                      ? "bg-[linear-gradient(180deg,rgba(20,0,46,0.8)_0%,rgba(2,6,23,0.9)_100%)] shadow-lg"
                      : "bg-[linear-gradient(180deg,rgba(20,0,46,0.4)_0%,rgba(2,6,23,0.6)_100%)] border-white/10"
                  }`}
                  style={active ? { borderColor: a.color, boxShadow: `0 0 20px ${a.color}30` } : {}}
                >
                  <div className="text-3xl mb-2">{a.emoji}</div>
                  <div className="font-russo text-xs uppercase tracking-[0.13em]" style={{ color: active ? a.color : "white" }}>{a.name}</div>
                  <div className="text-[10px] text-white/50 font-inter">{a.title}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
      {/* ============= WEAPON CARDS ============= */}
      <section className="relative z-10 py-10 md:py-14 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(189,0,255,0.05),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-5xl">{hero.emoji}</span>
            <div>
              <h2 className="font-bangers text-2xl tracking-[0.04em]" style={{ color: hero.color }}>{hero.name}</h2>
              <p className="text-xs text-white/50 font-inter">{hero.title}</p>
            </div>
          </div>
          <div className="space-y-5">
            {hero.weapons.map((w) => (
              <div
                key={w.name}
                className="rounded-xl border bg-[linear-gradient(180deg,rgba(20,0,46,0.65)_0%,rgba(2,6,23,0.85)_100%)] p-5 transition hover:-translate-y-0.5"
                style={{ borderColor: `${rarityColor[w.rarity]}33`, boxShadow: `0 0 20px ${rarityColor[w.rarity]}15` }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <h3 className="font-bangers text-lg tracking-[0.04em] text-white">{w.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-russo border" style={{ color: rarityColor[w.rarity], borderColor: `${rarityColor[w.rarity]}55` }}>{w.rarity}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-russo border" style={{ color: elementColor[w.element], borderColor: `${elementColor[w.element]}55` }}>{w.element}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-russo border ${w.status === "Unlocked" ? "text-[#7cff00] border-[#7cff00]/40" : "text-white/40 border-white/20"}`}>{w.status}</span>
                  </div>
                </div>
                <p className="text-sm text-white/60 font-inter mb-4">{w.stats}</p>
                <p className="font-russo text-[10px] uppercase tracking-[0.15em] text-[#ff2bd6] mb-2">Upgrade Path (T1 → T5)</p>
                <div className="grid grid-cols-5 gap-2">
                  {w.path.map((tier, i) => (
                    <div
                      key={tier}
                      className={`rounded-lg border px-2 py-2 text-center text-[10px] ${i <= 2 ? "border-[#00c8ff]/40 bg-[#00c8ff]/5 text-[#00c8ff]" : "border-white/10 bg-white/5 text-white/40"}`}
                    >
                      <div className="font-russo">T{i + 1}</div>
                      <div className="font-inter mt-0.5">{tier}</div>
                    </div>
                  ))}
                </div>
                <button
                  className={`mt-4 px-5 py-2 rounded-lg font-russo text-xs uppercase tracking-[0.13em] transition ${
                    w.status === "Unlocked"
                      ? "bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black border-2 border-black shadow-[0_0_16px_rgba(255,122,0,0.4)] hover:-translate-y-0.5"
                      : "bg-white/5 text-white/30 border border-white/10 cursor-not-allowed"
                  }`}
                  disabled={w.status === "Locked"}
                >
                  {w.status === "Unlocked" ? "Upgrade Weapon" : "Unlock Required"}
                </button>
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
            FORGE YOUR ARSENAL
          </h2>
          <p className="mt-4 text-white/70 text-sm font-inter max-w-md mx-auto">
            Upgrade weapons. Unlock abilities. Dominate the arena with superior firepower.
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
