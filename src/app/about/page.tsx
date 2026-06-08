"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { 
  PawPrint, 
  Swords, 
  Sparkles, 
  Zap, 
  Globe, 
  Users, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import styles from "./about.module.css";

export default function AboutPage() {
  // Pillars data matching the artwork exactly
  const pillars = [
    {
      icon: Swords,
      title: "Competitive &\nStrategic",
      copy: "Outsmart opponents in skill-based battles. Strategy and timing determine victory.",
      color: "#00d2ff", // Blue
    },
    {
      icon: Sparkles,
      title: "Collect &\nEvolve",
      copy: "Collect unique animals, upgrade their abilities, and evolve them into unstoppable legends.",
      color: "#bd00ff", // Purple
    },
    {
      icon: Zap,
      title: "Skill &\nMastery",
      copy: "Master your heroes, refine your strategy, and rise through the ranks to prove your dominance.",
      color: "#ff7a00", // Orange
    },
    {
      icon: Globe,
      title: "Explore &\nAdventure",
      copy: "Explore breathtaking worlds, uncover hidden secrets, and take on epic challenges.",
      color: "#7cff00", // Green
    },
    {
      icon: Users,
      title: "Community &\nTogetherness",
      copy: "Join a global community of players, form alliances, and conquer together in real-time.",
      color: "#ff2bd6", // Magenta/Pink
    },
  ];

  // Slanted universe worlds data
  const worlds = [
    { img: "/levels-assets/card-grasslands.png", label: "Grasslands" },
    { img: "/levels-assets/card-ember-volcano.png", label: "Ember Volcano" },
    { img: "/levels-assets/card-shadow-temple.png", label: "Shadow Temple" },
    { img: "/levels-assets/card-crystal-river.png", label: "Crystal River" },
    { img: "/levels-assets/card-sky-canyon.png", label: "Sky Canyon" },
  ];

  // Hero carousel data
  const heroes = [
    { img: "/weapons-assets/wolf.png", name: "Jean", title: "The Shadow Wolf", color: "#00d2ff", icon: "❄" },
    { img: "/weapons-assets/marjorie.png", name: "Marjorie", title: "The Night Stalker", color: "#bd00ff", icon: "✦" },
    { img: "/weapons-assets/rayo.png", name: "Kael", title: "The Blaze Fury", color: "#ff7a00", icon: "☀" },
    { img: "/weapons-assets/bambo.png", name: "Pando", title: "The Iron Fist", color: "#7cff00", icon: "⚡" },
    { img: "/weapons-assets/zira.png", name: "Aelis", title: "The Flame Archer", color: "#ff2bd6", icon: "🔥" },
  ];

  const [activeHeroIndex, setActiveHeroIndex] = useState(2); // Kael (index 2) is active by default
  const [carouselTranslateX, setCarouselTranslateX] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to Our Story section
  const handleScrollToStory = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("our-story");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Carousel navigation
  const handlePrevHero = () => {
    setActiveHeroIndex((prev) => {
      const newIndex = prev === 0 ? heroes.length - 1 : prev - 1;
      return newIndex;
    });
  };

  const handleNextHero = () => {
    setActiveHeroIndex((prev) => {
      const newIndex = prev === heroes.length - 1 ? 0 : prev + 1;
      return newIndex;
    });
  };

  // Adjust translation for responsiveness when activeHeroIndex changes
  useEffect(() => {
    if (!trackRef.current) return;
    const isMobile = window.innerWidth <= 640;
    const isTablet = window.innerWidth <= 1100 && window.innerWidth > 640;

    if (isMobile) {
      // On mobile, show 1 card and center the active card
      setCarouselTranslateX(-activeHeroIndex * 100);
    } else if (isTablet) {
      // On tablet, show 3 cards and shift so active card is visible / centered
      const offsetIndex = Math.max(0, Math.min(activeHeroIndex - 1, heroes.length - 3));
      setCarouselTranslateX(-offsetIndex * 33.333);
    } else {
      // On desktop, all cards are visible, no translations needed
      setCarouselTranslateX(0);
    }
  }, [activeHeroIndex]);

  return (
    <div className={styles.page}>
      
      {/* ── HERO SECTION ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.sectionBadge}>
            <PawPrint className="h-3.5 w-3.5" />
            <span>About ZUNO</span>
          </div>
          <h1 className={styles.heroH1}>
            MORE THAN A GAME.<br />
            <span className={styles.heroAccent}>A UNIVERSE.</span>
          </h1>
          <p className={styles.heroPara}>
            ZUNO is a next-gen animal battle adventure where strategy, skill, and teamwork create legends.
          </p>
          <p className={styles.heroPara}>
            Step into a vibrant world filled with powerful heroes, epic battles, and endless adventure.
          </p>
          <a href="#our-story" onClick={handleScrollToStory} className={styles.storyBtn}>
            <PawPrint className="h-4 w-4" />
            Our Story
          </a>
        </div>
        <div className={styles.heroArt}>
          <img src="/about_hero_group.png" alt="ZUNO Heroes on Floating Platform" className={styles.heroImg} />
        </div>
      </section>

      {/* ── OUR STORY SECTION ── */}
      <section id="our-story" className={styles.storySection}>
        <div className={styles.storyLeft}>
          <img src="/about_story_scene.png" alt="Zunoverse landscapes and battles" className={styles.storyImg} />
        </div>
        <div className={styles.storyRight}>
          <div className={styles.sectionBadge}>
            <PawPrint className="h-4 w-4" style={{ color: "#00d2ff" }} />
            <span style={{ color: "#00d2ff" }}>Our Story</span>
          </div>
          <p className={styles.storyPara}>
            In a world where animals once lived in harmony, ancient guardians known as ZUNO protected the balance.
          </p>
          <p className={styles.storyPara}>
            But darkness has awakened, threatening to consume everything.
          </p>
          <p className={styles.storyPara}>
            You are a new hero, chosen to rise, fight, and protect what matters most.
          </p>
          <p className={styles.storyPara}>
            Build your team, unlock your powers, and become the legend the ZUNO universe needs.
          </p>
          <Link href="/levels" className={styles.outlineBtn}>
            Discover The World <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </section>

      {/* ── OUR PILLARS SECTION ── */}
      <section className={styles.pillarsSection}>
        <div className={styles.sectionBadgeCentered}>
          <PawPrint className="h-4 w-4" />
          <span>Our Pillars</span>
        </div>
        <div className={styles.pillarsGrid}>
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div 
                key={p.title} 
                className={styles.pillarCard} 
                style={{ "--card-glow": p.color } as React.CSSProperties}
              >
                <div className={styles.pillarIcon}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarCopy}>{p.copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── THE ZUNO UNIVERSE SECTION ── */}
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
            Explore Worlds <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {/* Slanted dynamic panels */}
        <div className={styles.worldsContainer}>
          {worlds.map((w) => (
            <div key={w.label} className={styles.worldSlice}>
              <div className={styles.worldSliceInner}>
                <img src={w.img} alt={w.label} />
                <div className={styles.worldOverlay} />
                <span className={styles.worldLabel}>{w.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MEET THE HEROES SECTION ── */}
      <section id="heroes" className={styles.heroesSection}>
        <div className={styles.heroesHeader}>
          <div className={styles.sectionBadge}>
            <PawPrint className="h-4 w-4" style={{ color: "#00d2ff" }} />
            <span style={{ color: "#00d2ff" }}>Meet The Heroes</span>
          </div>
          <Link href="/weapons" className={styles.allHeroesLink}>
            All Heroes <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className={styles.carouselWrapper}>
          <button 
            onClick={handlePrevHero} 
            className={styles.carouselBtn} 
            aria-label="Previous Hero"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className={styles.carouselTrackContainer}>
            <div 
              ref={trackRef}
              className={styles.carouselTrack}
              style={{
                transform: `translate3d(${carouselTranslateX}%, 0px, 0px)`
              }}
            >
              {heroes.map((h, index) => (
                <div 
                  key={h.name} 
                  className={`${styles.heroCard} ${index === activeHeroIndex ? styles.heroCardActive : ""}`}
                  style={{ "--hero-glow": h.color } as React.CSSProperties}
                  onClick={() => setActiveHeroIndex(index)}
                >
                  <div className={styles.heroCardImgContainer}>
                    <img src={h.img} alt={h.name} className={styles.heroCardImg} />
                  </div>
                  <div className={styles.heroCardInfo}>
                    <div className={styles.heroName}>{h.name}</div>
                    <div className={styles.heroTitle}>{h.title}</div>
                    <div className={styles.heroElementRow} style={{ color: h.color }}>
                      <span>{h.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleNextHero} 
            className={styles.carouselBtn} 
            aria-label="Next Hero"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </section>

      {/* ── BOTTOM CTA SECTION ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBox}>
          {/* Peeking Character Artworks */}
          <img src="/weapons-assets/rayo.png" alt="" className={styles.ctaArtLeft} />
          <img src="/weapons-assets/wolf.png" alt="" className={styles.ctaArtRight} />
          
          <div className={styles.ctaCenter}>
            <h2 className={styles.ctaH2}>
              YOUR <span className={styles.ctaAccent}>LEGEND</span> STARTS NOW
            </h2>
            <p className={styles.ctaSub}>
              Assemble your team. Sharpen your skills. Conquer the universe.
            </p>
            <Link href="/how-to-play" className={styles.ctaBtn}>
              <PawPrint className="h-4.5 w-4.5" />
              Play ZUNO Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
