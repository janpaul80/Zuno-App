import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Cloud, Gamepad2, Layers3, Rocket, ShoppingBag, Users } from "lucide-react";
import type { ElementType } from "react";

export const metadata: Metadata = {
  title: "ZUNO Roadmap — Development Phases",
  description:
    "ZUNO development roadmap covering website alignment, backend foundation, Android game client, shop and inventory progression, and multiplayer readiness.",
};

type Phase = {
  number: string;
  title: string;
  status: "Complete" | "In Progress" | "Next" | "Planned";
  summary: string;
  icon: ElementType;
  accent: string;
  goals: string[];
};

const phases: Phase[] = [
  {
    number: "01",
    title: "Website alignment",
    status: "Complete",
    summary: "Make the public site match the approved product direction before deeper systems work begins.",
    icon: Layers3,
    accent: "#7cff00",
    goals: [
      "Position ZUNO as a stylized 3D Android action-platformer",
      "Document the APK + online backend architecture direction",
      "Keep current website updates content-only and safe",
    ],
  },
  {
    number: "02",
    title: "Backend foundation",
    status: "Complete",
    summary: "Design and implement the server authority for player identity, economy data, and cloud profile sync.",
    icon: Cloud,
    accent: "#00d2ff",
    goals: [
      "Set up Supabase auth, database tables, and storage boundaries",
      "Add Vercel API routes for mobile-safe profile, catalog, and save operations",
      "Define anti-cheat rules so coins, gems, inventory, and purchases are never client-owned",
    ],
  },
  {
    number: "03",
    title: "Android game client",
    status: "In Progress",
    summary: "Build the APK client around guided-camera levels, mobile controls, character movement, combat, and offline-safe caching.",
    icon: Gamepad2,
    accent: "#ff7a00",
    goals: [
      "Prototype the forward-moving 3D platformer controller and guided camera",
      "Add virtual joystick, jump, attack, slide, dodge, and gadget controls",
      "Target mid-range Android performance, small APK size, and 60 FPS gameplay",
    ],
  },
  {
    number: "04",
    title: "Shop, inventory, and progression",
    status: "Planned",
    summary: "Connect gameplay rewards to server-validated unlocks, equipment, upgrades, and progression systems.",
    icon: ShoppingBag,
    accent: "#ffd21f",
    goals: [
      "Load weapons, armor, uniforms, gadgets, health upgrades, and abilities from the backend",
      "Support model previews, stat comparison, purchase confirmation, and equip screens",
      "Sync coins, gems, treasure rewards, level completion, inventory, and player stats",
    ],
  },
  {
    number: "05",
    title: "Multiplayer readiness",
    status: "Planned",
    summary: "Prepare player identity, matchmaking, leaderboards, and match-result sync before deciding real-time or asynchronous play.",
    icon: Users,
    accent: "#ff2bd6",
    goals: [
      "Track player stats and leaderboard data server-side",
      "Define matchmaking inputs, match result validation, and reward payout rules",
      "Leave room to add PlayFab + Photon later if ZUNO needs real-time multiplayer combat",
    ],
  },
];

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const Icon = phase.icon;

  return (
    <article className="relative grid gap-5 rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_0_36px_rgba(0,0,0,0.24)] md:grid-cols-[9rem_1fr] md:p-6">
      <div className="absolute inset-0 rounded-[1.75rem] opacity-70" style={{ background: `radial-gradient(circle at top left, ${phase.accent}18, transparent 45%)` }} />
      <div className="relative z-10 flex items-center gap-4 md:block">
        <div className="font-bangers text-6xl leading-none text-white/16 md:text-7xl">{phase.number}</div>
        <div
          className="mt-0 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-black/35 md:mt-4"
          style={{ color: phase.accent, filter: `drop-shadow(0 0 14px ${phase.accent}88)` }}
        >
          <Icon className="h-7 w-7" />
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="font-russo text-xl uppercase tracking-[0.08em] text-white md:text-2xl">{phase.title}</h2>
          <span
            className="rounded-full border px-3 py-1 font-russo text-[10px] uppercase tracking-[0.16em]"
            style={{ borderColor: `${phase.accent}66`, color: phase.accent, backgroundColor: `${phase.accent}12` }}
          >
            {phase.status}
          </span>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">{phase.summary}</p>
        <ul className="mt-5 grid gap-3 lg:grid-cols-3">
          {phase.goals.map((goal) => (
            <li key={goal} className="flex gap-3 rounded-2xl border border-white/8 bg-black/25 p-4 text-sm leading-6 text-white/72">
              <BadgeCheck className="mt-1 h-4 w-4 flex-none" style={{ color: phase.accent }} />
              <span>{goal}</span>
            </li>
          ))}
        </ul>
        {index < phases.length - 1 && <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />}
      </div>
    </article>
  );
}

export default function RoadmapPage() {
  return (
    <div className="relative overflow-hidden bg-[#020617]">
      <section className="relative px-4 py-16 sm:px-6 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(124,255,0,0.12),transparent_34%),radial-gradient(circle_at_82%_12%,rgba(0,210,255,0.14),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(255,43,214,0.12),transparent_42%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="font-russo text-xs uppercase tracking-[0.34em] text-zuno-green">Development roadmap</p>
            <h1 className="mt-4 font-bangers text-[clamp(3.2rem,9vw,7rem)] leading-[0.88] tracking-[0.03em] text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.65)]">
              Build ZUNO in Safe Phases
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/76">
              The backend foundation is established and the Unity Android client is now in production development. Work advances through focused, independently verifiable gameplay slices.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/architecture"
                className="inline-flex items-center justify-center rounded-xl border-2 border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] px-7 py-3 font-russo text-sm font-black uppercase tracking-[0.12em] text-black shadow-[0_0_28px_rgba(255,122,0,0.45),4px_4px_0_#14002e] transition hover:-translate-y-0.5"
              >
                View Architecture
              </Link>
              <Link
                href="/levels"
                className="inline-flex items-center justify-center rounded-xl border border-[#00d2ff]/35 bg-[#06102a]/80 px-7 py-3 font-russo text-sm font-black uppercase tracking-[0.12em] text-white shadow-[0_0_20px_rgba(0,210,255,0.16)] transition hover:-translate-y-0.5"
              >
                Explore Levels
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {phases.map((phase) => (
              <div key={phase.number} className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-sm">
                <div className="font-bangers text-4xl leading-none" style={{ color: phase.accent }}>{phase.number}</div>
                <div className="mt-2 font-russo text-[11px] uppercase tracking-[0.13em] text-white/70">{phase.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-7xl space-y-5">
          {phases.map((phase, index) => (
            <PhaseCard key={phase.number} phase={phase} index={index} />
          ))}
        </div>
      </section>

      <section className="relative z-10 px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(0,210,255,0.12),rgba(255,122,0,0.12))] p-6 sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Rocket className="h-8 w-8 text-zuno-orange drop-shadow-[0_0_14px_rgba(255,122,0,0.7)]" />
                <h2 className="font-russo text-2xl uppercase tracking-[0.08em] text-white">Current safe step</h2>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/72">
                Complete the Grasslands playable slice: verify the Unity import and APK on Android, replace Aelis’s greybox visual with the approved rig, then build the production animation, VFX, audio, and environment passes.
              </p>
            </div>
            <Link
              href="/support"
              className="inline-flex shrink-0 items-center justify-center rounded-xl border border-white/15 bg-black/30 px-6 py-3 font-russo text-xs font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:border-white/30"
            >
              Contact Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
