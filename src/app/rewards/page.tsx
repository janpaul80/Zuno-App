import Link from "next/link";
import { Coins, Award, ShieldCheck, ShoppingCart, Star, Sparkles } from "lucide-react";

export default function RewardsPage() {
  const shopUpgrades = [
    {
      name: "Elemental Claws",
      cost: "500 Coins",
      tier: "Tier II",
      effect: "+20% Attack Speed",
      color: "glow-border-orange",
      icon: <Sparkles className="h-6 w-6 text-neon-orange" />,
    },
    {
      name: "Glowing Shield Matrix",
      cost: "800 Coins",
      tier: "Tier III",
      effect: "+35% Damage Shielding",
      color: "glow-border-blue",
      icon: <ShieldCheck className="h-6 w-6 text-electric-blue" />,
    },
    {
      name: "Dimension Boots",
      cost: "1,200 Coins",
      tier: "Tier IV",
      effect: "+25% Dodge Distance",
      color: "glow-border-purple",
      icon: <Award className="h-6 w-6 text-neon-purple" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 font-inter">
      <div className="space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
            <Coins className="h-4 w-4 text-neon-orange" />
            <span className="text-xs font-orbitron font-extrabold uppercase tracking-widest text-neon-orange glow-text-orange">
              Economy Overview
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-orbitron font-extrabold uppercase text-white tracking-wide leading-none">
            Rewards & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange via-neon-purple to-electric-blue">Coins</span>
          </h1>
          <p className="text-gray-400 font-medium sm:text-lg">
            Earn glowing currency through adventurous battles, level up your champion, and purchase legendary visual upgrades.
          </p>
        </div>

        {/* Economy Blueprint Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-orbitron font-bold text-white uppercase tracking-wider glow-text-orange">
              Level Progression Economy
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-medium">
              In ZUNO, every combat arena offers coins depending on its difficulty tier. Tackling higher stages yields a multiplier boost, scaling from 1.0x in Green Meadows up to a massive 3.0x in the extreme Deep Purple Rift arenas.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-md bg-neon-green/10 flex items-center justify-center text-neon-green mt-1 flex-shrink-0">
                  <Star className="h-3.5 w-3.5 fill-current" />
                </div>
                <div>
                  <h4 className="font-orbitron font-bold text-white uppercase text-sm">Champion Evolution</h4>
                  <p className="text-xs text-gray-400">Coins are consumed to permanently level up champion attack stats, ultimate capabilities, and custom glows.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-md bg-electric-blue/10 flex items-center justify-center text-electric-blue mt-1 flex-shrink-0">
                  <Star className="h-3.5 w-3.5 fill-current" />
                </div>
                <div>
                  <h4 className="font-orbitron font-bold text-white uppercase text-sm">Visual Skins Shop</h4>
                  <p className="text-xs text-gray-400">Unlock vibrant visual custom skins that shimmer with bright orange and blue overlays.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Secure Backend highlights */}
          <div className="glass-panel p-8 rounded-3xl glow-border-blue bg-gradient-to-br from-[#060b26]/70 to-[#030712]/95 space-y-6">
            <h3 className="text-2xl font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-electric-blue" /> Economy Security
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed font-semibold">
              To keep matches competitive and rewards fair, all coin earnings, drops, and transactions are validated through our secure game servers. 
            </p>
            <div className="p-4 bg-black/40 border border-white/5 rounded-xl text-xs text-gray-400 leading-relaxed font-medium space-y-2">
              <div className="font-bold font-orbitron text-electric-blue uppercase">🛡️ Anti-Cheating Protocol:</div>
              ZUNO’s integrated **AI Economy Monitor** screens player telemetry in real-time, detecting cheating or speed-hacks immediately, securing an untampered leaderboard.
            </div>
          </div>

        </div>

        {/* Featured Shop Upgrades */}
        <div className="space-y-6">
          <h3 className="text-2xl font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-neon-purple" /> Shop Upgrades Preview
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shopUpgrades.map((item) => (
              <div key={item.name} className={`glass-panel p-6 rounded-2xl ${item.color} space-y-4`}>
                <div className="flex justify-between items-center">
                  <div className="p-2 bg-white/5 rounded-lg">
                    {item.icon}
                  </div>
                  <span className="text-xs text-gray-500 font-bold font-orbitron uppercase tracking-wider">{item.tier}</span>
                </div>
                <div>
                  <h4 className="text-lg font-orbitron font-bold text-white uppercase tracking-wide">{item.name}</h4>
                  <p className="text-xs text-neon-green font-bold tracking-wider mt-0.5">{item.effect}</p>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/5 text-sm font-semibold">
                  <span className="text-gray-400">Unlock Cost:</span>
                  <span className="text-white font-orbitron font-bold">{item.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA credit */}
        <div className="text-center pt-4">
          <Link
            href="/ai-operations"
            className="px-8 py-3.5 rounded-full font-orbitron font-bold text-xs uppercase tracking-widest bg-medium-navy border border-white/10 text-gray-300 glow-border-purple transition-all duration-300 hover:scale-105"
          >
            Explore AI balancing operations
          </Link>
        </div>

      </div>
    </div>
  );
}
