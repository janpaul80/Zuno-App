import Link from "next/link";
import { FileText, Cookie, Shield, Eye } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 font-inter">
      <div className="space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
            <Cookie className="h-4 w-4 text-neon-purple" />
            <span className="text-xs font-orbitron font-extrabold uppercase tracking-widest text-neon-purple glow-text-purple">
              Cookie Guidelines
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-orbitron font-extrabold uppercase text-white tracking-wide leading-none">
            Cookie <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange via-neon-purple to-electric-blue">Policy</span>
          </h1>
          <p className="text-gray-400 text-sm font-semibold">
            Last Updated: May 2026 &bull; Production Framework
          </p>
        </div>

        {/* Policy Body */}
        <div className="glass-panel p-8 rounded-3xl glow-border-green space-y-8 text-gray-300 leading-relaxed text-sm font-medium">
          
          <div className="space-y-3">
            <h3 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Eye className="h-5 w-5 text-neon-green" /> 1. What Are Cookies?
            </h3>
            <p>
              Cookies are small text-based data files stored by your browser when you explore websites. ZUNO utilizes cookies to recognize active login sessions, save your custom settings (audio settings, audio toggles), and keep gameplay flows uninterrupted.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Shield className="h-5 w-5 text-neon-green" /> 2. Types of Cookies We Leverage
            </h3>
            <p>
              We deploy two primary classifications of cookies:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Essential Cookies:</strong> Required to preserve account sessions, authorize support tickets, and check VPS telemetry balances.</li>
              <li><strong>Performance & Analytics:</strong> Stubs that gather anonymous layout load speeds and responsive viewport scalability metrics.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="h-5 w-5 text-neon-green" /> 3. Managing Cookie Settings
            </h3>
            <p>
              You can adjust, disable, or clear cookies directly inside your browser options. Disabling cookies might disrupt active level upgrades and session validation checks in the ZUNOVERSE.
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
