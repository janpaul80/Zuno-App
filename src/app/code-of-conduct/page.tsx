import Link from "next/link";
import { CheckSquare, ShieldAlert, Users, Award } from "lucide-react";

export default function CodeOfConductPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 font-inter">
      <div className="space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
            <CheckSquare className="h-4 w-4 text-neon-green" />
            <span className="text-xs font-orbitron font-extrabold uppercase tracking-widest text-neon-green glow-text-green">
              Community Standard
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-orbitron font-extrabold uppercase text-white tracking-wide leading-none">
            Code of <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange via-neon-purple to-electric-blue">Conduct</span>
          </h1>
          <p className="text-gray-400 text-sm font-semibold">
            Last Updated: May 2026 &bull; Fair-Play Code
          </p>
        </div>

        {/* Conduct Body */}
        <div className="glass-panel p-8 rounded-3xl glow-border-orange space-y-8 text-gray-300 leading-relaxed text-sm font-medium">
          
          <div className="space-y-3">
            <h3 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="h-5 w-5 text-neon-orange" /> 1. Fair Gameplay & Esports Spirit
            </h3>
            <p>
              ZUNO is designed as a fun, competitive adventure battle arena. Players must cooperate and engage in standard combat mechanics fairly. Win and lose with respect, and value your fellow animal combat champions.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-neon-orange" /> 2. Zero-Cheating & Zero-Exploits
            </h3>
            <p>
              We enforce a zero-tolerance policy against any form of cheating, coin duplicate exploits, memory injections, or lag switching. Finding a layout bug or a combat loophole should be immediately logged using the **Bug Report form** on the Support page, rather than exploited.
            </p>
            <div className="p-4 bg-black/40 border border-white/5 rounded-xl text-xs text-gray-400 leading-relaxed space-y-2">
              <strong className="font-orbitron text-electric-blue uppercase block">🛡️ AI Operations Surveillance:</strong>
              Our **AI Economy Monitor** continuously records currency spikes, and the **AI Level Balancer** alerts VPS server operators to anomalous combat stats, guaranteeing equal conditions for the leaderboard.
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="h-5 w-5 text-neon-orange" /> 3. Account Consequences
            </h3>
            <p>
              Bypassing these standards or violating elemental balance policies triggers disciplinary actions:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>First Offense:</strong> Immediate 7-day account suspension and telemetry reset.</li>
              <li><strong>Severe/Repeat Infraction:</strong> Permanent hardware ban, database block, and deletion of all virtual upgrades.</li>
            </ul>
          </div>

        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link
            href="/legal"
            className="text-xs font-orbitron font-bold uppercase tracking-widest text-electric-blue hover:text-white transition-colors duration-200"
          >
            &larr; Back to Legal Hub
          </Link>
        </div>

      </div>
    </div>
  );
}
