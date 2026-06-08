"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import styles from "./page.module.css";

type CharacterKey = "rayo" | "bambo" | "jean" | "marjorie" | "onyx";
type WeaponKey = "frost" | "thunder" | "solar" | "armor" | "void";
type CategoryKey = "all" | "melee" | "ranged" | "elemental" | "legendary" | "loadout";

type Character = {
  key: CharacterKey;
  name: string;
  level: number;
  xp: string;
  image: string;
  accent: string;
};

type Weapon = {
  key: WeaponKey;
  name: string;
  tag: string;
  element: string;
  image: string;
  loadoutImage: string;
  accent: string;
  categories: CategoryKey[];
  stats: Array<{ label: string; value: string }>;
};

type Tier = {
  key: string;
  name: string;
  title: string;
  description: string;
  bonus: string;
  locked?: boolean;
};

const characters: Character[] = [
  { key: "rayo", name: "Rayo", level: 38, xp: "10,420 / 18,000 XP", image: "/weapons-assets/rayo.png", accent: "#ff7a00" },
  { key: "bambo", name: "Bambo", level: 40, xp: "11,880 / 19,000 XP", image: "/weapons-assets/bambo.png", accent: "#ffd21f" },
  { key: "jean", name: "Jean", level: 42, xp: "12,450 / 20,000 XP", image: "/weapons-assets/jean.png", accent: "#00d2ff" },
  { key: "marjorie", name: "Marjorie", level: 36, xp: "9,820 / 17,000 XP", image: "/weapons-assets/marjorie.png", accent: "#ff2bd6" },
  { key: "onyx", name: "Onyx", level: 41, xp: "12,080 / 19,500 XP", image: "/weapons-assets/onyx.png", accent: "#bd00ff" },
];

const categories: Array<{ key: CategoryKey; label: string }> = [
  { key: "all", label: "All weapons" },
  { key: "melee", label: "Melee" },
  { key: "ranged", label: "Ranged" },
  { key: "elemental", label: "Elemental" },
  { key: "legendary", label: "Legendary" },
  { key: "loadout", label: "My loadout" },
];

const weapons: Weapon[] = [
  {
    key: "frost",
    name: "Frost Blade",
    tag: "Legendary",
    element: "Ice",
    image: "/weapons-assets/frost-card.png",
    loadoutImage: "/weapons-assets/loadout-frost.png",
    accent: "#00d2ff",
    categories: ["all", "melee", "elemental", "legendary", "loadout"],
    stats: [
      { label: "Attack Power", value: "92" },
      { label: "Chill Burst", value: "25" },
      { label: "Critical Chance", value: "18%" },
      { label: "Attack Speed", value: "1.35s" },
      { label: "Element", value: "Ice" },
      { label: "Rarity", value: "Legendary" },
    ],
  },
  {
    key: "thunder",
    name: "Thunder Claws",
    tag: "Epic",
    element: "Shock",
    image: "/weapons-assets/thunder-card.png",
    loadoutImage: "/weapons-assets/loadout-thunder.png",
    accent: "#bd00ff",
    categories: ["all", "melee", "elemental", "loadout"],
    stats: [
      { label: "Combo", value: "81" },
      { label: "Chain Shock", value: "40" },
      { label: "Impact", value: "High" },
      { label: "Speed", value: "Fast" },
      { label: "Element", value: "Shock" },
      { label: "Rarity", value: "Epic" },
    ],
  },
  {
    key: "solar",
    name: "Solar Spear",
    tag: "Legendary",
    element: "Fire",
    image: "/weapons-assets/solar-card.png",
    loadoutImage: "/weapons-assets/loadout-solar.png",
    accent: "#ff7a00",
    categories: ["all", "ranged", "elemental", "legendary", "loadout"],
    stats: [
      { label: "Pierce", value: "110" },
      { label: "Solar Impact", value: "35" },
      { label: "Burn Chance", value: "22%" },
      { label: "Range", value: "Long" },
      { label: "Element", value: "Fire" },
      { label: "Rarity", value: "Legendary" },
    ],
  },
  {
    key: "armor",
    name: "Ice Armor",
    tag: "Rare",
    element: "Defense",
    image: "/weapons-assets/armor-card.png",
    loadoutImage: "/weapons-assets/armor-card.png",
    accent: "#20b8ff",
    categories: ["all", "elemental"],
    stats: [
      { label: "Shield", value: "140" },
      { label: "Freeze Reflect", value: "18" },
      { label: "Guard", value: "Heavy" },
      { label: "Recovery", value: "12%" },
      { label: "Element", value: "Ice" },
      { label: "Rarity", value: "Rare" },
    ],
  },
  {
    key: "void",
    name: "Void Lance",
    tag: "Epic",
    element: "Void",
    image: "/weapons-assets/void-card.png",
    loadoutImage: "/weapons-assets/void-card.png",
    accent: "#d42bff",
    categories: ["all", "ranged", "elemental"],
    stats: [
      { label: "Pierce", value: "90" },
      { label: "Void Strike", value: "28" },
      { label: "Rift Pull", value: "16%" },
      { label: "Range", value: "Mid" },
      { label: "Element", value: "Void" },
      { label: "Rarity", value: "Epic" },
    ],
  },
];

const tiers: Tier[] = [
  { key: "t1", name: "T1", title: "Shard Edge", description: "A fast starter edge with clean ice contact and low energy cost.", bonus: "+12 Slash, unlocks Frost Slash" },
  { key: "t2", name: "T2", title: "Glacier Fang", description: "Adds a heavier bite and a stronger chill trail after each combo.", bonus: "+18 Chill Burst, +8% slow" },
  { key: "t3", name: "T3", title: "Frost Blade", description: "The equipped legendary tier. Balanced damage, crowd control, and visual impact.", bonus: "+92 Slash, Chill Burst active" },
  { key: "t4", name: "T4", title: "Absolute Zero", description: "A locked mastery tier focused on area freeze and hard control.", bonus: "Locked: requires 5 Ice Cores", locked: true },
  { key: "t5", name: "T5", title: "Winter Reign", description: "The final reign tier with battlefield-wide frost pressure.", bonus: "Locked: complete Absolute Zero", locked: true },
];

function playTone(kind: "ice" | "fire" | "shock" | "void" | "tap") {
  if (typeof window === "undefined") return;

  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  const context = new AudioContextClass();
  const now = context.currentTime;
  const gain = context.createGain();
  const osc = context.createOscillator();
  const filter = context.createBiquadFilter();
  const settings = {
    ice: { start: 640, end: 1040, type: "sine" as OscillatorType, filter: 2100 },
    fire: { start: 190, end: 72, type: "sawtooth" as OscillatorType, filter: 720 },
    shock: { start: 420, end: 980, type: "square" as OscillatorType, filter: 2600 },
    void: { start: 220, end: 58, type: "triangle" as OscillatorType, filter: 540 },
    tap: { start: 360, end: 520, type: "sine" as OscillatorType, filter: 1800 },
  }[kind];

  osc.type = settings.type;
  osc.frequency.setValueAtTime(settings.start, now);
  osc.frequency.exponentialRampToValueAtTime(settings.end, now + 0.22);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(settings.filter, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.07, now + 0.014);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);
  osc.start(now);
  osc.stop(now + 0.36);
  window.setTimeout(() => context.close().catch(() => undefined), 460);
}

function CharacterSelector({
  selectedCharacter,
  onSelect,
}: {
  selectedCharacter: CharacterKey;
  onSelect: (character: Character) => void;
}) {
  const activeCharacter = characters.find((character) => character.key === selectedCharacter) ?? characters[2];

  return (
    <section className={styles.characterPanel} aria-label="Choose your warrior">
      <div className={styles.sectionLabel}>Choose your warrior</div>
      <div className={styles.characterGrid}>
        {characters.map((character) => {
          const selected = character.key === selectedCharacter;

          return (
            <button
              key={character.key}
              className={`${styles.characterCard} ${selected ? styles.selectedCharacter : ""}`}
              style={{ "--accent": character.accent } as CSSProperties}
              aria-label={character.name}
              aria-pressed={selected}
              onClick={() => onSelect(character)}
            >
              <img src={character.image} alt="" className={styles.characterImage} />
              <span className={styles.characterName}>{character.name}</span>
            </button>
          );
        })}
      </div>
      <div className={styles.characterStats} style={{ "--accent": activeCharacter.accent } as CSSProperties}>
        <div>
          <strong>{activeCharacter.name}</strong>
          <span>Level {activeCharacter.level}</span>
          <small>{activeCharacter.xp}</small>
        </div>
        <div className={styles.pawBadge}>◆</div>
      </div>
    </section>
  );
}

function WeaponCard({
  weapon,
  selected,
  onSelect,
}: {
  weapon: Weapon;
  selected: boolean;
  onSelect: (weapon: Weapon, openInfo?: boolean) => void;
}) {
  return (
    <button
      className={`${styles.weaponCard} ${selected ? styles.selectedWeapon : ""}`}
      style={{ "--accent": weapon.accent } as CSSProperties}
      aria-pressed={selected}
      aria-label={weapon.name}
      onClick={() => onSelect(weapon, true)}
    >
      <img src={weapon.image} alt={weapon.name} className={styles.weaponCardImage} />
      <span className={styles.shimmer} />
    </button>
  );
}

function WeaponCarousel({
  activeWeapon,
  activeCategory,
  onSelect,
  onCategorySelect,
}: {
  activeWeapon: WeaponKey;
  activeCategory: CategoryKey;
  onSelect: (weapon: Weapon, openInfo?: boolean) => void;
  onCategorySelect: (category: CategoryKey) => void;
}) {
  const filteredWeapons = weapons.filter((weapon) => weapon.categories.includes(activeCategory));
  const activeIndex = Math.max(0, filteredWeapons.findIndex((weapon) => weapon.key === activeWeapon));
  const selected = filteredWeapons[activeIndex] ?? filteredWeapons[0] ?? weapons[0];
  const orderedWeapons = filteredWeapons.map((_, index) => filteredWeapons[(activeIndex + index) % filteredWeapons.length]);

  const move = (direction: 1 | -1) => {
    const next = filteredWeapons[(activeIndex + direction + filteredWeapons.length) % filteredWeapons.length];
    onSelect(next, false);
  };

  return (
    <section className={styles.carouselSection} aria-label="Weapon carousel">
      <div className={styles.tabRow}>
        {categories.map((category) => (
          <button
            key={category.key}
            className={`${styles.filterTab} ${activeCategory === category.key ? styles.activeFilter : ""}`}
            aria-pressed={activeCategory === category.key}
            onClick={() => onCategorySelect(category.key)}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className={styles.carouselShell}>
        <button className={`${styles.carouselArrow} ${styles.prevArrow}`} aria-label="Previous weapon" onClick={() => move(-1)}>
          ‹
        </button>
        <div className={styles.carouselViewport}>
          <div className={styles.carouselTrack} key={`${activeCategory}-${selected.key}`}>
            {orderedWeapons.map((weapon) => (
              <WeaponCard key={weapon.key} weapon={weapon} selected={weapon.key === selected.key} onSelect={onSelect} />
            ))}
          </div>
        </div>
        <button className={`${styles.carouselArrow} ${styles.nextArrow}`} aria-label="Next weapon" onClick={() => move(1)}>
          ›
        </button>
      </div>
    </section>
  );
}

function UpgradePath({
  activeTier,
  onSelect,
  openTier,
}: {
  activeTier: string;
  onSelect: (tier: Tier) => void;
  openTier: Tier | null;
}) {
  return (
    <section className={styles.upgradePanel} aria-label="Upgrade path">
      <div className={styles.panelHeading}>
        <h2>Upgrade Path</h2>
        <p>Evolve your weapon through powerful tiers</p>
      </div>
      <div className={styles.tierTrack}>
        {tiers.map((tier, index) => {
          const active = tier.key === activeTier;

          return (
            <div key={tier.key} className={styles.tierGroup}>
              <button
                className={`${styles.tierButton} ${active ? styles.activeTier : ""} ${tier.locked ? styles.lockedTier : ""}`}
                aria-pressed={active}
                style={{ "--tier-index": index } as CSSProperties}
                onClick={() => onSelect(tier)}
              >
                <strong>{tier.name}</strong>
                <span>{tier.title}</span>
              </button>
              {index < tiers.length - 1 && <span className={styles.energyConnector} />}
            </div>
          );
        })}
      </div>
      {openTier && (
        <aside className={styles.tierInfoPanel} style={{ "--accent": openTier.locked ? "rgba(255,255,255,0.55)" : "#00d2ff" } as CSSProperties}>
          <small>{openTier.name}</small>
          <h3>{openTier.title}</h3>
          <p>{openTier.description}</p>
          <strong>{openTier.bonus}</strong>
        </aside>
      )}
    </section>
  );
}

function VideoFrame() {
  return (
    <div className={styles.videoFrame} aria-label="Frost Blade gameplay preview">
      <video className={styles.weaponVideo} autoPlay muted loop playsInline poster="/weapons-assets/video-preview.png">
        <source src="/battle.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

function WeaponInfoModal({ weapon, onClose }: { weapon: Weapon; onClose: () => void }) {
  return (
    <div className={styles.modalLayer} role="dialog" aria-modal="true" aria-label={`${weapon.name} information`}>
      <div className={styles.weaponModal} style={{ "--accent": weapon.accent } as CSSProperties}>
        <button className={styles.modalClose} aria-label="Close weapon information" onClick={onClose}>
          X
        </button>
        <img src={weapon.image} alt="" />
        <div>
          <small>{weapon.tag} {weapon.element}</small>
          <h2>{weapon.name}</h2>
          <p>
            {weapon.name} is tuned for {weapon.element.toLowerCase()} pressure with a premium forge path,
            clean combo feedback, and battle-ready stat growth.
          </p>
          <div className={styles.modalStats}>
            {weapon.stats.slice(0, 4).map((stat) => (
              <span key={stat.label}>
                {stat.label}
                <strong>{stat.value}</strong>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WeaponDetail({ weapon }: { weapon: Weapon }) {
  return (
    <section className={styles.detailGrid} style={{ "--accent": weapon.accent } as CSSProperties}>
      <div className={styles.detailFeature}>
        <div className={styles.detailTitle}>
          <h2>{weapon.name}</h2>
          <div>
            <span>{weapon.tag}</span>
            <span>{weapon.element}</span>
            <span>Equipped</span>
          </div>
        </div>
        <div className={styles.detailArt}>
          <img src={weapon.key === "frost" ? "/weapons-assets/detail-art.png" : weapon.image} alt="" />
        </div>
      </div>
      <div className={styles.statsPanel}>
        <h3>Weapon Stats</h3>
        {weapon.stats.map((stat) => (
          <div key={stat.label} className={styles.statLine}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </div>
      <div className={styles.abilityPanel}>
        <h3>Special Abilities</h3>
        {["Frost Slash", "Chill Burst", "Glacial Strike"].map((ability) => (
          <div key={ability} className={styles.abilityItem}>
            <span />
            <div>
              <strong>{ability}</strong>
              <small>{ability === "Frost Slash" ? "Deal massive ice damage." : ability === "Chill Burst" ? "Slow enemies by 40%." : "Area freeze on impact."}</small>
            </div>
          </div>
        ))}
      </div>
      <VideoFrame />
    </section>
  );
}

function Loadout({
  activeWeapon,
  selectedSlot,
  onSelect,
}: {
  activeWeapon: WeaponKey;
  selectedSlot: number;
  onSelect: (slot: number) => void;
}) {
  return (
    <section className={styles.loadoutPanel} aria-label="My loadout">
      <div className={styles.loadoutSlots}>
        {[0, 1, 2, 3, 4].map((slot) => {
          const weapon = [weapons[0], weapons[2], weapons[1]][slot];
          const active = selectedSlot === slot;

          return (
            <button
              key={slot}
              className={`${styles.loadoutSlot} ${active ? styles.activeLoadout : ""} ${!weapon ? styles.lockedLoadout : ""}`}
              style={{ "--accent": weapon?.accent ?? "rgba(255,255,255,0.45)" } as CSSProperties}
              aria-pressed={active}
              onClick={() => onSelect(slot)}
            >
              <span className={styles.loadoutReader}>{weapon?.name ?? `Locked slot ${slot + 1}`}</span>
              {weapon?.key === activeWeapon && <i />}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ForgePanel() {
  return (
    <section className={styles.forgePanel} aria-label="Weapon forge">
      <img src="/weapons-assets/forge-panel.png" alt="" />
      <div className={styles.emberField}>
        {Array.from({ length: 14 }).map((_, index) => (
          <span key={index} style={{ "--ember": index } as CSSProperties} />
        ))}
      </div>
    </section>
  );
}

export default function WeaponsPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterKey>("jean");
  const [activeWeapon, setActiveWeapon] = useState<WeaponKey>("frost");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [activeTier, setActiveTier] = useState("t3");
  const [openTier, setOpenTier] = useState<Tier | null>(null);
  const [infoWeapon, setInfoWeapon] = useState<Weapon | null>(null);
  const [selectedSlot, setSelectedSlot] = useState(0);
  const selectedWeapon = weapons.find((weapon) => weapon.key === activeWeapon) ?? weapons[0];

  const selectCharacter = (character: Character) => {
    setSelectedCharacter(character.key);
    playTone(character.key === "rayo" ? "fire" : character.key === "onyx" ? "void" : "tap");
  };

  const selectWeapon = (weapon: Weapon, openInfo = true) => {
    setActiveWeapon(weapon.key);
    if (openInfo) setInfoWeapon(weapon);
    playTone(weapon.key === "solar" ? "fire" : weapon.key === "thunder" ? "shock" : weapon.key === "void" ? "void" : "ice");
  };

  const selectCategory = (category: CategoryKey) => {
    const firstWeapon = weapons.find((weapon) => weapon.categories.includes(category));
    setActiveCategory(category);
    if (firstWeapon) setActiveWeapon(firstWeapon.key);
    playTone(category === "legendary" ? "fire" : category === "elemental" ? "ice" : "tap");
  };

  return (
    <main className={styles.page}>
      <div className={styles.backgroundLayer} />

      <section className={styles.hero}>
        <video className={styles.heroVideo} autoPlay muted loop playsInline>
          <source src="/trailer.mp4" type="video/mp4" />
        </video>
      </section>

      <div className={styles.content}>
        <CharacterSelector selectedCharacter={selectedCharacter} onSelect={selectCharacter} />
        <WeaponCarousel activeWeapon={activeWeapon} activeCategory={activeCategory} onSelect={selectWeapon} onCategorySelect={selectCategory} />
        <UpgradePath
          activeTier={activeTier}
          openTier={openTier}
          onSelect={(tier) => {
            setActiveTier(tier.key);
            setOpenTier(tier);
            playTone(tier.locked ? "void" : tier.key === "t3" ? "fire" : "ice");
          }}
        />
        <WeaponDetail weapon={selectedWeapon} />
        <div className={styles.lowerGrid}>
          <Loadout activeWeapon={activeWeapon} selectedSlot={selectedSlot} onSelect={setSelectedSlot} />
          <ForgePanel />
        </div>
        <section className={styles.footerCta}>
          <img src="/weapons-assets/footer-art.png" alt="" />
          <Link href="/how-to-play" aria-label="Play ZUNO now" onClick={() => playTone("fire")}>Play ZUNO Now</Link>
        </section>
      </div>
      {infoWeapon && <WeaponInfoModal weapon={infoWeapon} onClose={() => setInfoWeapon(null)} />}
    </main>
  );
}

