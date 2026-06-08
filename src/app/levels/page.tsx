"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import styles from "./page.module.css";

type WorldCard = {
  key: string;
  image: string;
  accent: string;
  ctaX: string;
  ctaY: string;
  ctaW: string;
  ctaH: string;
};

type Tier = {
  key: "beginner" | "medium" | "hard";
  header: string;
  accent: string;
  cards: WorldCard[];
};

const tiers: Tier[] = [
  {
    key: "beginner",
    header: "/levels-assets/beginner-header.png",
    accent: "#7cff00",
    cards: [
      { key: "grasslands", image: "/levels-assets/card-grasslands.png", accent: "#7cff00", ctaX: "57.6%", ctaY: "89.2%", ctaW: "39.2%", ctaH: "8.4%" },
      { key: "crystal", image: "/levels-assets/card-crystal-river.png", accent: "#00c8ff", ctaX: "57.4%", ctaY: "89.2%", ctaW: "39.4%", ctaH: "8.4%" },
      { key: "sky", image: "/levels-assets/card-sky-canyon.png", accent: "#ffb21f", ctaX: "55.2%", ctaY: "89.2%", ctaW: "41.6%", ctaH: "8.4%" },
    ],
  },
  {
    key: "medium",
    header: "/levels-assets/medium-header.png",
    accent: "#ff7a00",
    cards: [
      { key: "ember", image: "/levels-assets/card-ember-volcano.png", accent: "#ff7a00", ctaX: "57.8%", ctaY: "88.2%", ctaW: "39.2%", ctaH: "8.8%" },
      { key: "shadow", image: "/levels-assets/card-shadow-temple.png", accent: "#ff2bd6", ctaX: "57.6%", ctaY: "88.2%", ctaW: "39.2%", ctaH: "8.8%" },
      { key: "frozen", image: "/levels-assets/card-frozen-rift.png", accent: "#00c8ff", ctaX: "57.8%", ctaY: "88.2%", ctaW: "39.2%", ctaH: "8.8%" },
    ],
  },
  {
    key: "hard",
    header: "/levels-assets/hard-header.png",
    accent: "#ff2bd6",
    cards: [
      { key: "chaos", image: "/levels-assets/card-chaos-dimension.png", accent: "#ff2bd6", ctaX: "57.4%", ctaY: "82.2%", ctaW: "39.4%", ctaH: "7.5%" },
      { key: "neon", image: "/levels-assets/card-neon-abyss.png", accent: "#bd00ff", ctaX: "57.4%", ctaY: "82.2%", ctaW: "39.4%", ctaH: "7.5%" },
      { key: "titan", image: "/levels-assets/card-titan-arena.png", accent: "#ff2d00", ctaX: "57.4%", ctaY: "82.2%", ctaW: "39.4%", ctaH: "7.5%" },
    ],
  },
];

function LevelCard({
  card,
  selected,
  onSelect,
}: {
  card: WorldCard;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <article className={`${styles.card} ${selected ? styles.selected : ""}`} style={{ "--accent": card.accent } as CSSProperties}>
      <button type="button" className={styles.cardSurface} aria-pressed={selected} onClick={onSelect}>
        <img src={card.image} alt="" draggable={false} />
        <span className={styles.cardSweep} />
        <span className={styles.cardGlow} />
        <span className={styles.particles} aria-hidden="true">
          {Array.from({ length: 8 }).map((_, index) => (
            <i key={index} style={{ "--particle": index } as CSSProperties} />
          ))}
        </span>
      </button>
      <Link
        href="/how-to-play"
        className={styles.cardCta}
        style={{ left: card.ctaX, top: card.ctaY, width: card.ctaW, height: card.ctaH } as CSSProperties}
        aria-label="Enter world"
      >
        Enter World
      </Link>
    </article>
  );
}

function TierSection({ tier }: { tier: Tier }) {
  const [selected, setSelected] = useState(tier.cards[0].key);
  const [direction, setDirection] = useState<"prev" | "next" | null>(null);

  const move = (step: -1 | 1) => {
    const currentIndex = tier.cards.findIndex((card) => card.key === selected);
    const nextIndex = (currentIndex + step + tier.cards.length) % tier.cards.length;
    setSelected(tier.cards[nextIndex].key);
    setDirection(step > 0 ? "next" : "prev");
    window.setTimeout(() => setDirection(null), 280);
  };

  return (
    <section className={styles.tier} style={{ "--tier": tier.accent } as CSSProperties}>
      <div className={styles.tierTop}>
        <img src={tier.header} alt="" draggable={false} />
        <div className={styles.arrows}>
          <button type="button" aria-label={`Previous ${tier.key} world`} onClick={() => move(-1)}>
            &lt;
          </button>
          <button type="button" aria-label={`Next ${tier.key} world`} onClick={() => move(1)}>
            &gt;
          </button>
        </div>
      </div>
      <div className={`${styles.cardTrack} ${direction ? styles[direction] : ""}`}>
        {tier.cards.map((card) => (
          <LevelCard key={card.key} card={card} selected={selected === card.key} onSelect={() => setSelected(card.key)} />
        ))}
      </div>
    </section>
  );
}

export default function LevelsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-label="ZUNO Levels and Worlds">
        <img src="/levels-assets/hero-full.png" alt="ZUNO Levels and Worlds world map" draggable={false} />
        <span className={styles.portalPulse} />
        <span className={styles.heroFog} />
        <span className={styles.heroParticles} aria-hidden="true">
          {Array.from({ length: 14 }).map((_, index) => (
            <i key={index} style={{ "--particle": index } as CSSProperties} />
          ))}
        </span>
      </section>

      <div className={styles.tiers}>
        {tiers.map((tier) => (
          <TierSection key={tier.key} tier={tier} />
        ))}
      </div>

      <section className={styles.cta}>
        <img src="/levels-assets/cta-full.png" alt="" draggable={false} />
        <Link href="/how-to-play" aria-label="Play ZUNO now">
          Play ZUNO Now
        </Link>
      </section>
    </main>
  );
}
