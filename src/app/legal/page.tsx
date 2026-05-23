import Link from "next/link";
import { ShieldCheck, Scale, FileText, CheckSquare } from "lucide-react";

export default function LegalHubPage() {
  const policies = [
    {
      name: "Terms of Use",
      desc: "Review rules governing player accounts, virtual upgrades, server coin drop agreements, and platform usage regulations.",
      path: "/terms",
      icon: <Scale className="h-5 w-5 text-neon-orange" />,
    },
    {
      name: "Privacy Policy",
      desc: "Learn about how ZUNO safeguards personal telemetry details, cookies, and local database storage protocols.",
      path: "/privacy",
      icon: <ShieldCheck className="h-5 w-5 text-electric-blue" />,
    },
    {
      name: "Cookie Policy",
      desc: "Information regarding cookie storage configurations, analytical tracking, and settings.",
      path: "/cookie-policy",
      icon: <FileText className="h-5 w-5 text-neon-purple" />,
    },
    {
      name: "Code of Conduct",
      desc: "Crucial instructions explaining respectful behavior, cheating prevention, account consequences, and fair-play.",
      path: "/code-of-conduct",
      icon: <CheckSquare className="h-5 w-5 text-neon-green" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 font-inter">
      <div className="space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
            <Scale className="h-4 w-4 text-neon-orange" />
            <span className="text-xs font-orbitron font-extrabold uppercase tracking-widest text-neon-orange glow-text-orange">
              Regulatory Core
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-orbitron font-extrabold uppercase text-white tracking-wide leading-none">
            Legal <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange via-neon-purple to-electric-blue">Hub</span>
          </h1>
          <p className="text-gray-400 font-medium sm:text-lg">
            Ensure an enjoyable and secure experience by reviewing our regulatory guidelines and player agreements.
          </p>
        </div>

        {/* Policies Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {policies.map((policy) => (
            <div key={policy.name} className="glass-panel p-8 rounded-2xl glow-border-blue flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/5 rounded-xl">{policy.icon}</div>
                  <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider">{policy.name}</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed font-semibold">{policy.desc}</p>
              </div>
              <div className="pt-4">
                <Link
                  href={policy.path}
                  className="inline-flex items-center gap-2 text-xs font-orbitron font-bold uppercase tracking-widest text-electric-blue hover:text-white transition-colors duration-200"
                >
                  Review policy &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Global Compliance Note */}
        <div className="max-w-4xl mx-auto glass-panel p-8 rounded-3xl glow-border-orange bg-gradient-to-br from-[#060b26]/70 to-[#030712]/95 space-y-4">
          <h3 className="text-xl font-orbitron font-bold text-white uppercase">Operational Integrity Disclosures</h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-medium">
            ZUNO is managed under strict fair-play and data safety frameworks. In addition to player protection policies, our **AI Economy Monitor** operates autonomously behind the scenes, scanning telemetry coordinates to maintain equal gameplay conditions for everyone.
          </p>
        </div>

      </div>
    </div>
  );
}
