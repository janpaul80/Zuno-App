import Link from "next/link";
import { Award, ShieldCheck, Heart, Sparkles } from "lucide-react";

export default function CreditsPage() {
  const credits = [
    {
      role: "Game Concept & Art Direction",
      name: "Paul Hartmann",
      contribution: "Conceived the ZUNO animal combat universe, designed the glowing neon orange and electric blue visual art tokens, and outlined elements structures.",
    },
    {
      role: "Server Engineering & Isolation",
      name: "ZUNO Ops Team",
      contribution: "Maintained rigorous project deployment boundaries inside VPS `217.154.11.234` utilizing isolated PM2 containers and port 3006.",
    },
    {
      role: "AI Operations & Balancers",
      name: "AI Game Systems",
      contribution: "Designed and stubbed telemetry monitoring systems, anti-exploit balancers, and procedural stage layouts.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 font-inter">
      <div className="space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
            <Heart className="h-4 w-4 text-neon-orange" />
            <span className="text-xs font-orbitron font-extrabold uppercase tracking-widest text-neon-orange glow-text-orange">
              The Creators
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-orbitron font-extrabold uppercase text-white tracking-wide leading-none">
            ZUNO <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange via-neon-purple to-electric-blue">Credits</span>
          </h1>
          <p className="text-gray-400 font-medium sm:text-lg">
            Celebrating the visionaries, engineers, and art designers behind the animal battle adventure.
          </p>
        </div>

        {/* Major Creator Attributions Hero Section */}
        <div className="glass-panel p-8 rounded-3xl glow-border-orange bg-gradient-to-br from-[#060b26]/80 to-[#030712]/95 text-center space-y-6 relative overflow-hidden">
          {/* Glowing background rays */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.1)_0%,transparent_70%)] opacity-80" />
          
          <div className="relative z-10 space-y-4">
            <Award className="h-14 w-14 text-neon-orange mx-auto animate-float" />
            <h2 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white uppercase tracking-widest">
              Creator & Director
            </h2>
            <div className="text-4xl sm:text-5xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-neon-purple tracking-wide glow-text-orange">
              Paul Hartmann
            </div>
            <p className="max-w-xl mx-auto text-gray-300 font-semibold text-sm sm:text-base leading-relaxed">
              ZUNO was created by **Paul Hartmann**. His visual philosophy guides the vibrant color palettes, mobile-game quality presentations, and glowing accents.
            </p>
          </div>
        </div>

        {/* Detailed Roll of Credits */}
        <div className="space-y-6">
          <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-electric-blue" /> Production Credit Roll
          </h3>
          
          <div className="space-y-4">
            {credits.map((item) => (
              <div key={item.role} className="glass-panel p-6 rounded-2xl glow-border-blue flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="space-y-1 md:max-w-xs">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{item.role}</div>
                  <h4 className="text-lg font-orbitron font-bold text-white">{item.name}</h4>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-semibold md:max-w-md">
                  {item.contribution}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs font-orbitron font-bold uppercase tracking-widest text-electric-blue hover:text-white transition-colors duration-200"
          >
            &larr; Return to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
