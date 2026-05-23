import Link from "next/link";
import { ArrowRight, Sparkles, Award, ShieldAlert, Cpu, Sword, Coins, Compass } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-gray-100 font-inter overflow-hidden pb-20">
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-10 pb-20 md:py-32 z-10">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Main Enlarged Logo - Enormous and high-impact with glowing drop shadow */}
          <div className="flex justify-center animate-float">
            <img
              src="/zuno-logo.png"
              alt="ZUNO Logo"
              className="w-80 sm:w-[450px] md:w-[600px] lg:w-[700px] h-auto object-contain filter drop-shadow-[0_0_30px_rgba(255,107,0,0.85)] hover:drop-shadow-[0_0_45px_rgba(0,210,255,0.9)] transition-all duration-500 hover:scale-[1.02] cursor-pointer"
            />
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-neon-orange" />
              <span className="text-xs font-orbitron font-extrabold uppercase tracking-widest text-shadow-orange text-neon-orange">
                Milestone 1: AI-Powered Launchpad
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-orbitron font-extrabold tracking-tight uppercase leading-none">
              A Colorful <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange via-neon-purple to-electric-blue">Animal Battle</span> Adventure
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-xl text-gray-400 font-medium leading-relaxed">
              Unlock upgrades, progress through exciting levels, balance the fantasy battle economy with advanced AI systems, and explore an adventurous world created by <strong className="text-white">Paul Hartmann</strong>.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/how-to-play"
              className="group px-8 py-4 rounded-full font-orbitron font-bold text-sm uppercase tracking-widest bg-gradient-to-r from-neon-orange to-neon-purple text-white glow-border-orange transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Start Battle <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/ai-operations"
              className="px-8 py-4 rounded-full font-orbitron font-bold text-sm uppercase tracking-widest bg-medium-navy border border-white/10 text-gray-300 glow-border-blue transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Cpu className="h-4 w-4 text-electric-blue" /> AI Operations
            </Link>
          </div>
        </div>
      </section>

      {/* Media & Showcase Panels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Gameplay Preview */}
          <div className="glass-panel rounded-3xl p-4 md:p-6 glow-border-blue relative overflow-hidden group">
            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-md bg-electric-blue text-black font-orbitron font-bold text-xs uppercase tracking-wider">
              Gameplay Preview
            </div>
            <img
              src="/images/gameplay-preview.png"
              alt="ZUNO Fantasy Battle World"
              className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020514] via-transparent to-transparent opacity-80" />
            <div className="relative pt-6 space-y-2">
              <h3 className="text-2xl font-orbitron font-bold tracking-wide text-white">Adventurous Fantasy Arenas</h3>
              <p className="text-gray-400 text-sm font-medium">Explore gorgeous glowing arenas balanced continuously by the AI Game Director for absolute tactical fun.</p>
            </div>
          </div>

          {/* Character Showcase */}
          <div className="glass-panel rounded-3xl p-4 md:p-6 glow-border-orange relative overflow-hidden group">
            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-md bg-neon-orange text-white font-orbitron font-bold text-xs uppercase tracking-wider">
              Featured Champion
            </div>
            <img
              src="/images/character-showcase.png"
              alt="Featured ZUNO Champion"
              className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020514] via-transparent to-transparent opacity-80" />
            <div className="relative pt-6 space-y-2">
              <h3 className="text-2xl font-orbitron font-bold tracking-wide text-white">Legendary Animal Warriors</h3>
              <p className="text-gray-400 text-sm font-medium">Unlock customizable, cute but fierce warriors. Tailor upgrades, master glowing active skills, and conquer tiers.</p>
            </div>
          </div>

        </div>
      </section>

      {/* AI-Powered Adventure System (Operations) Section */}
      <section className="py-20 bg-medium-navy/40 relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
              <Cpu className="h-4 w-4 text-electric-blue" />
              <span className="text-xs font-orbitron font-extrabold uppercase tracking-widest text-electric-blue glow-text-blue">
                ZUNO AI Intelligence
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold uppercase text-white tracking-wide">
              AI-Powered Adventure System
            </h2>
            <p className="text-gray-400 font-medium">
              ZUNO is designed from day one with an AI-assisted game operations layer that balances levels, secures progression, audits the coin economy, and customizes rewards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Director */}
            <div className="glass-panel p-8 rounded-2xl glow-border-blue space-y-4">
              <div className="h-12 w-12 rounded-xl bg-electric-blue/10 flex items-center justify-center text-electric-blue">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider">AI Game Director</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Dynamically constructs level landscapes, populates visual items, generates quests, and maps active event layouts for constant freshness.
              </p>
            </div>

            {/* AI Balancer */}
            <div className="glass-panel p-8 rounded-2xl glow-border-green space-y-4">
              <div className="h-12 w-12 rounded-xl bg-neon-green/10 flex items-center justify-center text-neon-green">
                <Sword className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider">AI Level Balancer</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Monitors difficulty factors and dynamically balances NPC battle intelligence, skill cooldowns, and stage layouts for fair gameplay.
              </p>
            </div>

            {/* AI Monitor */}
            <div className="glass-panel p-8 rounded-2xl glow-border-orange space-y-4">
              <div className="h-12 w-12 rounded-xl bg-neon-orange/10 flex items-center justify-center text-neon-orange">
                <Coins className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider">AI Economy Monitor</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Audits secure backend coin collections, evaluates reward schedules, and stubs shop prices while enforcing secure server-side validation checks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Level progression & Difficulty Selection Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
            <Award className="h-4 w-4 text-neon-orange" />
            <span className="text-xs font-orbitron font-extrabold uppercase tracking-widest text-neon-orange glow-text-orange">
              Battle Stages
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-orbitron font-extrabold uppercase text-white tracking-wide">
            Level Progression Overview
          </h2>
          <p className="text-gray-400 font-medium">
            Test your animal combat skills across meticulously balanced combat stages. Earn higher rare-coin multipliers by tackling extreme arenas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Easy */}
          <div className="glass-panel rounded-2xl p-8 glow-border-green space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded bg-neon-green/20 text-neon-green font-orbitron font-bold text-xs uppercase tracking-wider">
                  Easy Tier
                </span>
                <span className="text-xs text-gray-500 font-semibold">Stage 1 - 10</span>
              </div>
              <h3 className="text-2xl font-orbitron font-bold text-white">Green Meadows</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Perfect for newcomers. Master animal movement, custom combat upgrades, skill mechanics, and primary coin collection sweeps.
              </p>
            </div>
            <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
              <span>Coin Multiplier: 1.0x</span>
              <span className="text-neon-green font-bold">100% Safe</span>
            </div>
          </div>

          {/* Medium */}
          <div className="glass-panel rounded-2xl p-8 glow-border-orange space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded bg-neon-orange/20 text-neon-orange font-orbitron font-bold text-xs uppercase tracking-wider">
                  Medium Tier
                </span>
                <span className="text-xs text-gray-500 font-semibold">Stage 11 - 25</span>
              </div>
              <h3 className="text-2xl font-orbitron font-bold text-white">Glowing Volcanos</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Dynamic environmental hazards, smart enemies, and challenging layout elements that test champion defense layouts.
              </p>
            </div>
            <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
              <span>Coin Multiplier: 1.8x</span>
              <span className="text-neon-orange font-bold">Medium Risk</span>
            </div>
          </div>

          {/* Hard */}
          <div className="glass-panel rounded-2xl p-8 glow-border-purple space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded bg-neon-purple/20 text-neon-purple font-orbitron font-bold text-xs uppercase tracking-wider">
                  Hard Tier
                </span>
                <span className="text-xs text-gray-500 font-semibold">Stage 26+</span>
              </div>
              <h3 className="text-2xl font-orbitron font-bold text-white">Deep Purple Rift</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Elite boss battles, intense combat triggers, and unpredictable AI Director layouts. High rewards for elite players.
              </p>
            </div>
            <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
              <span>Coin Multiplier: 3.0x</span>
              <span className="text-neon-purple font-bold">Extreme Risk</span>
            </div>
          </div>
        </div>
      </section>

      {/* APK & Apple App Store download badge preview section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center relative z-10 glass-panel rounded-3xl glow-border-blue bg-gradient-to-br from-[#060b26]/80 to-[#030712]/95 backdrop-blur-md">
        <div className="space-y-6">
          <ShieldAlert className="h-10 w-10 text-electric-blue mx-auto animate-pulse" />
          <h2 className="text-3xl sm:text-4xl font-orbitron font-extrabold uppercase text-white tracking-wide">
            Mobile Adventure Coming Soon
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 font-medium text-sm sm:text-base">
            We are actively packaging ZUNO for high-performance mobile devices. Prepare to explore, conquer, and collect upgrades on the go.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <div className="px-6 py-3.5 bg-black/40 border border-white/10 rounded-xl flex items-center gap-3">
              <span className="text-neon-green text-xs font-bold uppercase tracking-widest font-orbitron">Android APK</span>
              <span className="text-gray-500 text-xs font-bold">COMING SOON</span>
            </div>
            <div className="px-6 py-3.5 bg-black/40 border border-white/10 rounded-xl flex items-center gap-3">
              <span className="text-electric-blue text-xs font-bold uppercase tracking-widest font-orbitron">Apple Store</span>
              <span className="text-gray-500 text-xs font-bold">COMING SOON</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
