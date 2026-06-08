import Link from "next/link";
import { PawPrint, Swords, Package, Zap, Globe, Users, ArrowRight, ChevronRight } from "lucide-react";
import styles from "./about.module.css";

export default function AboutPage() {
  const pillars = [
    {
      icon: Swords,
      title: "Competitive &\nStrategic",
      copy: "Outsmart opponents in skill-based battles. Strategy and timing determine victory.",
      color: "blue",
    },
    {
      icon: PawPrint,
      title: "Collect &\nEvolve",
      copy: "Collect unique animals, upgrade their abilities, and evolve them into unstoppable legends.",
      color: "purple",
    },
    {
      icon: Zap,
      title: "Skill &\nMastery",
      copy: "Master your heroes, refine your strategy, and rise through the ranks to prove your dominance.",
      color: "orange",
    },
    {
      icon: Globe,
      title: "Explore &\nAdventure",
      copy: "Explore breathtaking worlds, uncover hidden secrets, and take on epic challenges.",
      color: "green",
    },
    {
      icon: Users,
      title: "Community &\nTogetherness",
      copy: "Join a global community of players, form alliances, and conquer together in real-time.",
      color: "magenta",
    },
  ];

  const worlds = [
    { img: "/levels-assets/card-grasslands.png", label: "Grasslands" },
    { img: "/levels-assets/card-ember-volcano.png", label: "Ember Volcano" },
    { img: "/levels-assets/card-shadow-temple.png", label: "Shadow Temple" },
    { img: "/levels-assets/card-crystal-river.png", label: "Crystal River" },
    { img: "/levels-assets/card-sky-canyon.png", label: "Sky Canyon" },
  ];

  const heroes = [
    { img: "/weapons-assets/wolf.png", name: "Jean", title: "The Shadow Wolf", color: "#00d2ff", icon: "❄" },
    { img: "/weapons-assets/marjorie.png", name: "Marjorie", title: "The Night Stalker", color: "#bd00ff", icon: "✦" },
    { img: "/weapons-assets/jean.png", name: "Kael", title: "The Blaze Fury", color: "#ff7a00", icon: "☀" },
    { img: "/weapons-assets/onyx.png", name: "Pando", title: "The Iron Fist", color: "#7cff00", icon: "⚡" },
    { img: "/weapons-assets/rayo.png", name: "Aelis", title: "The Flame Archer", color: "#ff2bd6", icon: "🔥" },
  ];

  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <PawPrint className="h-3.5 w-3.5" />
            <span>About ZUNO</span>
          </div>
          <h1 className={styles.heroH1}>
            More than a game.<br />
            <span className={styles.heroAccent}>A Universe.</span>
          </h1>
          <p className={styles.heroPara}>
            ZUNO is a next-gen animal battle adventure where strategy, skill, and teamwork create legends.
          </p>
          <p className={styles.heroPara}>
            Step into a vibrant world filled with powerful heroes, epic battles, and endless adventure.
          </p>
          <Link href="#our-story" className={styles.heroBtn}>
            <PawPrint className="h-4 w-4" />
            Our Story
          </Link>
        </div>
        <div className={styles.heroArt}>
          <img src="/characters.png" alt="ZUNO Heroes" className={styles.heroImg} />
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section id="our-story" className={styles.storySection}>
        <div className={styles.storyLeft}>
          <img src="/images/gameplay-preview.png" alt="Zunoverse world" className={styles.storyImg} />
        </div>
        <div className={styles.storyRight}>
          <div className={styles.sectionBadge}>
            <PawPrint className="h-4 w-4" style={{ color: "#00d2ff" }} />
            <span style={{ color: "#00d2ff" }}>Our Story</span>
          </div>
          <p className={styles.storyPara}>
            In a world where animals once lived in harmony, ancient guardians known as ZUNO protected the balance.
          </p>
          <p className={styles.storyPara}>But darkness has awakened, threatening to consume everything.</p>
          <p className={styles.storyPara}>
            You are a new hero, chosen to rise, fight, and protect what matters most.
          </p>
          <p className={styles.storyPara}>
            Build your team, unlock your powers, and become the legend the ZUNO universe needs.
          </p>
          <Link href="/how-to-play" className={styles.outlineBtn}>
            Discover The World <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── OUR PILLARS ── */}
      <section className={styles.pillarsSection}>
        <div className={styles.sectionBadgeCentered}>
          <PawPrint className="h-4 w-4" style={{ color: "#00d2ff" }} />
          <span>Our Pillars</span>
        </div>
        <div className={styles.pillarsGrid}>
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className={`${styles.pillarCard} ${styles[`pillar_${p.color}`]}`}>
                <div className={`${styles.pillarIcon} ${styles[`pillarIcon_${p.color}`]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarCopy}>{p.copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── THE ZUNO UNIVERSE ── */}
      <section className={styles.universeSection}>
        <div className={styles.universeLeft}>
          <div className={styles.sectionBadge}>
            <PawPrint className="h-4 w-4" style={{ color: "#00d2ff" }} />
            <span style={{ color: "#00d2ff" }}>The ZUNO Universe</span>
          </div>
          <p className={styles.universePara}>
            From lush forests to frozen caverns, from fiery volcanoes to mystical skies—every world in ZUNO is crafted with detail, life, and adventure.
          </p>
          <p className={styles.universePara}>
            Each environment holds unique enemies, powerful loot, and legendary stories waiting to be discovered.
          </p>
          <Link href="/levels" className={styles.outlineBtn}>
            Explore Worlds <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className={styles.worldsStrip}>
          {worlds.map((w) => (
            <div key={w.label} className={styles.worldSlice}>
              <img src={w.img} alt={w.label} />
              <span className={styles.worldLabel}>{w.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── MEET THE HEROES ── */}
      <section className={styles.heroesSection}>
        <div className={styles.heroesTitleRow}>
          <div className={styles.sectionBadge}>
            <PawPrint className="h-4 w-4" style={{ color: "#00d2ff" }} />
            <span style={{ color: "#00d2ff" }}>Meet The Heroes</span>
          </div>
          <Link href="/weapons" className={styles.allHeroesLink}>
            All Heroes <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className={styles.heroesGrid}>
          {heroes.map((h) => (
            <div key={h.name} className={styles.heroCard} style={{ "--hero-color": h.color } as React.CSSProperties}>
              <div className={styles.heroCardImg}>
                <img src={h.img} alt={h.name} />
              </div>
              <div className={styles.heroCardInfo}>
                <div className={styles.heroName}>{h.name}</div>
                <div className={styles.heroTitle}>{h.title}</div>
                <div className={styles.heroElement} style={{ color: h.color }}>{h.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaLeft} aria-hidden="true">
          <img src="/weapons-assets/wolf.png" alt="" />
        </div>
        <div className={styles.ctaCenter}>
          <h2 className={styles.ctaH2}>
            Your <span className={styles.ctaAccent}>Legend</span> Starts Now
          </h2>
          <p className={styles.ctaSub}>Assemble your team. Sharpen your skills. Conquer the universe.</p>
          <Link href="/how-to-play" className={styles.ctaBtn}>
            <PawPrint className="h-4 w-4" />
            Play Zuno Now
          </Link>
        </div>
        <div className={styles.ctaRight} aria-hidden="true">
          <img src="/weapons-assets/jean.png" alt="" />
        </div>
      </section>

    </div>
  );
}
