import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  Boxes,
  Cloud,
  Coins,
  Gamepad2,
  Gem,
  Joystick,
  LockKeyhole,
  Server,
  Shield,
  ShoppingBag,
  Swords,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import type { ElementType } from "react";

export const metadata: Metadata = {
  title: "ZUNO Architecture — Android APK + Online Backend",
  description:
    "The scalable ZUNO product architecture: a stylized 3D mobile platformer APK backed by login, cloud inventory, online shop, leaderboards, and multiplayer services.",
};

type Card = {
  title: string;
  copy: string;
  icon: ElementType;
  accent: string;
};

const gameplayCards: Card[] = [
  {
    title: "3D Action Platforming",
    copy: "Crash-style forward progression with guided camera, precision jumps, slides, dodge timing, breakable crates, side paths, and moving platforms.",
    icon: Gamepad2,
    accent: "#00d2ff",
  },
  {
    title: "Three Difficulty Tiers",
    copy: "Easy keeps levels shorter and readable, Medium adds hazards and timed routes, Hard introduces aggressive enemies, precision traps, and boss encounters.",
    icon: Trophy,
    accent: "#ffd21f",
  },
  {
    title: "Coins, Gems & Treasures",
    copy: "Coin clusters, chests, hidden vaults, level-end bonuses, and rare gems feed upgrades without letting the client control the economy.",
    icon: Coins,
    accent: "#ff7a00",
  },
  {
    title: "Weapons, Armor & Gadgets",
    copy: "Punches, kicks, spin attacks, elemental melee weapons, boomerangs, orbs, mini-blasters, shields, magnets, boosters, and time-slow devices.",
    icon: Swords,
    accent: "#ff2bd6",
  },
  {
    title: "Expressive Characters",
    copy: "Animated idle, run, jump, slide, dodge, combo, hit, victory, and short voice-line reactions keep ZUNO feeling alive on mobile.",
    icon: Zap,
    accent: "#7cff00",
  },
  {
    title: "Enemy & Boss Systems",
    copy: "Patrolling grunts, ranged attackers, heavy units, trap enemies, mini-bosses, and level bosses drop validated rewards after server sync.",
    icon: Shield,
    accent: "#bd00ff",
  },
];

const backendCards: Card[] = [
  {
    title: "Supabase Auth",
    copy: "User accounts, authentication, cloud profiles, and player identity shared by the APK, shop, leaderboard, and multiplayer systems.",
    icon: LockKeyhole,
    accent: "#7cff00",
  },
  {
    title: "Server-Owned Economy",
    copy: "Coins, gems, purchases, inventory, prices, unlocks, health upgrades, uniforms, armor, and special abilities are validated server-side.",
    icon: ShoppingBag,
    accent: "#ffd21f",
  },
  {
    title: "Vercel API Routes",
    copy: "Mobile-safe endpoints handle shop catalog, purchase validation, save sync, rewards, progression, anti-cheat checks, and app config.",
    icon: Server,
    accent: "#00d2ff",
  },
  {
    title: "Multiplayer Ready",
    copy: "Matchmaking, player stats, leaderboards, and match-result sync live in the backend now; Photon or PlayFab can be added for real-time combat later.",
    icon: Users,
    accent: "#ff2bd6",
  },
];

const apkResponsibilities = [
  "Android APK client with virtual joystick and 2–3 action buttons",
  "60 FPS target on mid-range devices with compressed assets under a recommended 300MB APK",
  "Login, local caching, shop UI, inventory UI, multiplayer UI, and guided-camera level gameplay",
  "Cloud sync for profile, inventory, currencies, purchases, progression, and match results",
  "Local storage as a cache only, not the source of truth for premium economy or unlocks",
];

const economyItems = [
  "Weapons",
  "Armor sets",
  "Uniforms / skins",
  "Gadgets",
  "Health upgrades",
  "Special abilities",
  "Revive tokens",
  "Premium gems",
];

function FeatureCard({ card }: { card: Card }) {
  const Icon = card.icon;

  return (
    <article
      className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_0_35px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:border-white/25"
      style={{ boxShadow: `0 0 34px ${card.accent}18` }}
    >
      <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(circle at top right, ${card.accent}22, transparent 55%)` }} />
      <div className="relative z-10">
        <div
          className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-black/35"
          style={{ color: card.accent, filter: `drop-shadow(0 0 12px ${card.accent}88)` }}
        >
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-russo text-lg uppercase tracking-[0.08em] text-white">{card.title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/68">{card.copy}</p>
      </div>
    </article>
  );
}

export default function ArchitecturePage() {
  return (
    <div className="relative overflow-hidden bg-[#020617]">
      <section className="relative px-4 py-16 sm:px-6 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,210,255,0.14),transparent_38%),radial-gradient(circle_at_80%_10%,rgba(255,43,214,0.13),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(255,122,0,0.12),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-russo text-xs uppercase tracking-[0.34em] text-zuno-gold">Approved direction</p>
            <h1 className="mt-4 font-bangers text-[clamp(3rem,9vw,6.8rem)] leading-[0.88] tracking-[0.03em] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]">
              Android APK + Online Backend
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/76">
              ZUNO is now positioned as a stylized 3D action-adventure platformer for Android: Crash-Bandicoot-style level flow, Oceanhorn-like fantasy presentation, online login, server-owned shop economy, cloud inventory, leaderboards, and multiplayer-ready progression.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/levels"
                className="inline-flex items-center justify-center rounded-xl border-2 border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] px-7 py-3 font-russo text-sm font-black uppercase tracking-[0.12em] text-black shadow-[0_0_28px_rgba(255,122,0,0.45),4px_4px_0_#14002e] transition hover:-translate-y-0.5"
              >
                Explore Levels
              </Link>
              <Link
                href="/weapons"
                className="inline-flex items-center justify-center rounded-xl border border-[#00d2ff]/35 bg-[#06102a]/80 px-7 py-3 font-russo text-sm font-black uppercase tracking-[0.12em] text-white shadow-[0_0_20px_rgba(0,210,255,0.16)] transition hover:-translate-y-0.5"
              >
                View Armory
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              ["Client", "Android APK"],
              ["Backend", "Vercel + Supabase"],
              ["Economy", "Server Validated"],
              ["Multiplayer", "Ready to Scale"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-sm">
                <div className="font-russo text-[10px] uppercase tracking-[0.22em] text-white/45">{label}</div>
                <div className="mt-2 font-russo text-xl text-white">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="font-russo text-xs uppercase tracking-[0.28em] text-zuno-blue">Game pillars</p>
              <h2 className="mt-2 font-bangers text-5xl leading-none text-white">Platformer Feature Set</h2>
            </div>
            <Gamepad2 className="hidden h-12 w-12 text-zuno-blue drop-shadow-[0_0_16px_rgba(0,210,255,0.7)] md:block" />
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {gameplayCards.map((card) => (
              <FeatureCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.78fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#060b26]/80 p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <Cloud className="h-10 w-10 text-zuno-green drop-shadow-[0_0_14px_rgba(124,255,0,0.65)]" />
              <div>
                <p className="font-russo text-xs uppercase tracking-[0.24em] text-zuno-green">Backend architecture</p>
                <h2 className="font-bangers text-5xl leading-none text-white">Vercel + Supabase First</h2>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-white/70">
              The APK is the game client. The backend is the authority for accounts, catalog data, prices, currencies, inventory, purchases, cloud saves, leaderboards, and match results. Real-time multiplayer can graduate to PlayFab + Photon if combat synchronization becomes the chosen mode.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {backendCards.map((card) => (
                <FeatureCard key={card.title} card={card} />
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-black/35 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Joystick className="h-9 w-9 text-zuno-orange" />
              <h2 className="font-russo text-2xl uppercase tracking-[0.06em] text-white">APK Responsibilities</h2>
            </div>
            <ul className="mt-6 space-y-4">
              {apkResponsibilities.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-white/72">
                  <BadgeCheck className="mt-1 h-4 w-4 flex-none text-zuno-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(189,0,255,0.16),rgba(0,210,255,0.08)_45%,rgba(255,122,0,0.14))] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="flex items-center gap-3">
                <Gem className="h-9 w-9 text-zuno-gold" />
                <h2 className="font-bangers text-5xl leading-none text-white">Online Shop Scope</h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/72">
                Store screens should support model previews, stat comparisons, purchase confirmations, and an equip flow. Catalog and ownership data should be loaded from the backend so the economy stays secure and adjustable after APK release.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {economyItems.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center font-russo text-xs uppercase tracking-[0.08em] text-white/78">
                  <Boxes className="mx-auto mb-3 h-6 w-6 text-zuno-blue" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
