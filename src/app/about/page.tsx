import Link from "next/link";
import { Sparkles, Sword, Globe, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 font-inter">
      <div className="space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
            <Globe className="h-4 w-4 text-neon-orange" />
            <span className="text-xs font-orbitron font-extrabold uppercase tracking-widest text-neon-orange glow-text-orange">
              The Legend
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-orbitron font-extrabold uppercase text-white tracking-wide leading-none">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange via-neon-purple to-electric-blue">ZUNO</span>
          </h1>
          <p className="text-gray-400 font-medium sm:text-lg">
            Step into a vibrant adventure world where mystical animal champions clash in spectacular fantasy arenas, collecting upgrades and rewriting lore.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-orbitron font-bold text-white uppercase tracking-wider glow-text-blue">
              The World of Zunoverse
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-medium">
              Centuries ago, the Zunoverse was forged from pure elemental neon energy. Across its glowing valleys, Meadows, and Deep Rift craters, distinct animal clans emerged, each wielding elemental spells and defensive armor configurations.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-medium">
              Today, these animal champions participate in epic, friendly battles to harness rare glowing coins. These coins act as key catalysts for tier upgrades, enabling champions to evolve their combat abilities, trigger custom skins, and explore uncharted territories.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <div className="flex items-center gap-2 text-neon-orange font-orbitron font-bold uppercase tracking-wider text-xs">
                <Sword className="h-4 w-4" /> Elemental Combat
              </div>
              <span className="text-gray-600">|</span>
              <div className="flex items-center gap-2 text-electric-blue font-orbitron font-bold uppercase tracking-wider text-xs">
                <Sparkles className="h-4 w-4" /> AI Operations
              </div>
            </div>
          </div>

          {/* Graphical Frame */}
          <div className="glass-panel rounded-3xl p-4 glow-border-orange relative overflow-hidden group">
            <img
              src="/images/character-showcase.png"
              alt="ZUNO Combat Lore"
              className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020514] via-transparent to-transparent opacity-85" />
          </div>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          <div className="glass-panel p-8 rounded-2xl glow-border-blue space-y-4">
            <div className="h-10 w-10 bg-electric-blue/15 flex items-center justify-center rounded-xl text-electric-blue">
              <Sword className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-orbitron font-bold text-white uppercase">Dynamic Combat</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Equip elemental upgrades, summon mystical items, and trigger combat skills inside responsive battles that challenge every layout tactic.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl glow-border-purple space-y-4">
            <div className="h-10 w-10 bg-neon-purple/15 flex items-center justify-center rounded-xl text-neon-purple">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-orbitron font-bold text-white uppercase">Vibrant Aesthetics</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Every arena radiates glowing visual details, vibrant animations, fluid particles, and game-studio grade responsive UI formatting.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl glow-border-green space-y-4">
            <div className="h-10 w-10 bg-neon-green/15 flex items-center justify-center rounded-xl text-neon-green">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-orbitron font-bold text-white uppercase">Fair Gameplay</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              With integrated AI Economy Monitors and Balancers, ZUNO blocks exploits, secures player profiles, and maintains stable progression.
            </p>
          </div>
        </div>

        {/* Bottom CTA credit */}
        <div className="glass-panel p-8 rounded-3xl glow-border-blue text-center max-w-4xl mx-auto space-y-4">
          <h3 className="text-2xl font-orbitron font-bold text-white uppercase">A Vision by Paul Hartmann</h3>
          <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xl mx-auto">
            ZUNO is built upon the visual foundation of our high-impact art direction, designed from day one to deliver true mobile-game quality presentation on modern devices.
          </p>
          <div className="pt-2">
            <Link
              href="/how-to-play"
              className="px-6 py-3 bg-gradient-to-r from-neon-orange to-neon-purple rounded-full text-white font-orbitron font-bold uppercase tracking-widest text-xs transition-transform duration-300 hover:scale-105 inline-block"
            >
              How to Play ZUNO
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
