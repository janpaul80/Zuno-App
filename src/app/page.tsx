import Link from "next/link";
import { ArrowRight, Sparkles, Award, ShieldAlert, Cpu, Sword, Coins, Compass } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-slate-800 font-inter overflow-hidden pb-20">
      
      {/* Hero Section - Bright, Saturated Sky-Blue/Amber with Comic Solar burst */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-12 pb-24 z-10">
        
        {/* Rotating Solar burst vector background */}
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[800px] h-[800px] pointer-events-none z-0 opacity-40 mix-blend-multiply bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.45)_0%,transparent_70%)] animate-rotate-slow" />
        
        <div className="max-w-5xl mx-auto space-y-12 relative z-10">
          
          {/* Main Enormous Logo - Pulsing drop shadow over explosive comic backdrop */}
          <div className="flex justify-center animate-game-float relative">
            <div className="absolute inset-0 bg-yellow-300/35 rounded-full filter blur-xl scale-95" />
            <img
              src="/zuno-logo.png"
              alt="ZUNO Logo"
              className="w-80 sm:w-[480px] md:w-[620px] lg:w-[720px] h-auto object-contain filter drop-shadow-[4px_4px_0px_#000] hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            />
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-300 border-3 border-black shadow-[3px_3px_0px_0px_#000]">
              <Sparkles className="h-4 w-4 text-black" />
              <span className="text-xs font-russo font-extrabold uppercase tracking-widest text-black">
                AI-Powered Gaming Platform
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-luckiest uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-orange-500 to-red-600 comic-text-stroke leading-none">
              ANIMAL BATTLE WORLD
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-800 font-bold leading-relaxed">
              Explore a bright, colorful adventure! Progress through exciting levels, earn validated coins, unlock upgrades, and conquer tier boss battles created by <strong className="text-orange-600 font-russo">Paul Hartmann</strong>.
            </p>
          </div>

          {/* Call to Actions - Thick game buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/how-to-play"
              className="group px-8 py-4.5 rounded-2xl font-russo font-black text-sm uppercase tracking-widest game-btn-gold flex items-center gap-2"
            >
              Start Battle <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/ai-operations"
              className="px-8 py-4.5 rounded-2xl font-russo font-black text-sm uppercase tracking-widest game-btn-blue flex items-center gap-2"
            >
              <Cpu className="h-4 w-4" /> AI Operations
            </Link>
          </div>
        </div>
      </section>

      {/* Media & Artwork Showcases - Specific Contrast Areas (High-Impact Dark Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Gameplay Preview - Saturated dark contrast container */}
          <div className="game-card-dark rounded-3xl p-4 md:p-6 relative overflow-hidden group">
            <div className="absolute top-4 left-4 z-20 px-3.5 py-2 rounded-xl bg-sky-400 border-2 border-black text-black font-russo font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_#000]">
              Gameplay Preview
            </div>
            <img
              src="/images/gameplay-preview.png"
              alt="ZUNO Fantasy Battle World"
              className="w-full h-auto object-cover rounded-2xl transition-transform duration-300 group-hover:scale-[1.02] border-3 border-black shadow-[4px_4px_0px_#000]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020514] via-transparent to-transparent opacity-85 pointer-events-none" />
            <div className="relative pt-6 space-y-2">
              <h3 className="text-2xl font-russo font-bold tracking-wide text-white uppercase">Vibrant Saturated Arenas</h3>
              <p className="text-slate-300 text-xs sm:text-sm font-semibold">Explore gorgeous glowing arenas balanced continuously by the AI Game Director for absolute tactical fun.</p>
            </div>
          </div>

          {/* Character Showcase - Matching high-contrast frame */}
          <div className="game-card-dark rounded-3xl p-4 md:p-6 relative overflow-hidden group">
            <div className="absolute top-4 left-4 z-20 px-3.5 py-2 rounded-xl bg-yellow-400 border-2 border-black text-black font-russo font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_#000]">
              Featured Champion
            </div>
            <img
              src="/images/character-showcase.png"
              alt="Featured ZUNO Champion"
              className="w-full h-auto object-cover rounded-2xl transition-transform duration-300 group-hover:scale-[1.02] border-3 border-black shadow-[4px_4px_0px_#000]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020514] via-transparent to-transparent opacity-85 pointer-events-none" />
            <div className="relative pt-6 space-y-2">
              <h3 className="text-2xl font-russo font-bold tracking-wide text-white uppercase">Legendary Animal Warriors</h3>
              <p className="text-slate-300 text-xs sm:text-sm font-semibold">Unlock customizable, cute but fierce warriors. Tailor upgrades, master active skills, and conquer tiers.</p>
            </div>
          </div>

        </div>
      </section>

      {/* AI-Powered Adventure System (Bright Gradients, Cream Panels) */}
      <section className="py-20 bg-amber-100/40 relative z-10 border-y-4 border-black">
        <div className="absolute inset-0 comic-stripes opacity-[0.2] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-300 border-2 border-black shadow-[2px_2px_0px_#000]">
              <Cpu className="h-4 w-4 text-black" />
              <span className="text-xs font-russo font-extrabold uppercase tracking-widest text-black">
                ZUNO AI Intelligence
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-luckiest uppercase text-black tracking-wider comic-text-stroke-sm">
              AI-Powered Adventure System
            </h2>
            <p className="text-slate-800 font-bold">
              ZUNO is designed from day one with an AI-assisted game operations layer that balances levels, secures progression, audits the coin economy, and customizes rewards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Director - Cream card */}
            <div className="game-card-cream p-8 rounded-2xl space-y-4">
              <div className="h-12 w-12 rounded-xl bg-orange-100 border-2 border-black flex items-center justify-center text-orange-600">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-russo font-bold text-black uppercase tracking-wider">AI Game Director</h3>
              <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-semibold">
                Procedurally plans level layouts, distributes glowing items, and schedules map event layouts for constant gameplay freshness.
              </p>
            </div>

            {/* AI Balancer - Cream card */}
            <div className="game-card-cream p-8 rounded-2xl space-y-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 border-2 border-black flex items-center justify-center text-emerald-600">
                <Sword className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-russo font-bold text-black uppercase tracking-wider">AI Level Balancer</h3>
              <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-semibold">
                Evaluates win/loss records across stages and automatically balances NPC combat stats, cooldowns, and layout difficulties.
              </p>
            </div>

            {/* AI Monitor - Cream card */}
            <div className="game-card-cream p-8 rounded-2xl space-y-4">
              <div className="h-12 w-12 rounded-xl bg-blue-100 border-2 border-black flex items-center justify-center text-blue-600">
                <Coins className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-russo font-bold text-black uppercase tracking-wider">AI Economy Monitor</h3>
              <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-semibold">
                Screens coin collections and shop prices against anomalous spikes in real-time, executing strict server-side validation integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Level Progression & Difficulty Selection (White Game Cards, Grassy/Amber Accents) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-300 border-2 border-black shadow-[2px_2px_0px_#000]">
            <Award className="h-4 w-4 text-black" />
            <span className="text-xs font-russo font-extrabold uppercase tracking-widest text-black">
              Battle Stages
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-luckiest uppercase text-black tracking-wider comic-text-stroke-sm">
            Level Tiers Overview
          </h2>
          <p className="text-slate-800 font-bold">
            Test your animal combat skills across three distinct balanced tiers. Earn higher coin multipliers by conquering extreme arenas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Easy - White Card */}
          <div className="game-card-light rounded-2xl p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg border-2 border-black bg-emerald-100 text-emerald-700 font-russo font-bold text-xs uppercase tracking-wider">
                  Easy Tier
                </span>
                <span className="text-xs text-gray-400 font-bold uppercase">Stage 1 - 10</span>
              </div>
              <h3 className="text-2xl font-russo font-bold text-black uppercase">Meadow Lands</h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-semibold">
                Perfect for newcomers. Master animal movement, skill dodging, primary key layouts, and easy coin collection loops.
              </p>
            </div>
            <div className="pt-6 border-t border-black/10 flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Coin Multiplier: 1.0x</span>
              <span className="text-emerald-600">100% Safe</span>
            </div>
          </div>

          {/* Medium - White Card */}
          <div className="game-card-light rounded-2xl p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg border-2 border-black bg-amber-100 text-amber-700 font-russo font-bold text-xs uppercase tracking-wider">
                  Medium Tier
                </span>
                <span className="text-xs text-gray-400 font-bold uppercase">Stage 11 - 25</span>
              </div>
              <h3 className="text-2xl font-russo font-bold text-black uppercase">Volcano Core</h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-semibold">
                Dynamic lava obstacles, faster enemy entities, and challenging vertical layout mechanics that challenge your elements.
              </p>
            </div>
            <div className="pt-6 border-t border-black/10 flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Coin Multiplier: 1.8x</span>
              <span className="text-amber-600">Medium Risk</span>
            </div>
          </div>

          {/* Hard - White Card */}
          <div className="game-card-light rounded-2xl p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg border-2 border-black bg-fuchsia-100 text-fuchsia-700 font-russo font-bold text-xs uppercase tracking-wider">
                  Hard Tier
                </span>
                <span className="text-xs text-gray-400 font-bold uppercase">Stage 26+</span>
              </div>
              <h3 className="text-2xl font-russo font-bold text-black uppercase">Deep Purple Rift</h3>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-semibold">
                Intense boss combat triggers, fast cooldown attacks, and unpredictable layouts generated by the AI Game Director.
              </p>
            </div>
            <div className="pt-6 border-t border-black/10 flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Coin Multiplier: 3.0x</span>
              <span className="text-fuchsia-600">Extreme Risk</span>
            </div>
          </div>
        </div>
      </section>

      {/* APK & Apple App Store badge preview section (White/Gold Cartridge styling) */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center relative z-10 game-card-cream rounded-3xl">
        <div className="space-y-6">
          <ShieldAlert className="h-10 w-10 text-orange-600 mx-auto animate-game-float" />
          <h2 className="text-3xl sm:text-4xl font-luckiest uppercase text-black tracking-wide comic-text-stroke-sm">
            Mobile Adventure Coming Soon
          </h2>
          <p className="max-w-xl mx-auto text-slate-700 font-semibold text-sm sm:text-base leading-relaxed">
            We are actively packaging ZUNO for high-performance mobile clients. Prepare to explore, combat, and collect validated upgrades on the go.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <div className="px-6 py-3.5 bg-white border-3 border-black rounded-xl flex items-center gap-3 shadow-[3px_3px_0px_0px_#000]">
              <span className="text-emerald-600 text-xs font-russo font-bold uppercase tracking-widest">Android APK</span>
              <span className="text-slate-500 text-xs font-bold font-russo">COMING SOON</span>
            </div>
            <div className="px-6 py-3.5 bg-white border-3 border-black rounded-xl flex items-center gap-3 shadow-[3px_3px_0px_0px_#000]">
              <span className="text-sky-600 text-xs font-russo font-bold uppercase tracking-widest">Apple Store</span>
              <span className="text-slate-500 text-xs font-bold font-russo">COMING SOON</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
