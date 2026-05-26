"use client";

import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";

type CharacterKey = "jean" | "bambo" | "wolf" | "marjorie" | "onyx";
type WeaponKey = "frost" | "thunder" | "solar" | "armor" | "void";

type Hotspot = {
  key: string;
  label: string;
  className: string;
  ring: string;
};

const characters: Array<{
  key: CharacterKey;
  label: string;
  box: string;
  color: string;
  aura: string;
  sound: "fire" | "grunt" | "howl" | "void" | "shadow";
}> = [
  {
    key: "jean",
    label: "Select Jean",
    box: "left-[7.15%] top-[22.75%] h-[7.25%] w-[10.2%]",
    color: "#ff7a00",
    aura: "rgba(255,122,0,0.42)",
    sound: "fire",
  },
  {
    key: "bambo",
    label: "Select Bambo",
    box: "left-[20.75%] top-[22.75%] h-[7.25%] w-[10.15%]",
    color: "#ffd21f",
    aura: "rgba(255,210,31,0.36)",
    sound: "grunt",
  },
  {
    key: "wolf",
    label: "Select Wolf",
    box: "left-[34.15%] top-[22.75%] h-[7.25%] w-[10.15%]",
    color: "#00c8ff",
    aura: "rgba(0,200,255,0.38)",
    sound: "howl",
  },
  {
    key: "marjorie",
    label: "Select Marjorie",
    box: "left-[47.75%] top-[22.75%] h-[7.25%] w-[10.15%]",
    color: "#ff2bd6",
    aura: "rgba(255,43,214,0.36)",
    sound: "void",
  },
  {
    key: "onyx",
    label: "Select Onyx",
    box: "left-[61.25%] top-[22.75%] h-[7.25%] w-[10.15%]",
    color: "#bd00ff",
    aura: "rgba(189,0,255,0.38)",
    sound: "shadow",
  },
];

const weaponCards: Array<{
  key: WeaponKey;
  label: string;
  box: string;
  color: string;
  className: string;
  sound: "ice" | "electric" | "fire" | "frost" | "void";
}> = [
  {
    key: "frost",
    label: "Frost Blade weapon card",
    box: "left-[3.1%] top-[35.2%] h-[20.0%] w-[24.2%]",
    color: "#66e7ff",
    className: "weapon-fx weapon-fx--ice",
    sound: "ice",
  },
  {
    key: "thunder",
    label: "Thunder Claws weapon card",
    box: "left-[29.0%] top-[35.2%] h-[20.0%] w-[17.6%]",
    color: "#bd00ff",
    className: "weapon-fx weapon-fx--thunder",
    sound: "electric",
  },
  {
    key: "solar",
    label: "Solar Spear weapon card",
    box: "left-[47.5%] top-[35.2%] h-[20.0%] w-[17.6%]",
    color: "#ff7a00",
    className: "weapon-fx weapon-fx--solar",
    sound: "fire",
  },
  {
    key: "armor",
    label: "Ice Armor weapon card",
    box: "left-[66.3%] top-[35.2%] h-[20.0%] w-[17.0%]",
    color: "#00c8ff",
    className: "weapon-fx weapon-fx--armor",
    sound: "frost",
  },
  {
    key: "void",
    label: "Void Lance weapon card",
    box: "left-[84.0%] top-[35.2%] h-[20.0%] w-[15.5%]",
    color: "#d42bff",
    className: "weapon-fx weapon-fx--void",
    sound: "void",
  },
];

const categoryTabs: Hotspot[] = [
  { key: "all", label: "All weapons", className: "left-[13.7%] top-[32.05%] h-[2.4%] w-[13.5%]", ring: "#00c8ff" },
  { key: "melee", label: "Melee weapons", className: "left-[28.1%] top-[32.05%] h-[2.4%] w-[10.5%]", ring: "#ff2bd6" },
  { key: "ranged", label: "Ranged weapons", className: "left-[39.6%] top-[32.05%] h-[2.4%] w-[10.7%]", ring: "#ff2bd6" },
  { key: "elemental", label: "Elemental weapons", className: "left-[51.1%] top-[32.05%] h-[2.4%] w-[11.9%]", ring: "#ff2bd6" },
  { key: "legendary", label: "Legendary weapons", className: "left-[63.7%] top-[32.05%] h-[2.4%] w-[11.6%]", ring: "#ff7a00" },
  { key: "loadout", label: "My loadout", className: "left-[76.4%] top-[32.05%] h-[2.4%] w-[14.5%]", ring: "#ff2bd6" },
];

const connectorSegments = [
  "left-[19.6%] top-[61.63%] h-[0.36%] w-[6.6%]",
  "left-[37.3%] top-[61.63%] h-[0.36%] w-[6.7%]",
  "left-[57.8%] top-[61.63%] h-[0.36%] w-[4.8%]",
  "left-[75.8%] top-[61.63%] h-[0.36%] w-[4.4%]",
];

const upgradeButtons: Hotspot[] = [
  { key: "thunder-up", label: "Upgrade Thunder Claws", className: "left-[30.5%] top-[52.05%] h-[2.55%] w-[14.2%]", ring: "#00c8ff" },
  { key: "solar-up", label: "Upgrade Solar Spear", className: "left-[49.0%] top-[52.05%] h-[2.55%] w-[14.2%]", ring: "#ff7a00" },
  { key: "armor-up", label: "Upgrade Ice Armor", className: "left-[67.8%] top-[52.05%] h-[2.55%] w-[13.8%]", ring: "#00c8ff" },
  { key: "void-up", label: "Upgrade Void Lance", className: "left-[85.3%] top-[52.05%] h-[2.55%] w-[12.8%]", ring: "#bd00ff" },
];

const upgradeTiers: Hotspot[] = [
  { key: "tier-one", label: "Upgrade path tier one shard edge", className: "left-[7.6%] top-[60.7%] h-[3.65%] w-[13.4%]", ring: "#00c8ff" },
  { key: "tier-two", label: "Upgrade path tier two glacier fang", className: "left-[25.4%] top-[60.7%] h-[3.65%] w-[13.4%]", ring: "#00c8ff" },
  { key: "tier-three", label: "Upgrade path tier three frost blade", className: "left-[43.5%] top-[60.2%] h-[4.2%] w-[14.5%]", ring: "#ff7a00" },
  { key: "tier-four", label: "Upgrade path tier four absolute zero", className: "left-[62.3%] top-[60.7%] h-[3.65%] w-[13.4%]", ring: "rgba(255,255,255,0.55)" },
  { key: "tier-five", label: "Upgrade path tier five winter reign", className: "left-[80.0%] top-[60.7%] h-[3.65%] w-[13.4%]", ring: "rgba(255,255,255,0.55)" },
];

const tierPowerBoxes: Record<string, string> = {
  "tier-one": "left-[7.6%] top-[60.7%] h-[3.65%] w-[13.4%]",
  "tier-two": "left-[25.4%] top-[60.7%] h-[3.65%] w-[13.4%]",
  "tier-three": "left-[43.95%] top-[60.45%] h-[3.65%] w-[13.55%]",
  "tier-four": "left-[62.3%] top-[60.7%] h-[3.65%] w-[13.4%]",
  "tier-five": "left-[80.0%] top-[60.7%] h-[3.65%] w-[13.4%]",
};

const loadoutSlots: Hotspot[] = [
  { key: "slot-one", label: "Loadout slot one", className: "left-[5.7%] top-[83.2%] h-[6.3%] w-[8.8%]", ring: "#00c8ff" },
  { key: "slot-two", label: "Loadout slot two", className: "left-[16.0%] top-[83.2%] h-[6.3%] w-[8.8%]", ring: "#ff7a00" },
  { key: "slot-three", label: "Loadout slot three", className: "left-[25.5%] top-[83.2%] h-[6.3%] w-[8.8%]", ring: "#bd00ff" },
  { key: "slot-four", label: "Locked loadout slot four", className: "left-[35.1%] top-[83.2%] h-[6.3%] w-[8.8%]", ring: "rgba(255,255,255,0.55)" },
  { key: "slot-five", label: "Locked loadout slot five", className: "left-[44.7%] top-[83.2%] h-[6.3%] w-[8.8%]", ring: "rgba(255,255,255,0.55)" },
];

function playTone(kind: "fire" | "grunt" | "howl" | "void" | "shadow" | "ice" | "electric" | "frost") {
  if (typeof window === "undefined") return;

  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const now = context.currentTime;
  const output = context.createGain();
  output.connect(context.destination);
  output.gain.setValueAtTime(0.0001, now);
  output.gain.exponentialRampToValueAtTime(0.11, now + 0.018);
  output.gain.exponentialRampToValueAtTime(0.0001, now + 0.74);

  const osc = context.createOscillator();
  const filter = context.createBiquadFilter();
  const growl = context.createOscillator();
  const growlGain = context.createGain();

  osc.connect(filter);
  filter.connect(output);
  growl.connect(growlGain);
  growlGain.connect(output);

  const settings = {
    fire: { type: "sawtooth" as OscillatorType, start: 128, end: 42, filter: 640, growl: 38 },
    grunt: { type: "triangle" as OscillatorType, start: 92, end: 36, filter: 320, growl: 28 },
    howl: { type: "sine" as OscillatorType, start: 250, end: 520, filter: 1150, growl: 64 },
    void: { type: "sine" as OscillatorType, start: 210, end: 58, filter: 520, growl: 44 },
    shadow: { type: "sawtooth" as OscillatorType, start: 116, end: 38, filter: 410, growl: 34 },
    ice: { type: "sine" as OscillatorType, start: 680, end: 1180, filter: 2200, growl: 96 },
    electric: { type: "square" as OscillatorType, start: 380, end: 920, filter: 2800, growl: 140 },
    frost: { type: "triangle" as OscillatorType, start: 520, end: 860, filter: 1900, growl: 86 },
  }[kind];

  osc.type = settings.type;
  osc.frequency.setValueAtTime(settings.start, now);
  osc.frequency.exponentialRampToValueAtTime(settings.end, now + 0.36);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(settings.filter, now);

  growl.type = "sawtooth";
  growl.frequency.setValueAtTime(settings.growl, now);
  growl.frequency.exponentialRampToValueAtTime(Math.max(22, settings.growl * 0.72), now + 0.5);
  growlGain.gain.setValueAtTime(0.0001, now);
  growlGain.gain.exponentialRampToValueAtTime(0.035, now + 0.03);
  growlGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.62);

  osc.start(now);
  growl.start(now);
  osc.stop(now + 0.78);
  growl.stop(now + 0.78);

  window.setTimeout(() => context.close().catch(() => undefined), 900);
}

function HotspotButton({
  label,
  className,
  ring,
  active = false,
  round = "rounded-md",
  onClick,
}: {
  label: string;
  className: string;
  ring: string;
  active?: boolean;
  round?: string;
  onClick?: () => void;
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={active}
      className={`absolute ${className} ${round} z-20 cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-[1.018] active:scale-[0.985] hotspot-real ${active ? "is-active" : ""}`}
      style={{ "--hotspot": ring } as CSSProperties}
      onClick={onClick}
    />
  );
}

export default function WeaponsPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterKey>("bambo");
  const [activeWeapon, setActiveWeapon] = useState<WeaponKey>("frost");
  const [burstWeapon, setBurstWeapon] = useState<WeaponKey | null>(null);
  const [burstCharacter, setBurstCharacter] = useState<CharacterKey | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [activeTier, setActiveTier] = useState("tier-three");
  const [activeLoadout, setActiveLoadout] = useState("slot-one");
  const burstTimer = useRef<number | null>(null);
  const characterTimer = useRef<number | null>(null);

  const chooseCharacter = (character: (typeof characters)[number]) => {
    setSelectedCharacter(character.key);
    setBurstCharacter(character.key);
    playTone(character.sound);

    if (characterTimer.current) window.clearTimeout(characterTimer.current);
    characterTimer.current = window.setTimeout(() => setBurstCharacter(null), 760);
  };

  const energizeWeapon = (weapon: (typeof weaponCards)[number]) => {
    setActiveWeapon(weapon.key);
    setBurstWeapon(weapon.key);
    playTone(weapon.sound);

    if (burstTimer.current) window.clearTimeout(burstTimer.current);
    burstTimer.current = window.setTimeout(() => setBurstWeapon(null), 760);
  };

  const cycleWeapon = (direction: 1 | -1) => {
    const currentIndex = weaponCards.findIndex((weapon) => weapon.key === activeWeapon);
    const nextWeapon = weaponCards[(currentIndex + direction + weaponCards.length) % weaponCards.length];
    energizeWeapon(nextWeapon);
  };

  return (
    <div className="relative overflow-x-hidden bg-[#020617]">
      {/*
        Weapons target direction:
        - The artwork composition carries the full page.
        - The baked navbar was cropped out of /weapons-composition.png.
        - Real navbar remains from layout.tsx only.
        - No dashboard rebuild, no generic card system, no invented sections.
        - Motion layers are polish only: transparent, aligned, and non-destructive.
      */}

      <section className="relative z-10 pt-24 sm:pt-24 md:pt-24 pb-10">
        <div className="relative mx-auto w-full max-w-[1365px] px-0 sm:px-4">
          <div
            role="img"
            aria-label="ZUNO Weapons Arsenal complete armory screen"
            className="relative mx-auto aspect-[1024/1476] overflow-hidden bg-[#050816] bg-[length:100%_100%] bg-top bg-no-repeat shadow-[0_0_80px_rgba(0,0,0,0.45)]"
            style={{ backgroundImage: "url('/weapons-composition.png')" }}
          >
            <div className="pointer-events-none absolute inset-0 ambient-armory-life" />

            {/* Character rename overlays — keep visual identity, only replace labels. */}
            <div className="absolute left-[7.85%] top-[28.45%] h-[1.9%] w-[8.8%] bg-[#16080a]/95 rounded-sm pointer-events-none" />
            <div className="absolute left-[7.85%] top-[28.25%] w-[8.8%] text-center font-bangers text-[clamp(7px,1.05vw,14px)] italic tracking-[0.06em] text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] pointer-events-none">
              JEAN
            </div>

            <div className="absolute left-[45.7%] top-[28.45%] h-[1.9%] w-[12.8%] bg-[#16051f]/95 rounded-sm pointer-events-none" />
            <div className="absolute left-[45.7%] top-[28.25%] w-[12.8%] text-center font-bangers text-[clamp(7px,0.95vw,13px)] italic tracking-[0.03em] text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] pointer-events-none">
              MARJORIE
            </div>

            {/* Character selection — corrected to portrait/card bounds so borders no longer cut into neighbors. */}
            {characters.map((character) => {
              const isSelected = selectedCharacter === character.key;

              return (
                <div key={character.key} className={`absolute ${character.box} rounded-[10%] z-20 character-card-shell ${isSelected ? "is-selected" : ""} ${burstCharacter === character.key ? "is-burst" : ""}`}>
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-[10%] character-life ${isSelected ? "is-selected" : ""} ${burstCharacter === character.key ? "is-burst" : ""}`}
                    style={{
                      color: character.color,
                      borderColor: character.color,
                      boxShadow: isSelected
                        ? `0 0 0 2px ${character.color}, 0 0 30px ${character.aura}, inset 0 0 28px ${character.aura}`
                        : `0 0 0 1px color-mix(in srgb, ${character.color} 42%, transparent), inset 0 0 16px rgba(255,255,255,0.025)`,
                    }}
                  />
                  <div
                    className={`pointer-events-none absolute inset-[-8%] rounded-[14%] character-breath ${isSelected ? "is-selected" : ""}`}
                    style={{ background: `radial-gradient(circle at 50% 35%, ${character.aura}, transparent 58%)` }}
                  />
                  <div className={`pointer-events-none absolute inset-[18%] rounded-full character-eye-glow ${isSelected ? "is-selected" : ""}`} style={{ background: character.aura }} />
                  <button
                    aria-label={character.label}
                    aria-pressed={isSelected}
                    className="absolute inset-0 rounded-[10%] cursor-pointer focus:outline-none focus-visible:ring-2 transition-transform duration-300 hover:scale-[1.018] active:scale-[0.965]"
                    style={{ outlineColor: character.color }}
                    onMouseEnter={() => setSelectedCharacter(character.key)}
                    onClick={() => chooseCharacter(character)}
                  />
                </div>
              );
            })}

            {/* Weapon category tabs */}
            {categoryTabs.map((tab) => (
              <HotspotButton
                key={tab.key}
                label={tab.label}
                className={tab.className}
                ring={tab.ring}
                active={activeTab === tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  playTone(tab.key === "legendary" ? "fire" : "electric");
                }}
              />
            ))}

            {/* Weapon cards — subtle element-specific energy aligned to the existing cards. */}
            {weaponCards.map((weapon) => {
              const isActive = activeWeapon === weapon.key;
              const isBurst = burstWeapon === weapon.key;

              return (
                <div key={weapon.key} className={`absolute ${weapon.box} rounded-xl overflow-hidden`}>
                  <div
                    className={`${weapon.className} pointer-events-none absolute inset-0 rounded-xl ${isActive ? "is-active" : ""} ${isBurst ? "is-burst" : ""}`}
                    style={{ borderColor: weapon.color }}
                  />
                  <button
                    aria-label={weapon.label}
                    className="absolute inset-0 rounded-xl cursor-pointer focus:outline-none focus-visible:ring-2 transition-transform duration-300 hover:scale-[1.006]"
                    style={{ outlineColor: weapon.color }}
                    onMouseEnter={() => setActiveWeapon(weapon.key)}
                    onClick={() => energizeWeapon(weapon)}
                  />
                </div>
              );
            })}

            {/* Upgrade buttons on cards */}
            {upgradeButtons.map((button) => (
              <HotspotButton key={button.key} label={button.label} className={button.className} ring={button.ring} onClick={() => playTone("electric")} />
            ))}

            {/* Carousel arrows */}
            <HotspotButton label="Previous weapons" className="left-[0.65%] top-[43.1%] h-[4.0%] w-[3.0%]" round="rounded-full" ring="#00c8ff" onClick={() => cycleWeapon(-1)} />
            <HotspotButton label="Next weapons" className="right-[0.65%] top-[43.1%] h-[4.0%] w-[3.0%]" round="rounded-full" ring="#00c8ff" onClick={() => cycleWeapon(1)} />

            {/* Upgrade path energy — segmented only on the baked connector lines, no rectangle overlay. */}
            {connectorSegments.map((segment) => (
              <div key={segment} className={`pointer-events-none absolute ${segment} connector-energy`} />
            ))}
            <div className={`pointer-events-none absolute ${tierPowerBoxes[activeTier]} rounded-full active-tier-power`} />
            {upgradeTiers.map((tier) => (
              <HotspotButton
                key={tier.key}
                label={tier.label}
                className={tier.className}
                round="rounded-full"
                ring={tier.ring}
                active={activeTier === tier.key}
                onClick={() => {
                  setActiveTier(tier.key);
                  playTone(tier.key === "tier-three" ? "fire" : "ice");
                }}
              />
            ))}

            {/* Live gameplay video: placed inside the baked gameplay preview frame only. */}
            <div className="absolute left-[72.35%] top-[66.25%] h-[12.25%] w-[23.25%] overflow-hidden rounded-[1.1%] bg-black/80 shadow-[inset_0_0_20px_rgba(0,200,255,0.16),0_0_18px_rgba(0,200,255,0.1)]">
              <video
                className="h-full w-full object-cover opacity-92"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Live ZUNO battle gameplay preview"
              >
                <source src="/battle.mp4" type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 video-frame-polish" />
            </div>
            <button
              aria-label="Play Frost Blade preview video"
              aria-pressed="false"
              className="absolute left-[72.35%] top-[66.25%] h-[12.25%] w-[23.25%] z-20 rounded-[1.1%] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00c8ff]/80 hotspot-real"
              style={{ "--hotspot": "#00c8ff" } as CSSProperties}
              onClick={() => playTone("ice")}
            />

            {/* Loadout slots */}
            {loadoutSlots.map((slot) => (
              <HotspotButton
                key={slot.key}
                label={slot.label}
                className={slot.className}
                round="rounded-full"
                ring={slot.ring}
                active={activeLoadout === slot.key}
                onClick={() => {
                  setActiveLoadout(slot.key);
                  playTone(slot.key.includes("four") || slot.key.includes("five") ? "void" : "ice");
                }}
              />
            ))}

            {/* Final CTA */}
            <Link
              href="/how-to-play"
              aria-label="Play ZUNO now"
              className="absolute left-[64.2%] top-[93.0%] h-[4.3%] w-[25.4%] rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd21f]/80 cta-life"
              onClick={() => playTone("fire")}
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        .ambient-armory-life {
          background:
            radial-gradient(circle at 15% 27%, rgba(255, 122, 0, 0.045), transparent 14%),
            radial-gradient(circle at 51% 27%, rgba(255, 43, 214, 0.035), transparent 15%),
            radial-gradient(circle at 87% 47%, rgba(189, 0, 255, 0.032), transparent 18%),
            linear-gradient(115deg, transparent 0%, rgba(0, 200, 255, 0.035) 42%, transparent 58%);
          mix-blend-mode: screen;
          opacity: 0.75;
          animation: armoryAmbient 8s ease-in-out infinite alternate;
        }

        .hotspot-real {
          --hotspot: #00c8ff;
          background: radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--hotspot) 10%, transparent), transparent 62%);
          border: 1px solid color-mix(in srgb, var(--hotspot) 24%, transparent);
          box-shadow: inset 0 0 16px color-mix(in srgb, var(--hotspot) 8%, transparent);
          opacity: 0.42;
        }

        .hotspot-real:hover,
        .hotspot-real:focus-visible,
        .hotspot-real.is-active {
          opacity: 1;
          background:
            linear-gradient(115deg, transparent 16%, color-mix(in srgb, var(--hotspot) 24%, transparent) 48%, transparent 74%),
            radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--hotspot) 20%, transparent), transparent 66%);
          border-color: color-mix(in srgb, var(--hotspot) 70%, transparent);
          box-shadow: 0 0 18px color-mix(in srgb, var(--hotspot) 38%, transparent), inset 0 0 18px color-mix(in srgb, var(--hotspot) 18%, transparent);
          animation: hotspotPowered 2.1s ease-in-out infinite;
        }

        .character-card-shell {
          transform-origin: center;
          transition: transform 260ms ease, filter 260ms ease;
        }

        .character-card-shell:hover,
        .character-card-shell.is-selected {
          transform: translateY(-1.6%) scale(1.018);
          filter: brightness(1.08) saturate(1.08);
        }

        .character-card-shell.is-burst {
          animation: characterClickMove 760ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .character-life {
          border: 1px solid;
          opacity: 0.58;
          transform-origin: center;
          transition: opacity 260ms ease, transform 260ms ease, box-shadow 260ms ease;
        }

        .character-life.is-selected {
          opacity: 1;
          animation: characterArmorPulse 2.9s ease-in-out infinite;
        }

        .character-breath {
          opacity: 0;
          filter: blur(5px);
          mix-blend-mode: screen;
          transition: opacity 260ms ease, transform 260ms ease;
        }

        .character-breath.is-selected {
          opacity: 0.82;
          animation: characterBreath 3.0s ease-in-out infinite;
        }

        .character-eye-glow {
          opacity: 0;
          filter: blur(9px);
          mix-blend-mode: screen;
          transform: scale(0.46);
          transition: opacity 240ms ease, transform 240ms ease;
        }

        .character-eye-glow.is-selected {
          opacity: 0.74;
          transform: scale(0.74);
          animation: eyesAlive 1.8s ease-in-out infinite;
        }

        .character-life.is-burst::after {
          content: "";
          position: absolute;
          inset: -7%;
          border-radius: inherit;
          border: 1px solid currentColor;
          opacity: 0;
          animation: roarRipple 760ms ease-out both;
        }

        .weapon-fx {
          border: 1px solid transparent;
          opacity: 0.18;
          mix-blend-mode: screen;
          background-blend-mode: screen;
          transition: opacity 220ms ease, box-shadow 220ms ease, transform 220ms ease;
        }

        .weapon-fx.is-active,
        .weapon-fx:hover {
          opacity: 1;
          border-color: currentColor;
          box-shadow: inset 0 0 30px color-mix(in srgb, currentColor 16%, transparent), 0 0 26px color-mix(in srgb, currentColor 42%, transparent);
          animation: weaponCardBreath 2.4s ease-in-out infinite;
        }

        .weapon-fx::before,
        .weapon-fx::after {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
        }

        .weapon-fx.is-active::before,
        .weapon-fx.is-burst::before {
          opacity: 1;
        }

        .weapon-fx.is-burst::after {
          opacity: 1;
          animation: energyClickBurst 680ms ease-out both;
        }

        .weapon-fx--ice {
          color: #66e7ff;
          background: radial-gradient(circle at 38% 44%, rgba(102, 231, 255, 0.16), transparent 48%);
        }

        .weapon-fx--ice::before {
          background: linear-gradient(115deg, transparent 18%, rgba(202, 247, 255, 0.22) 42%, transparent 58%);
          animation: shimmerSweep 3.2s ease-in-out infinite;
        }

        .weapon-fx--thunder {
          color: #bd00ff;
          background: radial-gradient(circle at 46% 43%, rgba(189, 0, 255, 0.16), transparent 52%);
        }

        .weapon-fx--thunder::before {
          background: linear-gradient(135deg, transparent 20%, rgba(255, 255, 255, 0.22) 23%, transparent 28%, transparent 55%, rgba(189, 0, 255, 0.25) 58%, transparent 63%);
          animation: electricPulse 1.8s steps(2, end) infinite;
        }

        .weapon-fx--solar {
          color: #ff7a00;
          background: radial-gradient(circle at 50% 46%, rgba(255, 122, 0, 0.16), transparent 54%);
        }

        .weapon-fx--solar::before {
          background: radial-gradient(circle at 48% 45%, rgba(255, 210, 31, 0.18), transparent 32%);
          animation: solarRadiate 2.4s ease-in-out infinite;
        }

        .weapon-fx--armor {
          color: #00c8ff;
          background: radial-gradient(circle at 52% 43%, rgba(0, 200, 255, 0.14), transparent 52%);
        }

        .weapon-fx--armor::before {
          background-image:
            radial-gradient(circle, rgba(196, 244, 255, 0.24) 0 1px, transparent 2px),
            radial-gradient(circle, rgba(0, 200, 255, 0.16) 0 1px, transparent 2px);
          background-size: 28px 28px, 46px 46px;
          animation: frostParticles 5s linear infinite;
        }

        .weapon-fx--void {
          color: #d42bff;
          background: radial-gradient(circle at 50% 46%, rgba(212, 43, 255, 0.18), transparent 54%);
        }

        .weapon-fx--void::before {
          background: radial-gradient(circle at 50% 48%, rgba(212, 43, 255, 0.22), transparent 30%);
          animation: voidPulse 2.6s ease-in-out infinite;
        }

        .weapon-fx::after {
          border-radius: inherit;
          border: 1px solid currentColor;
          box-shadow: 0 0 28px currentColor, inset 0 0 20px currentColor;
        }

        .connector-energy {
          overflow: hidden;
          border-radius: 999px;
          background: transparent;
          mix-blend-mode: screen;
        }

        .connector-energy::before {
          content: "";
          position: absolute;
          inset: -80% -140%;
          background: linear-gradient(90deg, transparent 0%, rgba(0, 200, 255, 0.0) 18%, rgba(0, 200, 255, 0.55) 34%, rgba(255, 255, 255, 0.9) 49%, rgba(255, 122, 0, 0.58) 63%, transparent 82%);
          filter: blur(0.3px);
          animation: tierFlow 2.6s linear infinite;
        }

        .active-tier-power,
        .selected-tier-power {
          border: 1px solid rgba(255, 122, 0, 0.72);
          box-shadow: 0 0 24px rgba(255, 122, 0, 0.34), inset 0 0 22px rgba(255, 122, 0, 0.15);
          mix-blend-mode: screen;
          animation: activeTierShine 2.2s ease-in-out infinite;
        }

        .active-tier-power::before {
          content: "";
          position: absolute;
          inset: -20%;
          background: linear-gradient(115deg, transparent 32%, rgba(255, 255, 255, 0.35) 48%, transparent 61%);
          animation: activeTierSweep 2.9s ease-in-out infinite;
        }

        .unlocked-tier-pulse {
          border: 1px solid rgba(0, 200, 255, 0.45);
          box-shadow: 0 0 18px rgba(0, 200, 255, 0.22), inset 0 0 18px rgba(0, 200, 255, 0.08);
          mix-blend-mode: screen;
          animation: unlockedPulse 3s ease-in-out infinite;
        }

        .unlocked-tier-pulse.delay-one {
          animation-delay: 0.6s;
        }

        .video-frame-polish {
          background:
            linear-gradient(90deg, rgba(2, 6, 23, 0.22), transparent 14%, transparent 86%, rgba(2, 6, 23, 0.22)),
            linear-gradient(180deg, rgba(0, 200, 255, 0.13), transparent 24%, transparent 76%, rgba(189, 0, 255, 0.1));
          border: 1px solid rgba(0, 200, 255, 0.22);
          box-shadow: inset 0 0 18px rgba(0, 200, 255, 0.14);
          animation: videoScan 4s ease-in-out infinite;
        }

        .cta-life {
          box-shadow: 0 0 0 transparent;
          transition: box-shadow 260ms ease, background-color 260ms ease;
        }

        .cta-life:hover {
          background-color: rgba(255, 210, 31, 0.04);
          box-shadow: 0 0 28px rgba(255, 122, 0, 0.24);
        }

        @keyframes hotspotPowered {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.28); }
        }

        @keyframes characterClickMove {
          0% { transform: translateY(0) scale(1); }
          28% { transform: translateY(-3.4%) scale(1.04) rotate(-0.4deg); }
          62% { transform: translateY(1.1%) scale(0.992) rotate(0.25deg); }
          100% { transform: translateY(-1.6%) scale(1.018); }
        }

        @keyframes eyesAlive {
          0%, 100% { opacity: 0.42; filter: blur(10px) brightness(1); }
          50% { opacity: 0.86; filter: blur(7px) brightness(1.55); }
        }

        @keyframes roarRipple {
          0% { transform: scale(0.92); opacity: 0.78; box-shadow: 0 0 22px currentColor; }
          100% { transform: scale(1.22); opacity: 0; box-shadow: 0 0 40px currentColor; }
        }

        @keyframes weaponCardBreath {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.34); }
        }

        @keyframes armoryAmbient {
          0% { opacity: 0.45; transform: translate3d(-0.2%, -0.1%, 0); }
          100% { opacity: 0.82; transform: translate3d(0.25%, 0.15%, 0); }
        }

        @keyframes characterArmorPulse {
          0%, 100% { transform: translateY(0) scale(1); filter: brightness(1); }
          45% { transform: translateY(-0.8%) scale(1.006); filter: brightness(1.12); }
        }

        @keyframes characterBreath {
          0%, 100% { transform: scale(0.96); opacity: 0.38; }
          50% { transform: scale(1.08); opacity: 0.72; }
        }

        @keyframes shimmerSweep {
          0% { transform: translateX(-120%); opacity: 0; }
          35% { opacity: 0.62; }
          70%, 100% { transform: translateX(120%); opacity: 0; }
        }

        @keyframes electricPulse {
          0%, 100% { opacity: 0.08; filter: brightness(1); }
          45% { opacity: 0.72; filter: brightness(1.4); }
          55% { opacity: 0.18; }
        }

        @keyframes solarRadiate {
          0%, 100% { transform: scale(0.85); opacity: 0.18; }
          50% { transform: scale(1.18); opacity: 0.48; }
        }

        @keyframes frostParticles {
          0% { background-position: 0 0, 0 0; opacity: 0.2; }
          50% { opacity: 0.48; }
          100% { background-position: 28px -56px, -46px -92px; opacity: 0.2; }
        }

        @keyframes voidPulse {
          0%, 100% { transform: scale(0.72) rotate(0deg); opacity: 0.2; }
          50% { transform: scale(1.18) rotate(3deg); opacity: 0.5; }
        }

        @keyframes energyClickBurst {
          0% { transform: scale(0.96); opacity: 0.95; }
          100% { transform: scale(1.08); opacity: 0; }
        }

        @keyframes tierFlow {
          0% { transform: translateX(-55%); }
          100% { transform: translateX(55%); }
        }

        @keyframes activeTierShine {
          0%, 100% { opacity: 0.58; }
          50% { opacity: 1; }
        }

        @keyframes activeTierSweep {
          0%, 15% { transform: translateX(-120%); opacity: 0; }
          45% { opacity: 0.55; }
          80%, 100% { transform: translateX(120%); opacity: 0; }
        }

        @keyframes unlockedPulse {
          0%, 100% { opacity: 0.44; }
          50% { opacity: 0.82; }
        }

        @keyframes videoScan {
          0%, 100% { opacity: 0.72; }
          50% { opacity: 0.94; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hotspot-real,
          .ambient-armory-life,
          .character-card-shell,
          .character-life,
          .character-breath,
          .character-eye-glow,
          .weapon-fx,
          .weapon-fx::before,
          .weapon-fx::after,
          .connector-energy::before,
          .active-tier-power,
          .active-tier-power::before,
          .selected-tier-power,
          .unlocked-tier-pulse,
          .video-frame-polish {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
