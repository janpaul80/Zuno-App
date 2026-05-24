"use client";

import Link from "next/link";
import { Shield, Cpu, Coins, Swords, Globe, Sparkles, Play, ArrowRight } from "lucide-react";

export default function HomePage() {
  
  const features = [
    {
      title: "Strategic Battles",
      desc: "Use unique skills and team combos to win intense battles.",
      icon: <Shield className="h-6 w-6 text-zuno-blue" />,
      colorClass: "glow-card-blue",
      badgeColor: "bg-zuno-blue/10 border-zuno-blue text-zuno-blue",
    },
    {
      title: "AI Powered",
      desc: "Advanced AI systems adapt to your moves in real-time.",
      icon: <Cpu className="h-6 w-6 text-zuno-purple" />,
      colorClass: "glow-card-purple",
      badgeColor: "bg-zuno-purple/10 border-zuno-purple text-zuno-purple",
    },
    {
      title: "Earn & Upgrade",
      desc: "Earn rewards, upgrade your animals, and unlock new powers.",
      icon: <Coins className="h-6 w-6 text-zuno-gold" />,
      colorClass: "glow-card-gold",
      badgeColor: "bg-zuno-gold/10 border-zuno-gold text-zuno-gold",
    },
    {
      title: "Compete & Rank",
      desc: "Climb the ranks and prove you're the ultimate champion.",
      icon: <Swords className="h-6 w-6 text-zuno-magenta" />,
      colorClass: "glow-card-red",
      badgeColor: "bg-zuno-magenta/10 border-zuno-magenta text-zuno-magenta",
    },
    {
      title: "Explore the World",
      desc: "Discover stunning arenas and hidden secrets.",
      icon: <Globe className="h-6 w-6 text-zuno-green" />,
      colorClass: "glow-card-green",
      badgeColor: "bg-zuno-green/10 border-zuno-green text-zuno-green",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden pb-16">
      
      {/* Hero / Main Arena Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-8 pb-16 z-10">
        
        {/* Rotating Sunburst Rays Background */}
        <div className="absolute top-[35%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[900px] h-[900px] pointer-events-none z-0 opacity-40 mix-blend-screen animate-rotate-slow bg-[radial-gradient(circle_at_center,rgba(189,0,255,0.25)_0%,rgba(0,210,255,0.15)_30%,transparent_70%)]" />
        
        <div className="max-w-6xl mx-auto space-y-8 relative z-10">
          
          {/* Main Enormous Logo - Glowing Drop Shadow */}
          <div className="flex justify-center animate-game-float relative">
            <div className="absolute inset-0 bg-zuno-purple/10 rounded-full filter blur-3xl scale-90" />
            <img
              src="/zuno-logo.png"
              alt="ZUNO Official Logo"
              className="w-80 sm:w-[460px] md:w-[580px] lg:w-[680px] h-auto object-contain filter drop-shadow-[0_0_24px_rgba(189,0,255,0.35)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            />
          </div>

          {/* Heading - Cinematic Capitals */}
          <div className="space-y-1">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-russo font-black uppercase italic tracking-widest text-white leading-none">
              ENTER THE ARENA.
            </h2>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-luckiest uppercase italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-zuno-gold via-zuno-orange to-zuno-magenta comic-text-stroke leading-none">
              BECOME A LEGEND.
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/90 font-medium tracking-wide leading-relaxed pt-3">
              ZUNO is a next-gen animal battle adventure where strategy, skill, and AI collide in an epic fight for glory.
            </p>
          </div>

          {/* Call to Actions - Dual Skewed Gaming Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link
              href="/how-to-play"
              className="group px-8 py-3.5 font-russo font-black text-sm uppercase tracking-widest game-skew-btn-gold flex items-center gap-2"
            >
              <span>🐾 Play Now</span>
            </Link>
            <Link
              href="/ai-operations"
              className="px-8 py-3.5 font-russo font-black text-sm uppercase tracking-widest game-skew-btn-blue flex items-center gap-2"
            >
              <span><Play className="h-4 w-4 fill-current inline" /> Watch Trailer</span>
            </Link>
          </div>
        </div>
      </section>

      {/* "WHY PLAY ZUNO?" Section - Jagged Console Frame */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Custom Jagged container deck */}
        <div className="jagged-console-container p-6 md:p-10 space-y-8">
          
          {/* Header Line */}
          <div className="text-center relative">
            <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zuno-purple/40 to-transparent z-0" />
            <span className="relative z-10 px-6 py-1 border border-zuno-purple/35 bg-[#030214] text-xs font-russo font-bold uppercase tracking-widest text-zuno-purple drop-shadow-[0_0_6px_rgba(189,0,255,0.4)]">
              WHY PLAY ZUNO?
            </span>
          </div>

          {/* Features cards layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
            {features.map((feat) => (
              <div
                key={feat.title}
                className={`glass-panel ${feat.colorClass} p-5 rounded-xl flex flex-col items-center text-center space-y-4`}
              >
                {/* Glowing Circular Icon Badge */}
                <div className={`h-12 w-12 rounded-full border flex items-center justify-center ${feat.badgeColor} shadow-[0_0_8px_currentColor]`}>
                  {feat.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xs font-russo font-extrabold uppercase text-white tracking-wider">
                    {feat.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-white/60 font-semibold leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* "EPIC ANIMAL BATTLES" Section - High contrast Grid with characters overlay */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Text panel */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-russo font-black uppercase italic tracking-wider text-white">
              EPIC ANIMAL <br />
              <span className="text-zuno-blue drop-shadow-[0_0_8px_rgba(0,210,255,0.3)]">BATTLES</span>
            </h2>
            <p className="text-white/80 text-sm sm:text-base font-semibold leading-relaxed">
              Join fast-paced 3v3 battles in stunning arenas. Build your team, master your strategy, and crush your opponents!
            </p>
            <div className="pt-2">
              <Link
                href="/how-to-play"
                className="px-6 py-3 font-russo font-black text-xs uppercase tracking-widest game-skew-btn-blue inline-flex items-center gap-1"
              >
                <span>Explore Gameplay <ArrowRight className="h-3 w-3 inline ml-1" /></span>
              </Link>
            </div>
          </div>

          {/* Gameplay Preview Screen - Electric outline with glows */}
          <div className="lg:col-span-7 relative group">
            
            {/* Cyan glowing electric jagged border */}
            <div className="absolute inset-[-4px] bg-gradient-to-r from-zuno-blue via-zuno-purple to-zuno-blue rounded-2xl filter blur-[4px] opacity-75 group-hover:opacity-100 transition-all" />
            <div className="absolute inset-0 border-2 border-zuno-blue rounded-2xl z-10 pointer-events-none" />

            {/* Screen mask wrapper */}
            <div className="relative rounded-2xl border-3 border-black overflow-hidden bg-[#05021a] z-0">
              <img
                src="/images/gameplay-preview.png"
                alt="ZUNO Fast-paced 3v3 battles"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.015]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            </div>

            {/* Timer HUD overlay */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-black/80 border-2 border-zuno-blue text-white font-russo font-bold text-xs shadow-[0_0_8px_rgba(0,210,255,0.4)]">
              01:30
            </div>
          </div>

        </div>
      </section>

      {/* Floating Characters Showcase Section - Integrated into layout composition */}
      <section className="relative z-10 py-12 max-w-6xl mx-auto px-4 overflow-visible">
        
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.06)_0%,transparent_60%)] pointer-events-none" />

        {/* Dynamic Composition Grid with floating warriors */}
        <div className="relative border-y border-white/5 py-12 flex flex-col items-center justify-center text-center space-y-6">
          
          {/* Integrated Character 1: Leopard Warrior Left */}
          <div className="absolute left-[-20px] bottom-[-20px] hidden md:block w-36 lg:w-44 h-auto pointer-events-none z-20 animate-game-float filter drop-shadow-[0_0_12px_rgba(249,115,22,0.4)] hover:scale-105 transition-all">
            <img
              src="/images/character-showcase.png"
              alt="Leopard Warrior"
              className="w-full h-auto object-contain scale-[1.3] translate-x-[-10%] translate-y-[10%]"
            />
          </div>

          {/* Integrated Character 2: Shadow Cat Right */}
          <div className="absolute right-[-20px] top-[-30px] hidden md:block w-36 lg:w-44 h-auto pointer-events-none z-20 animate-game-float filter drop-shadow-[0_0_12px_rgba(189,0,255,0.4)] hover:scale-105 transition-all" style={{ animationDelay: "2.5s" }}>
            <img
              src="/images/character-showcase.png"
              alt="Purple Shadow Cat"
              className="w-full h-auto object-contain scale-[1.3] translate-x-[10%] translate-y-[-10%] rotate-6"
            />
          </div>

          <div className="space-y-2 relative z-10 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-russo font-black uppercase italic text-white leading-none">
              BUILD YOUR TEAM.
            </h2>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-luckiest uppercase italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-zuno-gold via-zuno-orange to-zuno-magenta comic-text-stroke leading-none">
              RULE THE ARENA.
            </h1>
            <p className="text-white/80 font-medium text-xs sm:text-sm tracking-wide pt-2">
              Collect, upgrade, and evolve powerful animals. Your legend starts now.
            </p>
          </div>

          <div className="pt-2 relative z-10">
            <Link
              href="/how-to-play"
              className="px-10 py-4 font-russo font-black text-sm uppercase tracking-widest game-skew-btn-gold flex items-center gap-2"
            >
              <span>🐾 Play Zuno Now</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Saturated Stats Footer */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 pt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-white/10 pt-10">
          
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-russo font-black italic tracking-wide text-zuno-blue drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]">
              1M+
            </div>
            <div className="text-[10px] sm:text-xs font-russo font-bold uppercase tracking-wider text-white/50">
              Active Players
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-russo font-black italic tracking-wide text-zuno-magenta drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]">
              250+
            </div>
            <div className="text-[10px] sm:text-xs font-russo font-bold uppercase tracking-wider text-white/50">
              Unique Animals
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-russo font-black italic tracking-wide text-zuno-gold drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]">
              50+
            </div>
            <div className="text-[10px] sm:text-xs font-russo font-bold uppercase tracking-wider text-white/50">
              Fantasy Arenas
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-russo font-black italic tracking-wide text-zuno-green drop-shadow-[0_0_8px_rgba(57,255,20,0.4)]">
              24/7
            </div>
            <div className="text-[10px] sm:text-xs font-russo font-bold uppercase tracking-wider text-white/50">
              AI Operations
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
