import Link from "next/link";
import { Scale, ShieldAlert, FileText, CheckCircle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 font-inter">
      <div className="space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
            <Scale className="h-4 w-4 text-neon-orange" />
            <span className="text-xs font-orbitron font-extrabold uppercase tracking-widest text-neon-orange glow-text-orange">
              User Agreement
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-orbitron font-extrabold uppercase text-white tracking-wide leading-none">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange via-neon-purple to-electric-blue">Use</span>
          </h1>
          <p className="text-gray-400 text-sm font-semibold">
            Last Updated: May 2026 &bull; Production Framework
          </p>
        </div>

        {/* Terms Body */}
        <div className="glass-panel p-8 rounded-3xl glow-border-blue space-y-8 text-gray-300 leading-relaxed text-sm font-medium">
          
          <div className="space-y-3">
            <h3 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-electric-blue" /> 1. Account Creation & Eligibility
            </h3>
            <p>
              By launching ZUNO or creating an account, you affirm that you possess the legal capacity to enter into these terms. You are responsible for protecting your account keys and access telemetry.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-electric-blue" /> 2. Coins & Virtual Upgrades
            </h3>
            <p>
              Coins and items earned in ZUNO are virtual game utility indicators and possess no real-world monetary value. Upgrades (claws, shield matrices, boots) cannot be transferred, sold, or redeemed for physical currency.
            </p>
            <div className="p-4 bg-black/40 border border-white/5 rounded-xl text-xs text-gray-400 leading-relaxed space-y-2">
              <strong className="font-orbitron text-neon-orange uppercase block">⚠️ Server Validation Clause:</strong>
              All virtual currency balances must be securely validated by ZUNO's backend systems on VPS `217.154.11.234`. Any attempt to hack, duplicate, or inject coin drops using cheat tools violates this agreement.
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-neon-orange" /> 3. Prohibited Exploits & Bans
            </h3>
            <p>
              Players are strictly prohibited from exploiting layout bugs, executing packet manipulation, using unauthorized emulator helper tools, or bypassing our **AI Economy Monitor** audits.
            </p>
            <p>
              Violation of these terms will lead to immediate, autonomous account suspension, leaderboard ban, and deletion of virtual upgrades without warning.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="h-5 w-5 text-electric-blue" /> 4. Credits & Creator Attributions
            </h3>
            <p>
              All assets, codebases, and trademark elements of ZUNO remain the exclusive intellectual property of the creators. ZUNO was created by **Paul Hartmann**.
            </p>
          </div>

        </div>

        {/* Support Link */}
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
