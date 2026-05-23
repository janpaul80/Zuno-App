import Link from "next/link";
import { Play, ShieldAlert, Award, Compass, Heart, Zap, Sparkles } from "lucide-react";

export default function HowToPlayPage() {
  const steps = [
    {
      id: "01",
      title: "Choose Your Champion",
      desc: "Select a custom animal warrior from the ZUNO roster. Each warrior possesses unique combat element capabilities, active skins, and base level multipliers.",
    },
    {
      id: "02",
      title: "Select Difficulty Tier",
      desc: "Begin with Green Meadows (Easy) to master controls, or test yourself inside Glowing Volcanos (Medium) and Deep Purple Rifts (Hard) for massive rewards.",
    },
    {
      id: "03",
      title: "Battle & Earn Coins",
      desc: "Explore arenas, defeat hostile entities, cast glowing elemental abilities, collect rare coins, and secure upgrades validated safely by the server.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 font-inter">
      <div className="space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
            <Play className="h-4 w-4 text-electric-blue" />
            <span className="text-xs font-orbitron font-extrabold uppercase tracking-widest text-electric-blue glow-text-blue">
              Battle Guide
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-orbitron font-extrabold uppercase text-white tracking-wide leading-none">
            How to <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange via-neon-purple to-electric-blue">Play</span>
          </h1>
          <p className="text-gray-400 font-medium sm:text-lg">
            Master the glowing controls, upgrade your animal champion's active skills, and conquer complex arenas.
          </p>
        </div>

        {/* 3 Step Onboarding Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="glass-panel p-8 rounded-2xl glow-border-orange relative overflow-hidden group">
              <div className="absolute top-[-20px] right-[-10px] text-8xl font-orbitron font-black text-white/[0.03] select-none group-hover:text-neon-orange/[0.08] transition-colors duration-300">
                {step.id}
              </div>
              <div className="space-y-4 relative z-10">
                <div className="h-10 w-10 bg-neon-orange/15 flex items-center justify-center rounded-xl font-orbitron font-extrabold text-neon-orange">
                  {step.id}
                </div>
                <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Keyboard & Touch Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
          
          {/* Virtual Gaming Controls */}
          <div className="glass-panel p-8 rounded-3xl glow-border-blue space-y-6">
            <h3 className="text-2xl font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-3">
              <Zap className="h-6 w-6 text-electric-blue" /> Combat Key Layout
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-black/30 border border-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-medium-navy border border-white/10 rounded font-orbitron font-bold text-sm text-electric-blue">W A S D</span>
                  <span className="text-sm font-semibold text-gray-300">Movement Keys</span>
                </div>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Navigate</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-black/30 border border-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 bg-medium-navy border border-white/10 rounded font-orbitron font-bold text-sm text-neon-orange">Space</span>
                  <span className="text-sm font-semibold text-gray-300">Jump / Dodge Roll</span>
                </div>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Avoid Attacks</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-black/30 border border-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 bg-medium-navy border border-white/10 rounded font-orbitron font-bold text-sm text-neon-purple">Left Click</span>
                  <span className="text-sm font-semibold text-gray-300">Elemental Primary Strike</span>
                </div>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Attack</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-black/30 border border-white/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-medium-navy border border-white/10 rounded font-orbitron font-bold text-sm text-neon-green">Q / E</span>
                  <span className="text-sm font-semibold text-gray-300">Cast Glowing Special Skills</span>
                </div>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Ultimate Skills</span>
              </div>
            </div>
          </div>

          {/* Elemental Synergies */}
          <div className="glass-panel p-8 rounded-3xl glow-border-purple space-y-6">
            <h3 className="text-2xl font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-neon-purple" /> Element Mastery
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-medium-navy/50 p-4 border border-white/5 rounded-xl space-y-2">
                <div className="text-neon-orange font-orbitron font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5 fill-current" /> Fire Element
                </div>
                <p className="text-gray-400 text-xs font-semibold leading-relaxed">
                  Heavy glowing heat attacks. Explodes obstacles and boosts baseline combat damage values.
                </p>
              </div>

              <div className="bg-medium-navy/50 p-4 border border-white/5 rounded-xl space-y-2">
                <div className="text-electric-blue font-orbitron font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5" /> Frost / Tech Element
                </div>
                <p className="text-gray-400 text-xs font-semibold leading-relaxed">
                  Slows down high-difficulty enemy entities and secures visual shielding parameters.
                </p>
              </div>

              <div className="bg-medium-navy/50 p-4 border border-white/5 rounded-xl space-y-2">
                <div className="text-neon-purple font-orbitron font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" /> Rift Element
                </div>
                <p className="text-gray-400 text-xs font-semibold leading-relaxed">
                  Casts dimensional teleportation spells and enables double coin collection ranges.
                </p>
              </div>

              <div className="bg-medium-navy/50 p-4 border border-white/5 rounded-xl space-y-2">
                <div className="text-neon-green font-orbitron font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5" /> Nature Element
                </div>
                <p className="text-gray-400 text-xs font-semibold leading-relaxed">
                  Provides continuous player healing multipliers and increases level upgrade speeds.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Warning Policy info */}
        <div className="max-w-4xl mx-auto text-center glass-panel p-6 rounded-2xl glow-border-green flex items-center flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-3 text-left">
            <ShieldAlert className="h-10 w-10 text-neon-green flex-shrink-0 animate-pulse" />
            <div>
              <h4 className="font-orbitron font-bold text-white uppercase text-sm tracking-wide">AI-Assisted Operations</h4>
              <p className="text-xs text-gray-400">All levels are continuously balanced using real-time telemetry to prevent exploits.</p>
            </div>
          </div>
          <Link
            href="/rewards"
            className="px-6 py-2.5 bg-neon-green/20 hover:bg-neon-green/45 text-neon-green rounded-full font-orbitron font-bold text-xs uppercase tracking-widest transition-colors duration-200"
          >
            Review Rewards
          </Link>
        </div>

      </div>
    </div>
  );
}
