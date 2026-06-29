"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Box,
  Crosshair,
  Gamepad2,
  PawPrint,
  Play,
  Settings,
  Sparkles,
  Swords,
  Trophy,
  Users,
} from "lucide-react";
import type { CSSProperties, ElementType } from "react";
import styles from "./page.module.css";

type Accent = "cyan" | "magenta" | "gold" | "orange" | "green";

type FeatureCard = {
  title: string;
  copy: string;
  icon: ElementType;
  accent: Accent;
  crop: string;
  art: string;
};

const heroParticles = [
  { left: "8%", top: "62%", duration: "12s", delay: "-1s", drift: "24px" },
  { left: "17%", top: "36%", duration: "15s", delay: "-7s", drift: "-18px" },
  { left: "28%", top: "74%", duration: "13s", delay: "-4s", drift: "30px" },
  { left: "43%", top: "29%", duration: "16s", delay: "-10s", drift: "-22px" },
  { left: "56%", top: "68%", duration: "14s", delay: "-2s", drift: "18px" },
  { left: "72%", top: "42%", duration: "17s", delay: "-8s", drift: "-30px" },
  { left: "86%", top: "58%", duration: "13s", delay: "-5s", drift: "24px" },
  { left: "92%", top: "30%", duration: "18s", delay: "-12s", drift: "-16px" },
];

const heroEmbers = [
  { left: "12%", top: "86%", duration: "9s", delay: "-3s", drift: "18px" },
  { left: "32%", top: "91%", duration: "10s", delay: "-7s", drift: "-24px" },
  { left: "52%", top: "83%", duration: "8s", delay: "-1s", drift: "22px" },
  { left: "68%", top: "88%", duration: "11s", delay: "-5s", drift: "-18px" },
  { left: "82%", top: "80%", duration: "9.5s", delay: "-8s", drift: "20px" },
];

const stats = [
  { label: "Universe", value: "1", detail: "Amazing world", icon: PawPrint, accent: "green" },
  { label: "Challenge", value: "3", detail: "Difficulty tiers", icon: Brain, accent: "magenta" },
  { label: "Rewards", value: "Legendary", detail: "Epic loot awaits", icon: Box, accent: "orange" },
  { label: "Backend", value: "Online", detail: "Cloud synced", icon: Swords, accent: "cyan" },
] as const;

const features: FeatureCard[] = [
  {
    title: "3D Platforming",
    copy: "Run, jump, slide, dodge, and smash crates through guided-camera fantasy levels.",
    icon: PawPrint,
    accent: "cyan",
    crop: "center",
    art: "/swipe-strike.png",
  },
  {
    title: "Online Progression",
    copy: "Login, sync your profile, and protect inventory, coins, gems, and purchases server-side.",
    icon: Brain,
    accent: "magenta",
    crop: "center",
    art: "/characters.png",
  },
  {
    title: "Earn & Upgrade",
    copy: "Earn rewards, upgrade animals, and grow stronger.",
    icon: Sparkles,
    accent: "gold",
    crop: "center",
    art: "/rewards-coins.png",
  },
  {
    title: "Compete & Rank",
    copy: "Climb leaderboards and prepare for multiplayer-ready progression.",
    icon: Trophy,
    accent: "orange",
    crop: "center",
    art: "/weapons.png",
  },
  {
    title: "Explore the World",
    copy: "Discover stunning worlds filled with mystery and adventure.",
    icon: Crosshair,
    accent: "green",
    crop: "center",
    art: "/levels.png",
  },
];

const modes: Array<{ title: string; copy: string; accent: Accent; crop: string; art: string }> = [
  { title: "Easy Runs", copy: "Short levels and simple traps", accent: "cyan", crop: "center", art: "/levels-assets/card-grasslands.png" },
  { title: "Medium Routes", copy: "Hazards, side paths, timed obstacles", accent: "magenta", crop: "center", art: "/levels-assets/card-ember-volcano.png" },
  { title: "Hard Trials", copy: "Precision jumps and boss encounters", accent: "green", crop: "center", art: "/levels-assets/card-titan-arena.png" },
  { title: "Online Shop", copy: "Server-validated gear and upgrades", accent: "orange", crop: "center", art: "/rewards-coins.png" },
  { title: "Multiplayer", copy: "Identity, matchmaking, stats, leaderboards", accent: "cyan", crop: "center", art: "/levels-assets/card-neon-abyss.png" },
];

const featureList = [
  { title: "Collect & Upgrade", copy: "Gather coins, rare gems, chests, vault rewards, and level-end bonuses.", icon: PawPrint },
  { title: "Customize Loadouts", copy: "Buy weapons, uniforms, armor, gadgets, health upgrades, and abilities.", icon: Settings },
  { title: "Mobile Controls", copy: "Use a virtual joystick with punch, jump, slide, dodge, and gadget buttons.", icon: Gamepad2 },
  { title: "Cloud-Backed Play", copy: "Sync login, profile, inventory, shop purchases, stats, and match results.", icon: Users },
];

function motionStyle(values: Record<string, string | number>): CSSProperties {
  return values as CSSProperties;
}

function accentClass(accent: Accent) {
  return styles[`accent${accent[0].toUpperCase()}${accent.slice(1)}` as keyof typeof styles];
}

export default function HomePage() {
  return (
    <div className={`relative overflow-x-hidden ${styles.homeShell}`}>
      <section className={`relative w-full overflow-hidden ${styles.heroStage}`}>
        <div className={`relative w-full ${styles.heroViewport}`}>
          <img
            src="/images/zuno-game.png"
            alt="ZUNO animal battle adventure"
            className={`block w-full h-auto object-cover object-[center_top] ${styles.heroArt}`}
          />

          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.24)_0%,rgba(2,6,23,0.02)_28%,rgba(2,6,23,0.15)_58%,rgba(2,6,23,0.9)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(255,122,0,0.11),transparent_45%)]" />
          <div className={styles.heroAtmosphere} aria-hidden="true" />
          <div className={styles.particleField} aria-hidden="true">
            {heroParticles.map((particle, index) => (
              <span
                key={`particle-${index}`}
                style={motionStyle({
                  left: particle.left,
                  top: particle.top,
                  "--duration": particle.duration,
                  "--delay": particle.delay,
                  "--drift-x": particle.drift,
                })}
              />
            ))}
          </div>
          <div className={styles.emberField} aria-hidden="true">
            {heroEmbers.map((ember, index) => (
              <span
                key={`ember-${index}`}
                style={motionStyle({
                  left: ember.left,
                  top: ember.top,
                  "--duration": ember.duration,
                  "--delay": ember.delay,
                  "--drift-x": ember.drift,
                })}
              />
            ))}
          </div>
        </div>

        <div className={`z-10 flex flex-col items-center px-4 ${styles.heroCta}`}>
          <Link
            href="/how-to-play"
            className={`inline-flex items-center justify-center gap-2 px-9 py-3.5 rounded-md border-2 border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black font-russo font-black uppercase tracking-[0.11em] text-sm shadow-[0_0_28px_rgba(255,122,0,0.58),4px_4px_0_#14002e] transition hover:-translate-y-0.5 ${styles.ctaPrimary}`}
          >
            <PawPrint className="h-4 w-4 fill-current" />
            Play Zuno Now
          </Link>
          <p className="mt-3 font-russo text-[10px] uppercase tracking-[0.26em] text-white/85">
            Your legend starts here
          </p>
        </div>

        <div className={`z-10 ${styles.heroStats}`}>
          <div className={styles.statRail}>
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className={`${styles.statRailItem} ${accentClass(item.accent)}`}>
                  <div className={styles.statIcon}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-russo text-[10px] uppercase tracking-[0.18em] text-white/55">{item.label}</div>
                    <div className={styles.statValue}>{item.value}</div>
                    <div className="font-russo text-[9px] uppercase tracking-[0.12em] text-white/62">{item.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`relative z-10 py-14 md:py-20 bg-[#020617] overflow-hidden ${styles.cinematicSection}`}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className={`text-center font-bangers text-[clamp(2.4rem,6vw,4.3rem)] leading-none tracking-[0.03em] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] ${styles.reveal}`}>
            WHY PLAY <span className="text-[#7f55ff]">ZUNO?</span>
          </h2>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className={`${styles.tallFeatureCard} ${accentClass(feature.accent)} ${styles.reveal}`}
                  style={motionStyle({
                    "--art-position": feature.crop,
                    "--art-url": `url('${feature.art}')`,
                    "--idle-delay": `${index * -0.65}s`,
                    "--reveal-delay": `${index * 80}ms`,
                  })}
                >
                  <div className={styles.tallFeatureGlow} />
                  <div className={styles.featureIcon}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.copy}</p>
                  <div className={styles.cardArtwork} aria-hidden="true" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`relative z-10 bg-[#020617] pb-10 md:pb-16 overflow-hidden ${styles.cinematicSection}`}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`${styles.gameplayPanel} ${styles.reveal}`}>
            <div className={styles.gameplayCopy}>
              <span>3D Platformer</span>
              <h2>
                Run. Jump.
                <strong>Adventure.</strong>
              </h2>
              <p>
                Sprint through linear fantasy stages with hidden side paths, traps, rolling hazards, enemy encounters, treasure chests, and boss-ready progression.
              </p>
              <Link href="/how-to-play" className={`${styles.ctaSecondary} ${styles.panelButton}`}>
                Explore Gameplay
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className={styles.gameplayFrame}>
              <img src="/images/gameplay-preview.png" alt="ZUNO gameplay preview" />
              <div className={styles.gameplayHud}>Arcane Pulse</div>
            </div>
          </div>
        </div>
      </section>

      <section className={`relative z-10 bg-[#020617] pb-10 md:pb-16 overflow-hidden ${styles.cinematicSection}`}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className={styles.sectionTitleRow}>
            <span />
            <h2>Game Modes</h2>
            <span />
          </div>

          <div className={styles.modeGrid}>
            {modes.map((mode, index) => (
              <article
                key={mode.title}
                className={`${styles.modeCard} ${accentClass(mode.accent)} ${styles.reveal}`}
                style={motionStyle({
                  "--art-position": mode.crop,
                  "--art-url": `url('${mode.art}')`,
                  "--reveal-delay": `${index * 80}ms`,
                })}
              >
                <div className={styles.modeArt} aria-hidden="true" />
                <h3>{mode.title}</h3>
                <p>{mode.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`relative z-10 bg-[#020617] pb-12 md:pb-20 overflow-hidden ${styles.cinematicSection}`}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className={styles.lowerGrid}>
            <article className={`${styles.infoPanel} ${styles.reveal}`}>
              <h2>
                <PawPrint className="h-6 w-6" />
                Powerful Features
              </h2>
              <div className={styles.featureList}>
                {featureList.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className={styles.featureLine} style={motionStyle({ "--line-index": index })}>
                      <span>
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3>{feature.title}</h3>
                        <p>{feature.copy}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className={`${styles.infoPanel} ${styles.reveal}`} style={motionStyle({ "--reveal-delay": "100ms" })}>
              <h2>Cinematic Trailer</h2>
              <div className={styles.videoShell}>
                <video src="/zuno-trailer.mp4" poster="/images/zuno-game.png" controls preload="metadata" />
                <div className={styles.playAura} aria-hidden="true">
                  <Play className="h-10 w-10 fill-current" />
                </div>
              </div>
            </article>
          </div>

          <div className={`${styles.bottomCta} ${styles.reveal}`}>
            <div className={styles.bottomCharacterLeft} aria-hidden="true">
              <img src="/images/character-showcase.png" alt="" />
            </div>
            <div>
              <p>Build your team.</p>
              <h2>Rule the Arena.</h2>
              <Link href="/how-to-play" className={`${styles.ctaPrimary} ${styles.bottomButton}`}>
                <PawPrint className="h-4 w-4 fill-current" />
                Play Zuno Now
              </Link>
            </div>
            <div className={styles.bottomCharacterRight} aria-hidden="true">
              <img src="/images/character-showcase.png" alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
