import Link from "next/link";
import { ShieldCheck, Eye, Database, Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 font-inter">
      <div className="space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
            <ShieldCheck className="h-4 w-4 text-electric-blue" />
            <span className="text-xs font-orbitron font-extrabold uppercase tracking-widest text-electric-blue glow-text-blue">
              Data Safeguard
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-orbitron font-extrabold uppercase text-white tracking-wide leading-none">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange via-neon-purple to-electric-blue">Policy</span>
          </h1>
          <p className="text-gray-400 text-sm font-semibold">
            Last Updated: May 2026 &bull; Production Framework
          </p>
        </div>

        {/* Policy Body */}
        <div className="glass-panel p-8 rounded-3xl glow-border-purple space-y-8 text-gray-300 leading-relaxed text-sm font-medium">
          
          <div className="space-y-3">
            <h3 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Eye className="h-5 w-5 text-neon-purple" /> 1. Telemetry Data We Collect
            </h3>
            <p>
              When you battle in ZUNO, our servers ( VPS `217.154.11.234` ) capture gameplay metrics including: champion selections, stage coordinates, coin reward events, upgrade values, and average ping timing data. This is executed strictly to validate player progression and prevent exploits.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Database className="h-5 w-5 text-neon-purple" /> 2. Data Storage & AI Audits
            </h3>
            <p>
              Your data is stored securely in an encrypted local database. Our integrated **AI Economy Balancer** audits this telemetry data to evaluate level win/loss ratios and adjust stage mechanics, never sharing personal information with third parties.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Lock className="h-5 w-5 text-neon-purple" /> 3. Data Safety & Security
            </h3>
            <p>
              We enforce strict server security protocols (private SSH keys, dedicated reverse proxies) to prevent leaks. In compliance with data regulations, you may request the deletion of your telemetry history at any time through our Support system.
            </p>
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
